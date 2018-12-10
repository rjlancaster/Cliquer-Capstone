import { Route } from 'react-router-dom'
import React, { Component } from "react"
import RecsList from './recs/RecsList'
import HistoryList from './history/HistoryList'
import FriendsList from './friends/FriendsList'
import Search from './search/Search'
import DetailsModal from './detail/detailsModal'
import ApiManager from '../module/ApiManager'


export default class ApplicationViews extends Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))
  state = {
    users: [],
    shows: [],
    relationships: [],
    friendsArray: []
  }

  componentDidMount() {
    const newState = {}
    ApiManager.getData("users")
      .then(allUsers => {
        newState.users = allUsers
      })
    ApiManager.getData("shows")
      .then(allShows => {
        newState.shows = allShows
      })
    ApiManager.getData("relationships")
      .then(allRelationships => {
        newState.relationships = allRelationships
      })
      .then(() =>
        this.setState(newState))
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
      .then((rels) => {
        let friendsArray = []
        rels.forEach((rel) => {
          friendsArray.push(this.state.users.find(user => user.id === rel.friendId))
        })
        this.setState({ friendsArray: friendsArray })
      })
  }

  removeRelationship = (id) => {
    return ApiManager.deleteData("relationships", id)
      .then(() => new Promise((resolve) => {
        this.setState({
          friendsArray: [],
          relationships: []
        }, () => resolve())
      }))
      .then(() => {
        return this.findFriends(this.credentials)
      })
  }

  addRelationship = (newFriendId) => {
    let currentUserId = this.credentials
    let object = {
      userId: currentUserId,
      friendId: newFriendId
    }
    return ApiManager.saveData("relationships", object)
      .then(() => this.findFriends(currentUserId))
  }

  addShow = (friendId, apiID) => {
    let currentUserId = this.credentials
    let object = {
      userId: currentUserId,
      friendId: friendId,
      apiID: apiID,
      rating: 0
    }
    return ApiManager.saveData("shows", object)
      .then(() => this.getShows())
  }

  removeShow = (id) => {
    ApiManager.deleteData("shows", id)
      .then(shows => this.setState({
        shows: shows
      })
      )
  }

  render() {
    if (!this.state.shows.length) {
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
          return <FriendsList relationships={this.state.relationships} friendsArray={this.state.friendsArray} findFriends={this.findFriends}/>
        }} />
        <Route path="/search" render={(props) => {
          return <Search getShows={this.getShows} {...props}/>
        }} />
        <Route path="/detail" render={(props) => {
          return <DetailsModal shows={this.state.shows} users={this.state.users} friends={this.state.friends}{...props} />
        }} />
      </React.Fragment>
    )
  }
}