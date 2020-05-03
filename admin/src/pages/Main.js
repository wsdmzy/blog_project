import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login/index'

function Main() {
  return (
    <Router>
      <Route path="/login/" exact component={Login} />
    </Router>
  )
}

export default Main