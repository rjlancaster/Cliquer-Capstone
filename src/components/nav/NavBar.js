import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
// import ApiManager from "../../module/ApiManager"

class NavBar extends Component {

  logout = () => {
    sessionStorage.clear("credentials")
    this.props.setAuth()
  }

  render() {
    return (
      <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to="/">Recommendations</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/history">History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/friends">Friends</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">Search</Link>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-success"
              onClick={this.logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default NavBar