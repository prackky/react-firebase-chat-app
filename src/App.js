import React, {Component} from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Chat from './containers/Chat';
import Navigation from './components/Navigation/Navigation';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions';

class App extends Component {

  render(){
    return(<BrowserRouter>
      <Navigation isAuthorized={this.props.isAuthorized} logout={this.props.onRemovedAuthorization}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/chat" component={Chat}/>
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
