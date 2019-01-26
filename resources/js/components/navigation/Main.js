import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Searchbar from '../searchbar/Searchbar';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    
    render() {
        return (
            <div className='search'>
                <Searchbar 
                    api={['../api/games/','../api/news/']}
                    link_location={['/VideoGames/','/News/']}
                />
            </div>
            );
    }
};

if (document.getElementById('navSearchBar')) {
    ReactDOM.render(<Main />, document.getElementById('navSearchBar'));
}