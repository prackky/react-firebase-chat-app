import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {signup} from '../../helpers/auth';
import {Button, Input, Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import '../../App.css';

export class Signup extends Component {
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
        await signup(this.state.email, this.state.password).then(response => {
            //console.log(response);
            this.setState({
                ...this.state,
                email: '',
                password: '',
                error: "Signup successful."
            });
            this
                .props
                .history
                .push('/login');
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
            : <Grid container direction="column" alignItems="center" justify="center">
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up
                    </h1>
                    <p>Fill in the form below to create an account.</p>
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
                        <Button type="submit" variant="contained" color="primary">Sign up</Button>
                    </div>
                    <hr></hr>
                    <p>Already have an account?
                        <Link to="/login">Login</Link>
                    </p>
                </form>
            </Grid>)
    }
}

const mapStateToProps = state => {
    return {isAuthorized: state.isAuthorized};
};

export default connect(mapStateToProps, null)(Signup);
