import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import TipPopup from './TipPopup';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            gamedata: [],
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
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    handleAddTip(data) {
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        data.push(this.state.gamedata.id);
        fetch('../api/storeWikis', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": token         
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