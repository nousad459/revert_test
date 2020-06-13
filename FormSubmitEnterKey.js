import React,{Component} from "react";

import "./App.css";


class App extends Component{
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      input: "",
      messages: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.keyEnter = this.keyEnter.bind(this);
  }
  handleChange(event) {
    this.setState( {input: event.target.value} );
  }
    
  submitMessage() {
    alert("hello")
  }
  

    
  keyEnter(event) {
    if (event.key === "Enter") {
      this.submitMessage();
    }
  }
  
    render() {
      return (
        <div>
          <h2>Type in a new Message:</h2>
          <input
            onChange={this.handleChange}
            value={this.state.input}
            onKeyPress={this.keyEnter}
          />
          <button className="btn btn-success" onClick={this.submitMessage}>Add message</button>

        </div>
      );
    }

}
export default App;
