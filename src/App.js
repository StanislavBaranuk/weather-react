import React, { Component } from 'react';

import {
  Route,
  Switch,
  withRouter
} from "react-router-dom"


import Home from 'pages/Home';
import City from 'pages/City';

class App extends Component {
  render() {
    const { history } = this.props;

    return (
        <div className="App">
          <Switch>
            <Route history={history} path='/city/:id' component={City} />
            <Route history={history} path='/' component={Home} />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App)
