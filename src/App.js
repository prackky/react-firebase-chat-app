import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Home from './containers/Home/Home';
import Chat from './containers/Chat/Chat';
import NotFound from './components/NotFound/NotFound';
import Navigation from './components/Navigation/Navigation';
import {connect} from 'react-redux';
import * as authActions from './store/authActions';

export class App extends Component {

  componentDidMount () {
    console.log('try auto login')
    this.props.onTryAutoSignup();
  }

    render() {
        let routes = (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        )

        if(this.props.isAuthorized) {
           routes = <Switch>
               <Route exact path="/" component={Home}/>
                <Route path="/chat" component={Chat}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        }
        return (
            <BrowserRouter>
                <Navigation
                    isAuthorized={this.props.isAuthorized}
                    logout={this.props.onRemovedAuthorization}/> 
            {routes}
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {isAuthorized: state.isAuthorized};
};

const mapDispatchToProps = dispatch => {
    return {
        onRemovedAuthorization: () => dispatch(authActions.removeAuth()),
        onTryAutoSignup: () => dispatch( authActions.checkAuth())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
