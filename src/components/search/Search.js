import React, { Component } from "react"
// import ApiManager from "../../module/ApiManager"
import SearchList from "./SearchList"

export default class Search extends Component {

  state = {
    selectedShow: {}
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  constructNewSearch = evt => {
    evt.preventDefault()
    const credentials = JSON.parse(localStorage.getItem('credentials'))
    const url = `https://api.themoviedb.org/3/search/multi?api_key=71beceaec7947e27f4fa92aadc09db8c&language=en-US&include_adult=false&query=${this.state.search}`
    return fetch(url)
      .then(data => data.json())
      .then(data => {
        let selectedShowObject = {
          image: data.results.poster_path,
          title: data.results.original_name,
          synopsis: data.results.overview,
          apiID: data.results.id,
          credentials: credentials.id
        }
        console.log(selectedShowObject)
        this.setState({ selectedShow: selectedShowObject });
      })
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
        {/* <SearchList selectedShow={this.state.seldectedShow}/> */}
      </React.Fragment>
    )
  }
}