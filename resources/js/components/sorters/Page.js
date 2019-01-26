import React, { Component } from 'react';

import Pagination from './Pagination';

export default class Page extends Component {
    constructor() {
        super();
        this.state = {
            games: [],
            resultsPerPage: 25,
            totalPages: 0,
            currentPage: 1,
            currentGames: [],
        }
        this.handlePagination = this.handlePagination.bind(this);
    }
    componentDidMount() {
        let page = this.props.match.params.page;
        fetch(this.props.page_api + page)
        .then(response => {
            return response.json();
        }) 
        .then(games => {
            this.setState({games});
            this.handlePagination(0,(this.state.resultsPerPage -1),1);
            this.setState({totalPages: this.getTotalPages()});
        })
    }
    filter_data(data,page) {
        let games = [];
        data.forEach(result => {
            if(result.firstletter.toLowerCase() === page.toLowerCase()) {
                games.push(result);
            }
        });
        return games;
    }
    getTotalPages() {
        let totalPages = Math.ceil(this.state.games.length / this.state.resultsPerPage);
        return totalPages;
    }
    handlePagination(gameStart,gameEnd,page) {
        let currentGames = this.state.games.slice(gameStart,gameEnd);
        this.setState({currentPage: page});
        this.setState({currentGames});
    }
    render() {
        let results = this.state.currentGames.map(result => {
            return <div key={result.id} className='page_result'><a href={this.props.link_location + result.url}>{result.title}</a></div>
        });
        return(
            <div className='page_results'>
                {results}
                <Pagination 
                    key={this.state.currentPage}
                    currentPage={this.state.currentPage}
                    totalPages={this.state.totalPages}
                    resultsPerPage={this.state.resultsPerPage}
                    changePage={this.handlePagination}
                />
            </div>
        );
   }
    
}