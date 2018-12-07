// import React, { Component } from "react"
// import RecList from "./RecsList"

// export default class PreRecsList extends Component {
//   state = {
//     showArray: []
//   }

//   componentDidMount() {
//     let showArray = []
//     this.props.shows.map(show => {
//       const url = `https://api.themoviedb.org/3/tv/${show.apiID}?api_key=71beceaec7947e27f4fa92aadc09db8c`
//       return fetch(url)
//         .then(data => data.json())
//         .then(data => {
//           let showObject = {
//             showId: show.id,
//             image: data.poster_path,
//             title: data.original_name,
//             synopsis: data.overview,
//             apiID: data.id
//           }
//           showArray.push(showObject)
//           this.setState({showArray: showArray})
//         })
//     })
//   }

//   render() {
//     console.log(this.state.showArray.length)
//     return (
//       <React.Fragment>
//         {
//           this.state.showArray.length > 0 ? <RecList {...this.props} showArray={this.state.showArray}/> : null

//         }
//       </React.Fragment>

//     )
//   }
// }