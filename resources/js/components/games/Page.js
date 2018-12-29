import React, { Component } from 'react';

export default class Page extends Component {
    constructor() {
        super();
        this.state = {
            games: []
        }
    }
    //Currently getting Data from the Game Model of Laravel, Future will use a prop to send fetch from main and then filter to first letter 
    componentDidMount() {
        let page = this.props.match.params.page;
        fetch('../api/showGames/' + page)
        .then(response => {
            return response.json();
        }) 
        .then(games => {
            this.setState({games})
        })
    }
    render() {
        let games = this.state.games.map(game => {
            return <div key={game.id} className='page_result'><a href={'/VideoGames/' + game.url}>{game.title}</a></div>
        })
        return(
            <div className='page_results'>
                {games}
            </div>
        );
   }
    
}