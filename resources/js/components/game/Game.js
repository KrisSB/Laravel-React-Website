import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TipPopup from './TipPopup';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            gamedata: [],
            user: [],
            wiki: [],
            showPopup: false,
        }
        this.get_game_url = this.get_game_url.bind(this);
        this.handleAddTip = this.handleAddTip.bind(this);
    }
    //Finds the dyanamic part of the URL
    get_game_url() {
        let url = window.location.href;
        let array = url.split('/');
        let game = array[4];
        return game;
    }
    //TODO: add way to catch memory leak
    componentDidMount() {
        let game = this.get_game_url();
        fetch('../api/showGame/' + game)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data === false) {
                    return window.location.replace('http://' + window.location.hostname + '/VideoGames');
                } else {
                    this.setState({gamedata: data[0]});
                    this.setState({wiki: data[1]})
                }
            })
            .catch(err => console.error(err));
        //Gets user Data, we use Laravel Passport in the background to pass a Laravel_Token
        axios.get('/api/user')
        .then(response => {
            this.setState({ user : response.data });
        })
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleAddTip(data) {
        data.push(this.state.gamedata.id);
        data.push(this.state.user.id);
        fetch('../api/storeWikis', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(wiki => {
            this.setState({wiki});
        });
        
    }
    render() {
        let wiki = this.state.wiki.map(post => {
            return <div key={post.id}>{post.title}{post.body}</div>
        })
        return(
            <div>
                <button id='add-tip' onClick={this.togglePopup.bind(this)} className='btn btn-primary'>Add Game Tip</button>
                {/* if ?==true else :==false statement */}
                {this.state.showPopup ? 
                    <TipPopup
                        closePopup={this.togglePopup.bind(this)}
                        addTip={this.handleAddTip.bind(this)}
                    />
                    : null
                }
                {wiki}
            </div>
        );
        
        
    }

}

if (document.getElementById('game')) {
    ReactDOM.render(<Game />, document.getElementById('game'));
}