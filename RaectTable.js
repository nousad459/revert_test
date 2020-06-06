// base
import React from 'react';
import { navigate } from '@reach/router';

// models
import { InfiniteScroll /* KeyValue */ } from '@models';
import { Employee } from '@services/virtual-brown/Organizations/employees';

// services
import { modalService } from '@components/Modal/service';
import { toasterService } from '@services/core';
import { employeesService } from '@services/virtual-brown/Organizations/employees';

// components
import { InfiniteScroller } from '@components/InfiniteScroll';
import { FlexRow as Row } from '@components/layout/Row';
import Button from '@components/Buttons/Button';
import Loader from '@components/Loader/Loader';
import Table, { SORT_ENUM } from '@components/Table/Table';
import Toolbar from '@components/molecules/Toolbar/Toolbar';
import SearchBar from '@components/molecules/SearchBar/SearchBar';
// import FilterButton from '@components/molecules/FilterButton/FilterButton';
import ConfirmationModal from '@app/admin/pages/core/modals/confirmation/confirmation';

import { CreateContractForm } from '../../forms/contract/createContract/createContract';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

import AddUserForm  from '../../forms/adduser/addUser';
import EditUserForm  from '../../forms/adduser/editUser';

// operators
import { has, debounce } from 'lodash';
// import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import Empty from '@core/components/Empty/Empty';
import { env } from '@core/environments/environment';

interface Props {
    default?: boolean;
    key?: string;
    path: string;
}

interface State {
    table: {
        data: Employee[];
        fetched: boolean;
        infiniteScroll: InfiniteScroll;
        services: {
            [key: string]: Function;
        };
    };
    userrecord:any[];
    loading:boolean;
    search: string;
    // filter: {
    //     type: string;
    //     subtype: string;
    //     dropdowns: {
    //         roles: Array<KeyValue>;
    //     },
    // };
    sort: {
        column: string;
        direction: SORT_ENUM;
    };
}

interface Vars {
    subscriptions: any[];
}

export default class UserPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            table: {
                data: [] as Employee[],
                fetched: false,
                infiniteScroll: {
                    isLoading: false,
                    isDisabled: false,
                },
                services: {
                    get: () =>
                        employeesService.adminGetEmployees(this.createParams()).pipe(
                            map(paginationRes => {
                                this.pagination.offset += this.pagination.limit;
                                return paginationRes && paginationRes.results ? paginationRes.results : [];
                            }),
                        ),
                },
            },
            userrecord: [],
            loading: false,
            search: null,
            sort: {
                column: 'first_name',
                direction: SORT_ENUM.DESC,
            },
        };
    }

    vars: Vars = {
        subscriptions: [],
    };

    public pagination = {
        limit: 20,
        offset: 0,
    };

    public UNSAFE_componentWillMount() {
        this.load();
    }

    private baseUrl = env.insite.pythonUrl;
	public async fetchUser() {
        const user = window.localStorage.getItem("r4LoginResults");
        var token = JSON.parse(user).token;
        const res = await fetch(this.baseUrl+'admin/user/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Token '+token
                },
                /*body: JSON.stringify({
                    username: '{userName}',
                    password: '{password}'
                })*/
            });
          const data = await res.json()
          //console.log("recorddata",data)   
          this.setState({userrecord: data, loading:false})
 }
    componentDidMount()
    {
        this.fetchUser()
    }

    public componentWillUnmount() {
        this.vars.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    private createParams() {
        let params: any = {
            limit: this.pagination.limit,
            offset: this.pagination.offset,
            // ordering: (this.state.sort.direction ? '-' : '') + this.state.sort.column,
        };

        if (this.state.search) params.search = this.state.search;

        // if (this.state.filter.type && this.state.filter.subtype) {
        //     switch (this.state.filter.type) {
        //         case 'Role':
        //             params.role = this.state.filter.subtype;
        //             break;
        //     }
        // }

        return params;
    }

    private load() {
        this.state.table.services.get().subscribe(res => {
            if (!res.length) {
                this.setState(state => {
                    state.table.infiniteScroll.isLoading = false;
                    state.table.infiniteScroll.isDisabled = true;
                    state.table.fetched = true;
                    return state;
                });
            } else {
                this.setState(state => {
                    state.table.infiniteScroll.isLoading = false;
                    state.table.data = this.state.table.data.concat(res);
                    state.table.fetched = true;
                    return state;
                });
            }
        });
    }

    private loadMore = () => {
        this.setState(
            state => {
                state.table.infiniteScroll.isLoading = true;
                return state;
            },
            () => this.load(),
        );
    };

    private async reload() {
        this.setState({ loading: true });
        this.fetchUser();
        
    }

    private search = value => {
        this.setState(
            (state: State) => {
                this.pagination.offset = 0;
                state.search = value;
                return state;
            },
            () => this.reload(),
        );
    };

    private debouncedSearch = debounce(this.search, 200);

    private edit(id) {
        //navigate(`/admin/add-user/edit/${id}`);
        modalService.open({
            component: <EditUserForm id={id} />,
            callback: result => {
                if (result && result.refetch) {
                    this.reload();
                }
            },
        });
    }


    private createUser = () => {
        modalService.open({
            component: <AddUserForm />,
            callback: result => {
                if (result && result.refetch) {
                    this.reload();
                }
            },
        });
    };

    private delete(id) {
        modalService.open({
            size: 'sm',
            component: (
                <ConfirmationModal
                    data={{
                        text: (
                            <span>
                                Are you sure you want to delete this <b>User</b>?
                            </span>
                        ),
                    }}
                    methods={{
                        onConfirm: () => {
                            employeesService.deleteEmployee({ id }).subscribe(_res => {
                                //empty result so will always show success
                                //toasterService.newToast({ status: 'success', message: 'Successfully deleted employee.' });
                                toasterService.newToast({ status: 'fail', message: "Couldn't delete user." });
                                //this.reload();
                                modalService.close();
                            });
                        },
                    }}
                />
            ),
        });
    }

    public render() {
        const rows = this.state.userrecord.map(employee => {
            return {
                'First Name': has(employee, 'person.first_name') ? employee.person.first_name : '',
                'Last Name': has(employee, 'person.last_name') ? employee.person.last_name : '',
                Email: has(employee, 'person.email_address') ? employee.person.email_address : '',
                Action: (
                    <Row
                        settings={{
                            justifyContent: 'flext-start',
                            alignItems: 'center',
                        }}>
                        <i className="fas fa-pencil" onClick={() => this.edit(employee.id)} style={{ marginRight: '24px' }} />

                        <i className="fas fa-trash" onClick={() => this.delete(employee.id)} />
                    </Row>
                ),
            };
        });

        const sortColumn = this.state.sort.column;
        const sortDir = this.state.sort.direction;

        const sortCbs = {
            'First Name': {
                direction: sortColumn === 'first_name' && sortDir,
                fn: () =>
                    this.setState(
                        state => {
                            state.sort.column = 'first_name';
                            state.sort.direction =
                                sortColumn === 'first_name' ? (sortDir === SORT_ENUM.DESC ? SORT_ENUM.ASC : SORT_ENUM.DESC) : SORT_ENUM.ASC;
                            return state;
                        },
                        () => this.reload(),
                    ),
            },
            'Last Name': {
                direction: sortColumn === 'last_name' && sortDir,
                fn: () =>
                    this.setState(
                        state => {
                            state.sort.column = 'last_name';
                            state.sort.direction =
                                sortColumn === 'last_name' ? (sortDir === SORT_ENUM.DESC ? SORT_ENUM.ASC : SORT_ENUM.DESC) : SORT_ENUM.ASC;
                            return state;
                        },
                        () => this.reload(),
                    ),
            },
            Email: {
                direction: sortColumn === 'email_address' && sortDir,
                fn: () =>
                    this.setState(
                        state => {
                            state.sort.column = 'email_address';
                            state.sort.direction =
                                sortColumn === 'email_address'
                                    ? sortDir === SORT_ENUM.DESC
                                        ? SORT_ENUM.ASC
                                        : SORT_ENUM.DESC
                                    : SORT_ENUM.ASC;
                            return state;
                        },
                        () => this.reload(),
                    ),
            },
        };

        const columns = [
            // {
            //   Header: "Id",
            //   accessor: "id"
            // },
            {
              Header: "First Name",
              accessor: "person.first_name",
            },
            {
              Header: "Last Name",
              accessor: "person.last_name",
              filterable: false
            },
            {
              Header: "Email",
              accessor: "person.email_address",
              filterable: false
            },
            {
                Header: "Action",
                Cell: props =>{
                        return(
                            <div>
                            <i className="fas fa-pencil" onClick={() => this.edit(props.original.id)} style={{ marginRight: '24px' }} />

                            <i className="fas fa-trash" onClick={() => this.delete(props.original.id)} />
                            </div>
                        )
                    },
                    filterable: false
              }
             
          ]

        return (
            <div id="admin-core_employees">
                <Toolbar>
                    {{
                        leftChildren: (
                            <React.Fragment>
                                <SearchBar
                                    data={{ name: 'search', placeholder: 'Search' }}
                                    methods={{
                                        onChange: event => {
                                            event.persist();
                                             this.debouncedSearch(event.target.value);
                                        },
                                    }}
                                />
                                {/* <FilterButton
                                    data={{
                                        type: {
                                            All: ['Make a Selection'],
                                            Role: this.state.filter.dropdowns.roles,
                                        },
                                    }}
                                    methods={{
                                        onFilter: selected => {
                                            this.setState(state => {
                                                state.filter.type = selected.type;
                                                state.filter.subtype = selected.subType;
                                                return state;
                                            }, () => this.reload());
                                        },
                                    }}
                                    style={{ width: '230px' }}
                                /> */}
                            </React.Fragment>
                        ),
                        rightChildren: (
                            <div>
                                <Button type="success" size="large" methods={{ onClick: () => this.createUser() }}>
                                    <i className="fas fa-plus" style={{ marginRight: '8px' }} />
                                    <span>Add User</span>
                                </Button>
                            </div>
                        ),
                    }}
                </Toolbar>

                {this.state.loading ?  <Loader /> : 
                  
                  this.state.userrecord && this.state.userrecord.length ? (
                    // <InfiniteScroller
                    //     scrollContainer="#admin-main-section"
                    //     onScroll={this.loadMore}
                    //     scrollLoading={this.state.table.infiniteScroll.isLoading}
                    //     scrollDisabled={this.state.table.infiniteScroll.isDisabled}>
                    //     <Table
                    //         className="table-action"
                    //         data={{
                    //             columns: ['First Name', 'Last Name', 'Email', 'Action'],
                    //             rows: rows,
                    //             sortCbs: sortCbs,
                    //         }}
                    //     />
                        <ReactTable
                        columns={columns}
                        data={this.state.userrecord}
                        filterable
                        defaultFilterMethod={(filter, row, column) => {
                            const id = filter.pivotId || filter.id;
                            if (typeof filter.value === "object") {
                              return row[id] !== undefined
                                ? filter.value.toLowerCase().indexOf(row[id]) > -1
                                : true;
                            } else {
                              return row[id] !== undefined
                                ? String(row[id]).toLowerCase().indexOf(filter.value) > -1
                                : true;
                            }
                          }}
                        //   loading={this.state.loading}
                        />
                    // </InfiniteScroller>
                ) : this.state.userrecord ? (
                    <Loader />
                    
                ) : (
                    <Loader />
                )}

            </div>
        );
    }
}
