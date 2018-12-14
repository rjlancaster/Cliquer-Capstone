import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'semantic-ui-react'
import YouTube from 'react-youtube'
import "./ResultsModal.css"
import ApiManager from "../../module/ApiManager"
// import greenchk from "../../images/greenchk"

export default class ResultsModal extends React.Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))
  state = {
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

  removeShow = () => {
    ApiManager.deleteData("shows", this.props.show.showId)
      .then(() => this.props.getShows())
      .then(() => {
        this.toggle()
        this.props.setRecsList()
      })
  }

  upVote = () => {
    const upVote = {
      rating: 1
    }
    ApiManager.editData("shows", this.props.show.showId, upVote)
      .then(() => this.props.getShows())
      .then(this.setState({ modal: !this.state.modal })
      ).then(() => {
        this.props.history.push("/history")
      })
  }

  downVote = () => {
    const downVote = {
      rating: 2
    }
    ApiManager.editData("shows", this.props.show.showId, downVote)
      .then(() => this.props.getShows())
      .then(this.setState({ modal: !this.state.modal })
      ).then(() => {
        this.props.history.push("/history")
      })
  }

  constructVideoSearch = evt => {
    const url = `https://api.themoviedb.org/3/tv/${this.props.show.apiID}/videos?api_key=71beceaec7947e27f4fa92aadc09db8c&language=en-US`
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        let showVideoID = {
          videoID: data.results[0].key
        }
        this.setState({ showVideo: showVideoID })
      })
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
      <div>
        <div className="posterImageDiv">
          <img src={`https://image.tmdb.org/t/p/w185${this.props.show.image}`} onClick={this.toggle} alt="tv-poster" style={{cursor: 'pointer'}} />
          <img className={this.props.show.greenchk} src={require('./greenchk.png')} alt="greenchk" />
          <img className={this.props.show.redx} src={require('./redx.png')} alt="redx" />
        </div>
        <Modal className="modal-container modalSize" size="xl" isOpen={this.state.modal} toggle={this.toggle} >
          <ModalBody>
            <div className="detail-group">
            <div className="image">
                <div className="taco">
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
          <ModalFooter className="footer">
            <div>
              <Button.Group>
                <Button color="green" onClick={this.upVote}>Love It</Button>
                <Button.Or />
                <Button color="black" onClick={this.downVote}>Hate It</Button>
                <Button.Or />
                <Button color="grey" onClick={this.removeShow}>Toss It</Button>
              </Button.Group>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
