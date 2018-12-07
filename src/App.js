
import React, { Component } from "react"
import IsAuth from "./components/Auth/IsAuth"
import "./App.css"

class App extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null


  state = {
    activeUser: this.isAuthenticated()
  }

  setAuth = () => {
    this.setState({ auth: this.isAuthenticated() })
  }
  render() {
    return <React.Fragment>
      <IsAuth isAuthenticated={this.isAuthenticated} setAuth={this.setAuth} />
    </React.Fragment>
  }
}

export default App