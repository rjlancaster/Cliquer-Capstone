import React, { Component } from "react"
import "./detail.css"

export default class Detail extends Component {

  state = {
    image: [],
    data: []
  }

// Still need to pass the apiID from onClick in recslist to the url link. replace 61671 below

  componentDidMount() {
    let image = []
    const url = `https://api.themoviedb.org/3/tv/61671?api_key=71beceaec7947e27f4fa92aadc09db8c`
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        let posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`
        image.push(posterUrl)
        this.setState({ image: image })
        this.setState({ data: data})
      })
  }


  render() {
    return (
      <div className="detail-group">
        <div>
        <img  className="" src={this.state.image} alt="tv-poster" />
        </div>
        <div>
        <h1>{this.state.data.name}</h1>
        <h3>{this.state.data.overview}</h3>
        </div>
      </div >
    )
  }
}