import React, { Component } from "react"
import SearchModal from "./SearchModal"
import { Button } from 'semantic-ui-react'
import "./Search.css"

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

  // contains search string and populates the selectedShows state with data from the promise
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
      .then(() => this.setState({ selectedShows: selectedShows }))
  }

  render() {
    return (
      <React.Fragment>
        <div className="searchBox">
          <div className="taco">
            <input
              onChange={this.handleFieldChange}
              className="searchText"
              type="text"
              id="search"
              placeholder="start a show search" />
          </div>
          <Button inverted color='grey' type="submit" onClick={this.constructNewSearch}>
            Submit
      </Button>
        </div>
        <section className="searchList">
          {
            this.state.selectedShows.map(show => {
              return (<div className="poster-Group" key={show.apiID}>
                <div>
                  <SearchModal show={show} {...this.props} />
                </div>
              </div>
              )
            }
            )
          }
        </section>
      </React.Fragment>
    )
  }
}