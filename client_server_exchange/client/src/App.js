import React, { Component } from 'react';
import './App.css';
import SingleInput from "./components/SingleInput/SingleInput";
import Status from  "./components/Status/Status";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      status: "status here! ;)"
    };
  }

  /* componentDidMount() {
     // simulating a call to retrieve user data
     // (create-react-app comes with fetch polyfills!)
     fetch('http://localhost:3000/kek', {
       method: 'post',
       headers: {
         'Accept': 'application/json, text/plain, *!/!*',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({a: 7, str: 'Строка: &=&'})}).then(res=>res.json())
       .then(res => console.log(res));
   }*/

  handleLoginChange = (e) => {
    this.setState({ login: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  clearForm = (e) => {
    e.preventDefault();
    this.setState({
      login: "",
      password: ""
    })
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.status === 200){
          this.setState({
            status: response.body.firstName + " " + response.body.lastName
          });
        }else if(response.status === 404){
          this.setState({
            status: "not found :("
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.clearForm(e);
  };

  render() {
    return (
      <form className={"container"} onSubmit={this.handleFormSubmit}>
        <SingleInput
          title={"Login:  "}
          name={"loginField"}
          inputType={"text"}
          value={this.state.login}
          controlFunc={this.handleLoginChange}
          placeholder={"Login"} />
        <SingleInput
          title={"Pass : "}
          name={"passwordField"}
          inputType={"password"}
          value={this.state.password}
          controlFunc={this.handlePasswordChange}
          placeholder={"Password"} />
        <input
          type={"submit"}
          className={"frmSubmitBtn"}
          value={"Submit"} />
        <button className={"btnClearForm"} onClick={this.clearForm}> Clear form </button>
        <Status
          status={this.state.status} />
      </form>
    )
      ;
  }
}

export default App;
