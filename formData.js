import React, { Component, Fragment } from 'react';
import Recaptcha from 'react-recaptcha';
import logo from './logo.svg';
import './App.css';
import AddRow from './AddRow';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange1 = this.onChange1.bind(this)

    this.state = {
      isVerified: false,
      selectedFile:null,
      selectedFileName:null,
      userId:"",
      selectedFileError:"",
      selectedFile2:null
    }
  }

  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('You have successfully subscribed!');
    } else {
      alert('Please verify that you are a human!');
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
       selectedFile:null,

      })
    }
  }

  onChange(e)
  {
     this.setState({selectedFile: e.target.files[0], selectedFileName:e.target.files[0].name})
     
  }
  onChange1(e)
  {
    this.setState({selectedFile2: e.target.files[0], selectedFileName:e.target.files[0].name})
  }
  validate()
  {
    console.log("selllll",this.state.selectedFile.type)
    let selectedFileError = "";
    if(!(this.state.selectedFile.type === "application/pdf"))
    {
      selectedFileError = "Please select pdf file"
    }
    if(selectedFileError)
    {
      this.setState({selectedFileError})
      return false
    }
      return true
  }
  async onSubmit(e)
  {
    e.preventDefault();
   const isValid = this.validate();
   if(isValid)
   {
    console.log("true")
     const formData = new FormData;
    formData.append('profile_image',this.state.selectedFile)
    formData.append('user_id',this.state.userId)
    formData.append('name',this.state.userId)
 
    try{
       const res  = axios.post('http://localhost:5000/users/upload',formData,{
         headers:{
           'Content-Type': 'multipart/form-data'
         }
       });

       res.then((ress)=>{
        console.log("sad",ress);
       });

    }catch(err)
    {
         console.log(err)
    }
   }
   else{
     console.log("false")
   }
    
  }

  render() {
    //console.log("selllll",this.state.selectedFile.type)
    return (

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">React Recaptcha Demo - PentaCode</h1>
      //   </header>
      //   <div className="App-intro">
      //     <input type="text" placeholder="email@company.com" />

      //     <div
      //       className="convert"
      //       onClick={this.handleSubscribe}
      //     >Subscribe</div>

      //     <Recaptcha
      //       sitekey="6Lcd__8UAAAAAISSgq9jFyY51fmIIlnkWX-9zkYa"
      //       render="explicit"
      //       onloadCallback={this.recaptchaLoaded}
      //       verifyCallback={this.verifyCallback}
      //     />
      //   </div>
      //   <AddRow/>
      // </div>
      <Fragment>
{/* <form onSubmit={this.onSubmit}> */}
  <input type="file" id="customFile" onChange={this.onChange}/>
  <input type="file" id="customFile22" onChange={this.onChange1}/>
  <div style={{color:'red'}}>
    { this.state.selectedFileName ? !(this.state.selectedFileName.type === "application/pdf")? this.state.selectedFileError:"":this.state.selectedFileError}
  </div>
  <input type="text" onChange={(e)=>this.setState({userId: e.target.value})}/>
  <button type="button" onClick={this.onSubmit}>Upload</button>
{/* </form> */}
      </Fragment>
    );
  }
}

export default App;
