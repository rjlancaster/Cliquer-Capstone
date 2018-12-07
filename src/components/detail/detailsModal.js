import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import "./detail.css"

export default class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  // upVote = () => {
  //   this.props.shows.rating
  // }

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
            <Button color="primary" onClick={this.toggle}>Love It!</Button>
            <Button color="secondary" onClick={this.toggle}>Hate It!</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}