import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {signin} from '../helpers/auth';
import {Button, Input, Grid} from '@material-ui/core';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: "",
            password: ""
        }
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange = (event) => {
        const type = event.target.type;
        const value = event.target.value;
        if (type === 'email') {
            this.setState({
                ...this.state,
                email: value
            });
        } else if (type === 'password') {
            this.setState({
                ...this.state,
                password: value
            });
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        await signin(this.state.email, this.state.password).then(response => {
            //console.log(response);
            this.setState({
                ...this.state,
                message: "Login successful."
            });
            //console.log(response.user.uid, response.user.xa);
            this
                .props
                .onAddedAuthorization(response.user.uid, response.user.xa, this.state.email);
            this
                .props
                .history
                .replace('/chat');
        }).catch(error => {
            //console.log(error);
            this.setState({
                ...this.state,
                email: '',
                password: '',
                error: error.message
            });
        });

    }
    render() {
        return (this.props.isAuthorized
            ? <Redirect to='/chat'/>
            :
                <Grid container direction="column" alignItems="center" justify="center">
                    <form onSubmit={this.handleSubmit}>
                        <h1>
                            Sign In
                        </h1>
                        <div>
                            <Input
                                placeholder="Email"
                                name="email"
                                type="email"
                                onChange={this.handleChange}
                                value={this.state.email}></Input>
                        </div>
                        <div>
                            <Input
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                type="password"></Input>
                        </div>
                        <div>
                            {this.state.error
                                ? <p>{this.state.error}</p>
                                : null}
                            <Button type="submit" variant="contained" color="primary">Sign in</Button>
                        </div>
                        <hr/>
                        <p>Don't have an account?
                            <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </Grid>)
    }
}

const mapStateToProps = state => {
    return {isAuthorized: state.isAuthorized};
};

const mapDispatchToProps = dispatch => {
    return {
        onAddedAuthorization: (userId, token, email) => dispatch({type: actionTypes.ADD_AUTHORIZATON, userId: userId, token: token, email: email})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
