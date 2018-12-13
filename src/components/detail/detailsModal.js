import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from 'semantic-ui-react'
import "./detail.css"
import ApiManager from "../../module/ApiManager"

export default class DetailsModal extends React.Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))
  constructor(props) {
    super(props);
    this.state = {
      modal: false
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <div className="posterImageDiv">
          <img src={`https://image.tmdb.org/t/p/w300${this.props.show.image}`} onClick={this.toggle} alt="tv-poster" />
        </div>
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