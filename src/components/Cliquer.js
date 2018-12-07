import React, { Component } from 'react'
import Navbar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "./Cliquer.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Cliquer extends Component {
  render() {
    return <React.Fragment>
      <Navbar {...this.props} />
      <ApplicationViews {...this.props} />
    </React.Fragment>
  }
}