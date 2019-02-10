import React, { Component } from "react"
import ApiManager from "../../module/ApiManager"
import { Button, Form, Grid, Header, Image, Segment, Divider } from 'semantic-ui-react'
import Logo from "../../images/Cliquerlogo.png"
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
      alert("Username or password incorrect")
    } else if (this.state.username || this.state.password) {
      ApiManager.searchUsername(this.state.username).then(users => {
        if (users.length) {
          alert(`username ${this.state.username} already exists!`)
        } else if (!users.length) {
          ApiManager.saveData("users", newUser).then(user => {
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
      alert("Username or password incorrect")
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
    return (
      <div className='login-form'>
        {/* <style>{`
body > div,
body > div > div,
body > div > div > div.login-form {
  height: 0%;
}
`}</style> */}
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header color='red' textAlign='center' size="huge">
            </Header>
            <div className='logo'>
            <Image src={Logo} size='Small' />
            </div>
            <Form className="loginForm" size='large' onSubmit={this.handleLogin}>
              <Segment stacked>
                <Form.Input onChange={this.handleFieldChange} type="username"
                  id="username"
                  placeholder="Username"
                  required=' ' autoFocus="" fluid icon='mail' iconPosition='left' />
                <Form.Input
                  onChange={this.handleFieldChange} type="password"
                  id="password"
                  placeholder="Password"
                  required=""
                  fluid
                  icon='lock'
                  iconPosition='left'
                />

                <Button type="submit" className="btn btn-primary" color="red" fluid size='large' onClick={this.handleLogin}>
                  Login
                </Button>
                <Divider horizontal>Or</Divider>
                <Button type="submit" className="btn btn-primary" color="red" fluid size='large' onClick={this.handleRegister}>
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}