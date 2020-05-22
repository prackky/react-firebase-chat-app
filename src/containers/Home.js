import React, { Component } from 'react'

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: 'xx-large',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        textAlign: 'center'
    }
}
class Home extends Component {
    render() {
        return (
            <div style={styles.root}>
                <p>Welcome to Chat POC.</p>
            </div>
        )
    }
}

export default Home;
