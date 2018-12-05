import React, { Component } from 'react'
import Navbar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import "./Cliquer.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Cliquer extends Component {
    render() {
        return (
            <div>
              <React.Fragment>
                <Navbar />
                <ApplicationViews />
              </React.Fragment>
            </div>
        );
    }
}


// this.props.shows.map(shows => {
//   // console.log(this.showlist(shows.apiID))
//   this.showlist(shows.apiID)
//     .then (data => {
//       console.log(data)
//       let test = data
//     return (<div key={shows.id}>
//     <p> Hello </p>
//       <img src={test} alt="hi"/>
//     </div>)
//     })
// }