import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {db} from "../../services/firebase"
import {Button, Input} from '@material-ui/core';

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

    styles = {
        root: {
            display: 'flex',
            flexDirection: 'column-reverse',
            overflow: 'auto',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            padding: '10px'
        },
        gridList: {
            marginLeft: '30px',
            marginRight: '30px',
            height: '450px',
            overflowY: 'scroll'
        },
        alignLeft: {
            textAlign: 'left',
            borderColor: '#ccc',
            backgroundColor: '#ddd'
        },
        alignRight: {
            textAlign: 'right',
            borderColor: '#bbb',
            backgroundColor: '#eee'
        },
        sent: {
            fontSize: 'x-small',
            color: '#aaa'
        },
        textBox: {
            width: '100%'
        }
    }

    async componentWillUnmount() {
        this.setState( {chats: [], content: '', readError: null, writeError: null});
        console.log('disconnecting unmount');
        try {
            db
                .ref("my-new-project-182216")
                .off("value");
        } catch (error) {
            this.setState({
                ...this.state,
                readError: error.message
            });
        }
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

    handleChange = (event) => {
        this.setState({content: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.props);
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
            : <div>
                <div style={this.styles.gridList}>
                    {this
                        .state
                        .chats
                        .map(chat => {
                            return <div
                                key={chat.timestamp}
                                style={chat.email === this.props.email
                                ? this.styles.alignRight
                                : this.styles.alignLeft}>
                                <span style={this.styles.sent}>{chat.email + ' sent: '}</span>
                                <p>{chat.content}</p>
                            </div>
                        })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        onChange={this.handleChange}
                        value={this.state.content}
                        style={this.styles.textBox}></Input>
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