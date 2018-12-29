import React, { Component } from 'react';

export default class Genres extends Component {
    
    constructor() {
        super();
        this.state = {
            genres: []
        }
    }
    
    componentDidMount() {
        fetch('../api/genres')
        .then(response => {
            return response.json();
        }) 
        .then(data => {
            this.setState({genres : data})
        })
    }
    render() {
        let genres = this.state.genres.map(genre => {
            return <li key={genre.id}>
                    <input type="checkbox" name={genre.ref_title} value={genre.ref_title} className='genre' onClick={this.props.checkBox} />
                    <label className='genreLabel'>{genre.title}</label>
                </li>
        });
        return (
            <ul className='genres'>
                {genres}
            </ul>
        )
    }
}