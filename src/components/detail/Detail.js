// import React, { Component } from "react"
// import "./detail.css"

// export default class Detail extends Component {

//   state = {
//     selectedShow: {}
//   }

//   // Still need to pass the apiID from onClick in recslist to the url link. replace 61671 below
//   componentDidMount() {
//     this.getShow()
//   }

//   getShow = () => {
//     let showId = 61671
//     const url = `https://api.themoviedb.org/3/tv/${showId}?api_key=71beceaec7947e27f4fa92aadc09db8c`;
//     return fetch(url)
//       .then(data => data.json())
//       .then(data => {
//         let selectedShowObject = {
//           showId: data.id,
//           image: data.poster_path,
//           title: data.original_name,
//           synopsis: data.overview,
//           apiID: data.id
//         }
//         console.log(selectedShowObject)
//         this.setState({ selectedShow: selectedShowObject });
//       })
//   }


//   render() {
//     return (
//       <div className="detail-group">
//           <img src={`https://image.tmdb.org/t/p/w300${this.state.selectedShow.image}`} alt="tv-poster" />
//           <h1>{this.state.selectedShow.title}</h1>
//           <h3>{this.state.selectedShow.synopsis}</h3>
//       </div >
//     )
//   }
// }