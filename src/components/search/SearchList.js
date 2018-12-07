import React, { Component } from "react"
// import ApiManager from "../../module/ApiManager"

export default class SearchList extends Component {

  render() {
    return (
      <section>
        {
          this.props.selectedShow.map(show => {
            return (<div className="poster-Group" key={show.apiID}>
              <div>
                <img className="poster-Image" src={`https://image.tmdb.org/t/p/w300${show.image}`} alt="tv-poster" />
              </div>
              {/* <div>
            <DetailsModal show={show} />
            </div> */}
            </div>
            )
          }
          )
        }
      </section>
    )
  }
}