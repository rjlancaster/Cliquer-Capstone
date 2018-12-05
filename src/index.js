import ReactDOM from "react-dom"
import React from 'react'
import Cliquer from "./components/Cliquer"
import { BrowserRouter as Router } from "react-router-dom"
import './index.css'

ReactDOM.render(
  <Router>
      <Cliquer />
  </Router>
  , document.getElementById('root'))