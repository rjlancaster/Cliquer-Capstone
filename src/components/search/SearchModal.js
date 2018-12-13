import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
// import { Button } from 'semantic-ui-react'
import ApiManager from "../../module/ApiManager"
import YouTube from 'react-youtube'
import "./Search.css"

export default class SearchModal extends React.Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))

  state = {
    friendRecommendation: [],
    showVideo: []
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      showVideo: {}
    };

    this.toggle = this.toggle.bind(this);
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  addShow = () => {
    let currentUserId = this.credentials
    let friendName = this.state.friendRecommendation
    let friendId = this.props.friendsArray.find((friend) => friend.username === friendName)
    if (friendId) {
      let object = {
        requesterID: currentUserId,
        recipientID: friendId.id,
        apiID: this.props.show.apiID,
        rating: 0
      }
      ApiManager.saveData("shows", object)
      this.setState({
        modal: !this.state.modal
      })
    } else {
      alert("You have not listed one of your friends. Please choose a friend from your friendlist.")
    }
  }

  constructVideoSearch = evt => {
    const url = `https://api.themoviedb.org/3/tv/${this.props.show.apiID}/videos?api_key=71beceaec7947e27f4fa92aadc09db8c&language=en-US`
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        let showVideoID = {
          videoID: data.results[0].key
        }
        this.setState({showVideo: showVideoID})
      })

  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.constructVideoSearch()
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }
    return (
      <React.Fragment>
        <div>
          <div>
            <img className="poster-Image" src={`https://image.tmdb.org/t/p/w300${this.props.show.image}`} onClick={this.toggle} alt="tv-poster" />
          </div>
          <Modal className="modal-container modalSize" size="xl" isOpen={this.state.modal} toggle={this.toggle} >
            <ModalBody>
              <div className="detail-group">
                <div className="image">
                  <div className="taco">
                    <img className="detailImage" src={`https://image.tmdb.org/t/p/w300${this.props.show.image}`} alt="tv-poster" />
                    <YouTube
                      className="detailImage"
                      videoId={this.state.showVideo.videoID}
                      opts={opts}
                      onReady={this._onReady}
                    />
                  </div>
                </div>
                <div className="titleAndSynopsis">
                  <h4>{this.props.show.title}</h4>
                  <p>{this.props.show.synopsis}</p>
                </div>
              </div >
            </ModalBody>
            <ModalFooter className="sendRec">
              <div>
                <input
                  onChange={this.handleFieldChange}
                  className="showRecommendation"
                  type="text"
                  id="friendRecommendation"
                  placeholder="Recommend this show to a friend!" />
                <button type="submit" onClick={this.addShow} className="btn btn-primary">Submit</button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}