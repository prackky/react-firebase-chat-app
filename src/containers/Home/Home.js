import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 'xx-large',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        textAlign: 'center'
    }
}
const Home = (props) => {
    console.log(props.isAuthorized);
    return (props.isAuthorized
        ? <Redirect to='/chat'/>
        : <div style={styles.root}>
            <p>Welcome to Chat POC.</p>
        </div>)
}

const mapStateToProps = state => {
    return {isAuthorized: state.isAuthorized};
};

export default connect(mapStateToProps, null)(Home);
