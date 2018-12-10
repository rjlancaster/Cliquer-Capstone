import React, { Component } from "react"
import Login from "./Login"
import Cliquer from "../Cliquer"

export default class IsAuth extends Component {
  activeUser() {
    return sessionStorage.getItem("credentials")
  }

  render() {
    // console.log(this.activeUser())
    return <React.Fragment>
        {this.props.isAuthenticated() ? (
        <Cliquer activeUser={this.activeUser} {...this.props} />
        ) : (
          <Login {...this.props} />
        )}
      </React.Fragment>
  }
}