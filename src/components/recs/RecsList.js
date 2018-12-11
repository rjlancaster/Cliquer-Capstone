import React, { Component } from "react"
// import DataManager from "../../module/DataManager"
import DetailsModal from "../detail/detailsModal"
import "./Recs.css"

export default class RecsList extends Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))

  state = {
    showArray: []
  }

  componentDidMount() {
    let showArray = []
    this.props.shows.filter((show => this.credentials === show.recipientID))
      .map(show => {
        if (show.rating === 0) {
          const url = `https://api.themoviedb.org/3/tv/${show.apiID}?api_key=71beceaec7947e27f4fa92aadc09db8c`
          return fetch(url)
            .then(data => data.json())
            .then(data => {
              let showObject = {
                showId: show.id,
                image: data.poster_path,
                title: data.original_name,
                synopsis: data.overview,
                apiID: data.id,
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
                <img className="poster-Image" src={`https://image.tmdb.org/t/p/w300${show.image}`} alt="tv-poster" />
              </div>
              <div>
                <DetailsModal show={show} {...this.props} />
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