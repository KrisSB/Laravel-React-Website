import React, { Component } from 'react';

export default class Consoles extends Component {
    
    constructor() {
        super();
        this.state = {
            consoles: []
        }
    }
    
    componentDidMount() {
        fetch('../api/consoles')
        .then(response => {
            return response.json();
        }) 
        .then(data => {
            this.setState({consoles : data})
        })
    }
    render() {
        let consoles = this.state.consoles.map(game_console => {
            return <li key={game_console.id}>
                    <input type="checkbox" name={game_console.ref_title} value={game_console.ref_title} className='console' onClick={this.props.checkBox} />
                    <label className='consoleLabel'>{game_console.title}</label>
                </li>
        });
        return (
            <ul className='consoles'>
                {consoles}
            </ul>
        )
    }
}