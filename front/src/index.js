import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,

  document.getElementById('root'),
)

serviceWorker.unregister()
