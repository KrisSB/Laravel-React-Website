import React, { Component } from 'react';
import VGPopup from './VGPopup/VGPopup';

import Searchbar from '../searchbar/Searchbar';

export default class Default extends Component  {
    constructor() {
        super();
        this.state = {
            showPopup: false,
        }
    }
    //Default of the showPopup state is false
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    //Calls the prop addGame which is handlePopupSubmit(data) method of Main.js that calls it
    handlePopupSubmit(title) {
        this.props.addGame(title);
    }
    render() {
        return (
            <div>
                <button id='add-game' onClick={this.togglePopup.bind(this)} className='btn btn-primary'>Add Game</button>
                <Searchbar 
                    api={['../api/games/']}
                    link_location={['/VideoGames/']}
                />
                {/* if ?==true else :==false statement */}
                {this.state.showPopup ? 
                    <VGPopup
                        closePopup={this.togglePopup.bind(this)}
                        addGame={this.handlePopupSubmit.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}