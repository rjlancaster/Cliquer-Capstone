import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu, Icon, Button } from 'semantic-ui-react'
import "bootstrap/dist/css/bootstrap.min.css"

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
      <Menu>
        <Menu.Item
          name='recommendations'
          as={Link}
          to="/recommendations"
          active={activeItem === 'recommendations'}
          onClick={this.handleItemClick}>
          Recommendations
        </Menu.Item>

        <Menu.Item
          name='history'
          as={Link}
          to="/history"
          active={activeItem === 'history'}
          onClick={this.handleItemClick}>
          My History
        </Menu.Item>

        <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick}>
          Search
        </Menu.Item>

        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
        >
          Logout
        </Menu.Item>
      </Menu>

    //   <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
    //     <ul className="nav nav-pills">
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/recommendations"><Icon name="user circle" size="large" />Recommendations</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/history">My History</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/friends">My Clique</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" to="/search">Search</Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link" onClick={this.logout} to="/login">Logout</Link>
    //       </li>
    //     </ul>
    //   </nav>
    )
  }
}

export default NavBar