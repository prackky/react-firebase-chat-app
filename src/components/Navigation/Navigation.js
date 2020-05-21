import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export class Navigation extends Component {
    styles = {
        root: {
            flexGrow: 1
        },
        menuButton: {
            marginRight: '2px',
            color: 'white'
        },
        title: {
            flexGrow: 1
        }
    };
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        style={this.styles.menuButton}
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" style={this.styles.title}>
                        Chat POC
                    </Typography>
                    {this.props.isAuthorized
                        ? <Button color="inherit" onClick={this.props.logout}>Logout</Button>
                        : <div>
                            <Link to="/login"><Button style={this.styles.menuButton}>Login</Button></Link>
                            <Link to="/signup"><Button style={this.styles.menuButton}>Signup</Button></Link>
                        </div>
}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navigation;
