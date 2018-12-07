import { Route } from 'react-router-dom'
import React, { Component } from "react"
import RecsList from './recs/RecsList'
import HistoryList from './history/HistoryList'
import FriendsList from './friends/FriendsList'
import Search from './search/Search'
import DetailsModal from './detail/detailsModal'


export default class ApplicationViews extends Component {

  state = {
    users: [],
    shows: [],
    friends: []
  }

  deleteshow = id => {
    return fetch(`http://localhost:5002/shows/${id}`, {
        method: "DELETE"
    })
    .then(e => e.json())
    .then(() => fetch(`http://localhost:5002/shows`))
    .then(e => e.json())
    .then(shows => this.setState({
        shows: shows
    })
  )
}


  componentDidMount() {
    const newState = {}

    fetch("http://localhost:5002/users")
        .then(r => r.json())
        .then(users => newState.users = users)
        .then(() => fetch("http://localhost:5002/shows")
        .then(r => r.json()))
        .then(shows => newState.shows = shows)
        .then(() => fetch("http://localhost:5002/friends")
        .then(r => r.json()))
        .then(friends => newState.friends = friends)
        .then(() => this.setState(newState))
}

  render() {
    if (! this.state.shows.length) {
      return null
    }
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <RecsList delete={this.deleteshow} shows={this.state.shows} {...props} />
        }} />
        <Route path="/history" render={(props) => {
          return <HistoryList delete={this.deleteshow} shows={this.state.shows} />
        }} />
        <Route path="/friends" render={(props) => {
          return <FriendsList friends={this.state.friends}/>
        }} />
        <Route path="/search" render={(props) => {
          return <Search />
        }} />
        <Route path="/detail" render={(props) => {
          return <DetailsModal shows={this.state.shows} {...props}/>
        }} />
      </React.Fragment>
    )
  }
}