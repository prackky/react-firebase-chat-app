import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {db} from "../../services/firebase"
import {Button, Input} from '@material-ui/core';
import classes from './Chat.module.css';

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            content: '',
            readError: null,
            writeError: null
        };
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    async componentDidMount() {
      console.log('mounting chat component');
        this.setState({
            ...this.state,
            readError: null
        });
        console.log(this.state);
        try {
            db
                .ref("my-new-project-182216")
                .on("value", snapshot => {
                    let chats = [];
                    snapshot.forEach((snap) => {
                        chats.push(snap.val());
                    });
                    this.setState({
                        ...this.state,
                        chats
                    });
                });
        } catch (error) {
            this.setState({
                ...this.state,
                readError: error.message
            });
        }
    }

    async componentWillUnmount() {
        console.log('unmounting chat component');
          try {
              console.log('disconnecting db connection');
              db.ref("my-new-project-182216").off("value");
          } catch (error) {
              console.log(error);
          }
      }

    handleChange = (event) => {
        this.setState({content: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({
            ...this.state,
            writeError: null
        });
        try {
            await db
                .ref("my-new-project-182216")
                .push({
                    content: this.state.content,
                    timestamp: Date.now(),
                    uid: this.props.uid,
                    email: this.props.email
                });
            this.setState({
                ...this.state,
                content: ''
            });
        } catch (error) {
            this.setState({
                ...this.state,
                writeError: error.message
            });
        }
    }

    render() {
        return (!this.props.isAuthorized
            ? <Redirect to='/login'/>
            : <div className={classes.Root}>
                <div className={classes.GridList}>
                    {this
                        .state
                        .chats
                        .map(chat => {
                            return <div
                                key={chat.timestamp}
                                className={chat.email === this.props.email
                                ? classes.AlignRight
                                : classes.AlignLeft}>
                                <span className={classes.Sent}>{chat.email + ' sent: '}</span>
                                <p>{chat.content}</p>
                            </div>
                        })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        onChange={this.handleChange}
                        value={this.state.content}
                        className={classes.TextBox}></Input>
                    {this.state.error
                        ? <p>{this.state.writeError}</p>
                        : null}
                    <Button variant="contained" color="primary" type="submit">Send</Button>
                </form>
                <div>
                    Logged in as:
                    <strong>{this.props.email}</strong>
                </div>
            </div>)
    }
}

const mapStateToProps = state => {
    return {isAuthorized: state.isAuthorized, uid: state.userId, email: state.email};
};

export default connect(mapStateToProps, null)(Chat);
