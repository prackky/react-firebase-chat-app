import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export class Navigation extends Component {
    styles = {
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: '2px',
        },
        title: {
          flexGrow: 1,
        },
      };
    render() {
        console.log(this.props);
        return (
        <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" style={this.styles.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={this.styles.title}>
            Chat POC
          </Typography>
          {this.props.isAuthorized ? 
          <Button color="inherit" onClick={this.props.logout}>Logout</Button> 
            :<div>
            <Button color="inherit"><NavLink to="/login">Login</NavLink></Button>
            <Button color="inherit"><NavLink to="/signup">Signup</NavLink></Button>
        </div>
            }
        </Toolbar>
      </AppBar>
        )
    }
}


export default Navigation;
