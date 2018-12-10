import React, { Component } from "react"
// import ApiManager from "../../module/ApiManager"
import SearchList from "./SearchList"

export default class Search extends Component {

  state = {
    selectedShows: []
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  constructNewSearch = evt => {
    let selectedShows = []
    evt.preventDefault()
    const credentials = JSON.parse(sessionStorage.getItem('credentials'))
    const url = `https://api.themoviedb.org/3/search/multi?api_key=71beceaec7947e27f4fa92aadc09db8c&language=en-US&include_adult=false&query=${this.state.search}`
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        return data.results.map(data => {
          if (data.poster_path) {
            let selectedShowObject = {
            image: data.poster_path,
            title: data.original_name,
            synopsis: data.overview,
            apiID: data.id,
            credentials: credentials
          }
          return selectedShows.push(selectedShowObject)
        }
        })


      })
      .then(() => this.setState({selectedShows: selectedShows}))
  }

  render() {
    return (
      <React.Fragment>
        <div className="navigation__container--left">
          <input
            onChange={this.handleFieldChange}
            className="showInput"
            type="text"
            id="search"
            placeholder="Enter TV Show Title" />
          <button type="submit" onClick={this.constructNewSearch} className="btn btn-primary">Submit</button>
        </div>
        <SearchList selectedShow={this.state.selectedShows} friendsArray={this.props.friendsArray}/>
      </React.Fragment>
    )
  }
}