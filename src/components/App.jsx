import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { retrieveSession } from "../state/ducks/session/operations"
import { Route, Switch } from "react-router-dom";

import '../styles/app.css';
import Home from './Home'
import Welcome from './Welcome'


const mapStateToProps = state => ({
  location: state.router.location.pathname
});

const mapDispatchToProps = dispatch => bindActionCreators({
  retrieveSession,
}, dispatch);

class App extends Component {
  componentWillMount() {
    this.props.retrieveSession();
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={Welcome} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
