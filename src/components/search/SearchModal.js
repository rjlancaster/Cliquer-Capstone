import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import ApiManager from "../../module/ApiManager"
import "./Search.css"

export default class DetailsModal extends React.Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))

  state = {
    friendRecommendation: []
  }
  constructor(props) {
    super(props);
    this.state = {
      modal: false
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
    // fix the username to ID
    ApiManager.getUserId(friendName)
      .then(friend => {
        let object = {
          requesterID: currentUserId,
          recipientID: friend.id,
          apiID: this.props.show.apiID,
          rating: 0
        }
        return object
      })
      .then((object) => {
        ApiManager.saveData("shows", object)
        this.setState({
          modal: !this.state.modal
        })
      })
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    render() {
      return (
        <div>
          <Button className="modalButton" color="success" onClick={this.toggle}>Details</Button>
          <Modal className="modal-container" size="xl" isOpen={this.state.modal} toggle={this.toggle} >
            <ModalBody>
              <div className="detail-group">
                <div>
                  <img className="" src={`https://image.tmdb.org/t/p/w300${this.props.show.image}`} alt="tv-poster" />
                </div>
                <div>
                  <h4>{this.props.show.title}</h4>
                  <p>{this.props.show.synopsis}</p>
                </div>
              </div >
            </ModalBody>
            <ModalFooter>
              <div className="navigation__container--left">
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
      );
    }
  }