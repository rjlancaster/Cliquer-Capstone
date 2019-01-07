import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import ApiManager from "../../module/ApiManager"
import YouTube from 'react-youtube'
import "./Search.css"

export default class SearchModal extends React.Component {
  credentials = parseInt(sessionStorage.getItem('credentials'))

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

  // adds a show to a friends recommendation list
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

  // required search to aquire YouTube video id
  constructVideoSearch = () => {
    const url = `https://api.themoviedb.org/3/tv/${this.props.show.apiID}/videos?api_key=71beceaec7947e27f4fa92aadc09db8c&language=en-US`
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        if (!data.results || data.results.length===0) {
          {
            let showVideoID = {
              videoID: null
            }
            this.setState({ showVideo: showVideoID })
          }
        }
        else {
          let showVideoID = {
            videoID: data.results[0].key
          }
          this.setState({ showVideo: showVideoID })
        }
      })
  }

  // access to player in all event handlers via event.target
  _onReady(event) {
    event.target.pauseVideo();
  }

  // toggle into modal and searches for show input
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
            <img className="poster-Image" src={`https://image.tmdb.org/t/p/w300${this.props.show.image}`} onClick={this.toggle} alt="tv-poster" style={{ cursor: 'pointer' }} />
          </div>
          <Modal className="modal-container modalSize" size="xl" isOpen={this.state.modal} toggle={this.toggle} >
            <ModalBody>
              <div className="detail-group">
                <div className="image">
                  <div className="posterAndVideoFlex">
                    <img className="detailImage" src={`https://image.tmdb.org/t/p/w300${this.props.show.image}`} alt="tv-poster" />
                    <YouTube
                      className="detailVideo"
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
                  placeholder="Recommend this show" />
                <button type="submit" onClick={this.addShow} className="btn btn-primary searchBtn">Submit</button>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}