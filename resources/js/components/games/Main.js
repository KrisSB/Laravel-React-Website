import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Default from './Default';
import SortAlphabet from '../sorters/SortAlphabet';

export default class Main extends Component {
    //TODO: Fetch Data needed for the page and then pass data between the children, instead of having seperate fetches for every single child
    constructor() {
        super();
        this.state = {
            showPopup: false,
            games: [],
            pages: [],
            alphabetKey: 1,
            user: []
        };
    }
    /* On submit to add game, insert the new data and returns the all the data */
    handlePopupSubmit(data) {
        fetch('../api/storeGames', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }).then(response => {
                return response.json();
          }).then(games => {
                console.log(games);
                let alphabetKey = this.state.alphabetKey + 1;
                this.setState({games});
                this.setState({alphabetKey})
                if(window.location.href !== 'http://' + window.location.hostname + '/VideoGames') {
                    window.location.replace('http://' + window.location.hostname + '/VideoGames');
                }
          });
        
    }
    render() {
        return (
        <div className='app'>
            <Default addGame={this.handlePopupSubmit.bind(this)} />
            <SortAlphabet 
                link_location='/VideoGames/'
                page_api='../api/paginateGames/'
                api='api/games'
                key={this.state.alphabetKey} 
            />
        </div>
        );
    }
};

if (document.getElementById('games')) {
    ReactDOM.render(<Main />, document.getElementById('games'));
}