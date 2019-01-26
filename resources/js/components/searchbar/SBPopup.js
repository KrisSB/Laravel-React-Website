import React, { Component } from 'react';

export default class SBPopup extends Component {
    constructor() {
        super();
        this.state = {
            games: []
        }
        this.results = this.results.bind(this);
    }
    results() {
        let array = new Array();
        for(var i = 0; i < this.props.results.length; i++) {
            var newArray = this.props.results[i];
            for(var x = 0; x < newArray.length; x++) {
                newArray[x].link_location = this.props.link_location[i];
                array.push(newArray[x]);
            }
        }
        return array;
    }
    render() {
    let filtered_results = this.results();
    let results = filtered_results.map(filtered_game => {
        return <a href={filtered_game.link_location + filtered_game.url}  key={filtered_game.id} ><div className='search_result'>{filtered_game.title}</div></a>
    });
      return (
        <div className='sb_popup'>
            {results}
        </div>
      );
    }
  }