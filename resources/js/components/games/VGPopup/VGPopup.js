import React, { Component } from 'react';

import Consoles from './Consoles';
import Genres from './Genres';

export default class VGPopup extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            games: [],
            consoles: [],
            checkedConsoles: new Map(),
            checkedGenres: new Map()
        }
        this.consoleCheckBox = this.consoleCheckBox.bind(this);
        this.genreCheckBox = this.genreCheckBox.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        let consoles = Array.from(this.state.checkedConsoles.keys());
        let genres = Array.from(this.state.checkedGenres.keys());

        let title = this.refs.title.value;
        let description = this.refs.description.value;

        title = title.charAt(0).toUpperCase() + title.slice(1);
        let data = [title,description,consoles,genres];
        if(title !== '') {
            this.props.addGame(data);
            this.props.closePopup();
        } else {
            
        }
    }
    consoleCheckBox(e) {
        let map = this.state.checkedConsoles;
        if(e.target.checked === true) {
            map.set(e.target.name, e.target.value);
        } else {
            map.delete(e.target.name);
        }
        this.setState({checkedConsoles: map });
    }
    genreCheckBox(e) {
        let map = this.state.checkedGenres;
        if(e.target.checked === true) {
            map.set(e.target.name, e.target.value);
        } else {
            map.delete(e.target.name);
        }
        this.setState({checkedGenres: map });
    }
    render() {
      return (
        <div className='popup'>
            <div className='popup_outer' onClick={this.props.closePopup}></div>
            <div className='popup_inner'>
                <form onSubmit={this.handleSubmit}>
                    <ul id='popup_list'>
                        <li><input type="text" id='popup_title' placeholder='Title' ref="title" /></li>
                        <li><textarea placeholder='Description' id='popup_description' ref="description" /></li>
                        <li>
                            <Consoles
                                checkBox = {this.consoleCheckBox.bind(this)}
                            />
                        </li>
                        <li>
                            <Genres
                                checkBox = {this.genreCheckBox.bind(this)}
                            />
                        </li>
                        <li><input type="submit" value="Submit" className='btn' /></li>
                    </ul>
                </form>
            </div>
        </div>
      );
    }
  }