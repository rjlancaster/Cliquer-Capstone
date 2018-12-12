import ReactDOM from "react-dom"
import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import './index.css'
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Router>
      <App />
  </Router>
  , document.getElementById('root'))