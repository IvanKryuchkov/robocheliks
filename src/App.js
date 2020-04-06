import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import { connect } from 'react-redux';
import { setSearchField } from '../actions.js';

const mapStateToProps = state => {
    return {
        searchfield: state.searchRobots.searchfield
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        console.log(this.props.store)
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => this.setState({ robots: users}));
    }
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render () {
        const filteredRobots = this.state.robots.filter(robots =>{
        return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) })
    if (this.state.robots.length === 0) {
        return <h1>Loading...</h1>
    } else {
        return (
        <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
            <ErrorBoundry>
                <CardList robots={filteredRobots} />
            </ErrorBoundry>
        </Scroll>
        </div>
    );
    }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);