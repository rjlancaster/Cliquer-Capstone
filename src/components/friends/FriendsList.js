import React, { Component } from "react"
import ApiManager from "../../module/ApiManager"
import "./Friends.css"

export default class FriendsList extends Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))

  state = {

  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  componentDidMount() {
    this.props.findFriends(this.credentials)
  }

  addRelationship = () => {
    let currentUserId = this.credentials
    let userIdArray = []
    userIdArray.push(this.props.users.find(user => user.username === this.state.addFriend))
    let object = {
      userId: currentUserId,
      friendId: userIdArray[0].id
    }
    return ApiManager.saveData("relationships", object)
      .then(() => this.props.findFriends(currentUserId))
  }

  removeRelationship = () => {
    let currentUserId = this.credentials
    let userIdArray = []
    let userFriendMatch = []
    userIdArray.push(this.props.users.find(user => user.username === this.state.delFriend))
    userFriendMatch.push(this.props.relationships.find(user => user.friendId === userIdArray[0].id && user.userId === currentUserId))
    return ApiManager.deleteData("relationships", userFriendMatch[0].id)
      .then(() => {
        return this.props.findFriends(currentUserId)
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="clique">
          <div>
            <section className="friendList">
              <p>My Clique</p>
              {
                this.props.friendsArray.map(friend => {
                  return (<div className="friend-Group" key={friend.id}>
                    <div>
                      <p>{friend.username}</p>
                    </div>
                  </div>
                  )
                })
              }
            </section>
            <section className="addFriend">
              <p>Add a friend:</p>
              <input
                onChange={this.handleFieldChange}
                className="showInput"
                type="text"
                id="addFriend" />
              <button type="submit" onClick={this.addRelationship} className="btn btn-primary">Submit</button>
            </section>
            <section className="removeFriend">
              <p>Remove a friend:</p>
              <input
                onChange={this.handleFieldChange}
                className="showInput"
                type="text"
                id="delFriend" />
              <button type="submit" onClick={this.removeRelationship} className="btn btn-primary">Submit</button>
            </section>
          </div>
          <div className="userList">
            <p>User List</p>
            {
                this.props.users.map(user => {
                  return (<div className="userGroup" key={user.id}>
                    <div>
                      <p>{user.username}</p>
                    </div>
                  </div>
                  )
                })
              }
          </div>
        </div>
      </React.Fragment>
    )
  }
}