import React, { Component } from "react"

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

  render() {
    return (
      <React.Fragment>
        <section className="friendList">
          <p>Friend List:</p>
          {
            this.props.friendsArray.map(friend => {
              return (<div className="friend-Group" key={friend.id}>
                <div>
                  <p>{friend.email}</p>
                </div>
              </div>
              )
            })
          }
        </section>
        <section className="addFriend">
          <p>Add a friend:</p>

        </section>
      </React.Fragment>
    )
  }
}