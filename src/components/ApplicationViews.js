import { Route } from 'react-router-dom'
import React, { Component } from "react"
import RecsList from './recs/RecsList'
import HistoryList from './history/HistoryList'
import FriendsList from './friends/FriendsList'
import Search from './search/Search'


export default class ApplicationViews extends Component {

  usersFromAPI = [
    { id: 1, email: "rjlancaster@gmail.com" },
    { id: 2, email: "william.g.morgan@gmail.com" }
  ]

  shows = [
    { id: 1, requesterID: 1, recipientID: 2, apiID: 61671, rating: 0}
  ]

  state = {
    users: this.usersFromAPI,
    shows: this.shows
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <RecsList shows={this.state.shows}/>
        }} />
        <Route path="/history" render={(props) => {
          return <HistoryList />
        }} />
        <Route path="/friends" render={(props) => {
          return <FriendsList />
        }} />
        <Route path="/search" render={(props) => {
          return <Search />
        }} />
      </React.Fragment>
    )
  }
}