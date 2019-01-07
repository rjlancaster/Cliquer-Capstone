import { Route } from 'react-router-dom'
import React, { Component } from "react"
import RecsList from './recs/RecsList'
import HistoryList from './history/HistoryList'
import ResultsList from './results/ResultsList'
import FriendsList from './friends/FriendsList'
import Search from './search/Search'
import ApiManager from '../module/ApiManager'

export default class ApplicationViews extends Component {
  credentials = parseInt(sessionStorage.getItem('credentials'))
  state = {
    users: [],
    shows: [],
    relationships: [],
    friendsArray: []
  }

//populate all states on initial load
  componentDidMount() {
    this.getShows()
    this.findFriends(this.credentials)
  }

  getUsers = () => {
    return ApiManager.getData("users")
      .then((users) => this.setState({ users: users }))
  }

  getShows = () => {
    return ApiManager.getData("shows")
      .then(shows => this.setState({ shows: shows }))
  }

  getRelationships = () => {
    return ApiManager.getData("relationships")
      .then(relationships => this.setState({ relationships: relationships }))
  }

  findRelationships = (currentUserId) => {
    return this.getUsers().then(() => this.getRelationships())
      .then(() => {
        return this.state.relationships.filter((relationship) => relationship.userId === currentUserId)
      })
  }

  findFriends = (currentUserId) => {
    return this.findRelationships(currentUserId)
      .then((relationships) => {
        let friendsArray = []
        relationships.forEach((relationship) => {
          friendsArray.push(this.state.users.find(user => user.id === relationship.friendId))
        })
        this.setState({ friendsArray: friendsArray })
      })
  }

  removeShow = (id) => {
    ApiManager.deleteData("shows", id)
      .then(shows => this.setState({
        shows: shows
      })
      )
  }

  render() {
    return !this.state.shows.length ? <span>Loading page...</span> :
      (
        <React.Fragment>
          <Route exact path="/recommendations" render={(props) => {
            return <RecsList shows={this.state.shows} users={this.state.users} getShows={this.getShows} {...props} />
          }} />
          <Route path="/history" render={(props) => {
            return <HistoryList shows={this.state.shows} users={this.state.users} getShows={this.getShows} {...props} />
          }} />
          <Route path="/results" render={(props) => {
            return <ResultsList shows={this.state.shows} users={this.state.users} getShows={this.getShows} {...props} />
          }} />
          <Route path="/friends" render={(props) => {
            return <FriendsList users={this.state.users} relationships={this.state.relationships} friendsArray={this.state.friendsArray} findFriends={this.findFriends} />
          }} />
          <Route path="/search" render={(props) => {
            return <Search getShows={this.getShows} friendsArray={this.state.friendsArray} {...props} />
          }} />
        </React.Fragment>
      )
  }
}