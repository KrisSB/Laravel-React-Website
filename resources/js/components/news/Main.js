import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Searchbar from '../searchbar/Searchbar';
import SortAlphabet from '../sorters/SortAlphabet';
import NewsPopup from './NewsPopup';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            showPopup: false,
            alphabetKey: 1
        };
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleAddArticle(data) {
        fetch('../api/storeNews', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(news => {
            let alphabetKey = this.state.alphabetKey + 1;
            this.setState({alphabetKey});
        });
        
    }
    render() {
        return (
            <div className='app'>
                <a href='/AddArticle'><button id='add-tip' className='btn btn-primary'>Add News Article</button></a>
                {/* if ?==true else :==false statement */}
                {this.state.showPopup ? 
                    <NewsPopup
                        closePopup={this.togglePopup.bind(this)}
                        addArticle={this.handleAddArticle.bind(this)}
                    />
                    : null
                }
                <Searchbar 
                    api={['../api/news/']}
                    link_location={['/News/']}
                />
                <SortAlphabet
                    api='../api/news/'
                    page_api='../api/paginateNews/'
                    link_location='/News/'
                    key={this.state.alphabetKey} 
                />
            </div>
            );
    }
};

if (document.getElementById('news')) {
    ReactDOM.render(<Main />, document.getElementById('news'));
}