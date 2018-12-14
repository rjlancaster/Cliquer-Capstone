import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu } from 'semantic-ui-react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"

class NavBar extends Component {

  state = {}

  logout = () => {
    sessionStorage.clear("credentials")
    this.props.setAuth()
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (

      <Menu inverted>
      <h1 className="title">Cliquer</h1>
        <Menu.Item
          name='recommendations'
          as={Link}
          to="/recommendations"
          position="right"
          className="navItems"
          active={activeItem === 'recommendations'}
          onClick={this.handleItemClick}>
          Recommendations
        </Menu.Item>

        <Menu.Item
          name='history'
          as={Link}
          to="/history"
          position="right"
          className="navItems"
          active={activeItem === 'history'}
          onClick={this.handleItemClick}>
          My History
        </Menu.Item>

        <Menu.Item
          name='results'
          as={Link}
          to="/results"
          position="right"
          className="navItems"
          active={activeItem === 'results'}
          onClick={this.handleItemClick}>
          My Results
        </Menu.Item>

        <Menu.Item
          name='friends'
          as={Link}
          to="/friends"
          position="right"
          className="navItems"
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}>
          My Clique
        </Menu.Item>

        <Menu.Item
          name='search'
          as={Link}
          to="/search"
          position="right"
          className="navItems"
          active={activeItem === 'search'}
          onClick={this.handleItemClick}>
          Search
        </Menu.Item>

        <Menu.Item
          name='logout'
          as={Link}
          to="/logout"
          position="right"
          className="navItems"
          active={activeItem === 'logout'}
          onClick={this.logout}>
          Logout
        </Menu.Item>
      </Menu>
    )
  }
}

export default NavBar