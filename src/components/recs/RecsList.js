import React, { Component } from "react"
// import DataManager from "../../module/DataManager"
import "./Recs.css"

export default class RecsList extends Component {
  state = {
    images: []
  }

  componentDidMount() {
    let images = []
    this.props.shows.map(show => {
      const url = `https://api.themoviedb.org/3/tv/${show.apiID}?api_key=71beceaec7947e27f4fa92aadc09db8c`
      return fetch(url)
        .then(data => data.json())
        .then(data => {
          let showItem = data.poster_path;
          let posterUrl = `https://image.tmdb.org/t/p/w185${showItem}`
          images.push(posterUrl)
          this.setState({images: images})
        })
    })
  }

  render() {
    return (
      <section className="recs">
        {
          this.state.images.map(image => {
            return (<div className="poster-Group">
              <img onClick={() => console.log("clicked")} className="poster-Image" src={image} alt="tv-poster" />
            </div>
            )
          }
          )
        }
      </section>
    )
  }
}