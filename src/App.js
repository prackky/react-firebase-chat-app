import React, {Component} from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Home from './containers/Home';
import Chat from './containers/Chat/Chat';
import Navigation from './components/Navigation/Navigation';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';

export class App extends Component {

  render(){
    let routes = (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/chat" component={Chat}/>
      </Switch>
    )
    return(<BrowserRouter>
      <Navigation isAuthorized={this.props.isAuthorized} logout={this.props.onRemovedAuthorization}/>
        {routes}
      </BrowserRouter>
      );
  }
}

const mapStateToProps = state => {
  return {
      isAuthorized: state.isAuthorized
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onRemovedAuthorization: () => dispatch({type: actionTypes.REMOVE_AUTHORIZATON})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
