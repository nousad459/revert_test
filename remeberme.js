import React, { useState, useEffect } from 'react'; 
 function RememberMe(props){
    // static displayName = 'RememberMe'
 
    // state = {
    //     email: '',
    //     password: '',
    //     isChecked: false,
    // }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setisChecked] = useState(false);

 
    useEffect(()=> {
        if (localStorage.checkbox && localStorage.email !== "") {
            // this.setState({
            //     isChecked: true,
            //     email: localStorage.username,
            //     password: localStorage.password
            // })
            setEmail(localStorage.username)
            setPassword(localStorage.password)
            setisChecked(true)
        }
    })
 
   const onChangeValue = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
 
  const  onChangeCheckbox = event => {
        this.setState({
            isChecked: event.target.checked
        })
    }
 
   const loginSubmit = () => {
        //const { email, password, isChecked } = this.state
        if (isChecked && email !== "") {
            localStorage.username = email
            localStorage.password = password
            localStorage.checkbox = isChecked
        }
        // here call the API to signup/login
    }
 
    // render() {
    //     const { email, password, isChecked } = this.state
        return (
            <div>
                <form>
                    <table align="center">
                        <tr>
                            <td><label>Email</label></td>
                            <td><input type="email" name="email" value={email} onChange={onChangeValue}/></td>
                        </tr>
                        <tr>
                            <td><label>Password</label></td>
                            <td><input type="password" name="password" value={password} onChange={onChangeValue}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <input type="checkbox" checked={isChecked} name="lsRememberMe" onChange={onChangeCheckbox} />
                                <label>Remember me</label></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="button" value="Login" onClick={loginSubmit} /></td>
                        </tr>
                    </table>
                </form>
            </div>
        )
    // }
}
 
export default RememberMe
