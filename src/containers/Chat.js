import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';
import { auth } from "../services/firebase";
import { db } from "../services/firebase"

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: auth().currentUser,
          chats: [],
          content: '',
          readError: null,
          writeError: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      styles = {
        root: {
          display: 'flexbox',
          flexDirection: 'column',
          overflow: 'scroll',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        },
        gridList: {
        marginLeft: '30px',
        marginRight: '30px'
        },
        alignLeft: {
            textAlign: 'left'
        },
        alignRight: {
            textAlign: 'right'
        }
      }
    
      async componentDidMount() {
        this.setState({...this.state, readError: null });
        console.log(this.state);
        try {
          db.ref("my-new-project-182216").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            this.setState({...this.state, chats });
          });
        } catch (error) {
          this.setState({...this.state, readError: error.message });
        }
    }

    handleChange = (event) => {
        this.setState({
          content: event.target.value
        });
      }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("my-new-project-182216").push({
            content: this.state.content,
            timestamp: Date.now(),
            uid: this.state.user.uid,
            email: auth().currentUser.email
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }

    render() {
        return (
            !this.props.isAuthorized ? <Redirect to='/login'/> :
            <div>
                <div style={this.styles.gridList}>
                    {this.state.chats.map(chat => {
                    return <p style={chat.email===this.state.user.email?this.styles.alignRight:this.styles.alignLeft} key={chat.timestamp}>{chat.email +' sent: '+ chat.content}</p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.content}></input>
                    {this.state.error ? <p>{this.state.writeError}</p> : null}
                    <button type="submit">Send</button>
                </form>
                <div>
                    Logged in as: <strong>{this.state.user.email}</strong>
                </div>
    </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthorized: state.isAuthorized
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onAddedAuthorization: () => dispatch({type: actionTypes.ADD_AUTHORIZATON}),
        onRemovedAuthorization: () => dispatch({type: actionTypes.REMOVE_AUTHORIZATON})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
