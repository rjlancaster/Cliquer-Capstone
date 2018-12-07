import React, { Component } from "react"
import ApiManager from "../../module/ApiManager"
import "./login.css"

export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    username: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegister = e => {
    e.preventDefault()
    const newUser = {
      username: this.state.username,
      password: this.state.password
    }
    if (!this.state.username || !this.state.password) {
      alert("please")
    } else if (this.state.username || this.state.password) {
      ApiManager.searchUsername(this.state.username).then(users => {
        if (users.length) {
          alert(`username ${this.state.username} already exits!`)
        } else if (!users.length) {
          ApiManager.add("users", newUser).then(user =>{
            sessionStorage.setItem("credentials", parseInt(user.id))
            this.props.setAuth()
          }
          )
        }
      })
    }
  }

  // Simplistic handler for login submit
  handleLogin = e => {
    e.preventDefault()
    if (!this.state.username || !this.state.password) {
      alert("please")
    } else if (this.state.username || this.state.password) {
      ApiManager.searchNP(this.state.username, this.state.password).then(
        user => {
          if (!user.length) {
            alert("Wrong username or password!")
          } else if (user.length) {
            sessionStorage.setItem("credentials", parseInt(user[0].id))
            this.props.setAuth()
          }
        }
      )
    }
  }

  render() {
    return <form className="loginForm">
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputUsername">Username</label>
        <input onChange={this.handleFieldChange} type="username" id="username" placeholder="Username" required="" autoFocus="" />
        <label htmlFor="inputPassword">Password</label>
        <input onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" required="" />
        <button type="submit" onClick={this.handleLogin}>
          Sign in
        </button>
        <button type="submit" onClick={this.handleRegister}>
          Register
        </button>
      </form>
  }
}