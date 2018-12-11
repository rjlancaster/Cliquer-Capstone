import React, { Component } from "react"
// import DataManager from "../../module/DataManager"
import DetailsModal from "../detail/detailsModal"
import { Button } from 'reactstrap';
import ApiManager from "../../module/ApiManager"
import "./Recs.css"

export default class RecsList extends Component {
  credentials = parseInt(sessionStorage.getItem('credentials'))

  state = {
    showArray: []
  }

  componentDidMount() {
    this.setRecsList()
  }

  setRecsList() {
    let showArray = []
    this.props.shows.filter((show => this.credentials === show.recipientID))
      .map(show => {
        if (show.rating === 0) {
          const url = `https://api.themoviedb.org/3/tv/${show.apiID}?api_key=71beceaec7947e27f4fa92aadc09db8c`
          return fetch(url)
            .then(data => data.json())
            .then(data => {
              let senderID = []
              senderID.push(this.props.users.find((user) => show.requesterID === user.id))
              let showObject = {
                showId: show.id,
                image: data.poster_path,
                title: data.original_name,
                synopsis: data.overview,
                apiID: data.id,
                senderID: senderID[0].username,
                userID: this.credentials
              }
              showArray.push(showObject)
              this.setState({ showArray: showArray })
            })
        }
      })
  }

  render() {
    return (
      <section className="recs">
        {
          this.state.showArray.map(show => {
            return (<div key={show.id} className="poster-Group" >
              <div>
                <DetailsModal show={show} setRecsList={this.setRecsList} {...this.props} />
              </div>
              <div className="posterFooter">
                <div>
                  From {show.senderID}
                </div>
              </div>
            </div>
            )
          }
          )
        }
      </section>
    )
  }
}