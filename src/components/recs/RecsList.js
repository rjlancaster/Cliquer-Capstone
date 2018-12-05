import React, { Component } from "react"
import DataManager from "../../module/DataManager"

export default class RecsList extends Component {
  render() {
    return (
      <section className="recs">
      {
          this.props.recs.map(recs =>
              <div key={recs.id}>
                  {recs.apiID}
              </div>
          )
      }
      </section>
    )
  }
}