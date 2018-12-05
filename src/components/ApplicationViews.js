import { Route } from 'react-router-dom'
import React, { Component } from "react"
import RecsList from './recs/RecsList'
import HistoryList from './history/HistoryList'
import FriendsList from './friends/FriendsList'
import Search from './search/Search'


export default class ApplicationViews extends Component {


    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <RecsList />
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