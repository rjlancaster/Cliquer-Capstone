import React, { Component } from "react"
import HistoryModal from "./HistoryModal"
import "./History.css"

export default class RecsList extends Component {
  credentials = JSON.parse(sessionStorage.getItem('credentials'))

  state = {
    showArray: []
  }

  componentDidMount() {
    this.setRecsList()
  }

  setRecsList = () => {
    let showArray = []
    this.props.shows.filter((show => this.credentials === show.recipientID))
      .map(show => {
        if (show.rating !== 0) {
          const url = `https://api.themoviedb.org/3/tv/${show.apiID}?api_key=71beceaec7947e27f4fa92aadc09db8c`
          return fetch(url)
            .then(data => data.json())
            .then(data => {
              let greenchk = ""
              let redx = ""
              if (show.rating === 1) {
                greenchk = "displayYes"
                redx = "hidden"
              } else if (show.rating === 2) {
                greenchk = "hidden"
                redx = "displayYes"
              }
              let senderID = []
              senderID.push(this.props.users.find((user) => show.requesterID === user.id))
              let showObject = {
                showId: show.id,
                image: data.poster_path,
                title: data.original_name,
                synopsis: data.overview,
                apiID: data.id,
                senderID: senderID[0].username,
                rating: show.rating,
                greenchk: greenchk,
                redx: redx,
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
            return (<div key={show.id} className="posterGroup" >
              <div>
                <HistoryModal show={show} setRecsList={this.setRecsList} {...this.props} />
              </div>
              <div className="posterFooter">
                  From {show.senderID}
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








// createMarkup() {
//   if (this.props.show.rating === 1) {
//     return {
//       __html: <img class="ratingImg" src={require('./greenchk.png')} alt="greenchk" />
//     }
//   }
//   else if (this.props.show.rating === 2) {
//     return {
//       __html: <img class="ratingImg" src={require('./redx.png')} alt="redx"
//       />
//     }
//   }
// }

// setRating() {
//   return <div dangerouslySetInnerHTML={this.createMarkup()} />
// }

  // state = {
  //   showCheck: "hidden",
  //   showX: "hidden"
  // }

  // componentDidMount = () => {
  //   this.toggleCheck()
  //   this.toggleX()
  // }