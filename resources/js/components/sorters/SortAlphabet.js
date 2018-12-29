import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Page from './Page';

export default class SortAlphabet extends Component {
    /*
    Required Props: api, link_location, page_api
    */
    constructor() {
        super();
        this.state = {
            data: [],
            pages: []
        }
    }
    componentDidMount() {
        fetch(this.props.api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.setState({data});
            this.page_sorter();
        });
    }
    page_sorter() {
        let data = this.state.data;
        let page_array = new Array();
        for(let i = 0; i < data.length; i++) {
            let page_letter = data[i]['firstletter'];
            if(page_letter === '0-9') {
                page_letter = '#';
            }
            if(!page_array.includes(page_letter)) {
                page_array.push(page_letter);
            }
        }
        this.setState({pages: page_array});
    }
    link_sorter() {
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let array = new Array();
        if(this.state.pages.length > 0) {
            array.push(<li key='All'><Link to={this.props.link_location + 'All'}>All</Link></li>);
        } else {
            array.push(<li key='All'>All</li>);
        }
        if(this.state.pages.includes('#')) { 
            array.push(<li key='#'><Link to={this.props.link_location + '0-9'}>#</Link></li>);
        } else {
            array.push(<li key='#'>#</li>);
        }
        for(let i = 0; i < letters.length; i++) {
            let letter = letters.charAt(i);
            if(this.state.pages.includes(letter)) {
                array.push(<li key={letter}><Link to={this.props.link_location + letter}>{letter}</Link></li>);
            } else {
                array.push(<li key={letter}>{letter}</li>);
            }
        }
        return array;
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ul className='sort_alphabet'>
                            {this.link_sorter()}
                        </ul>
                        <Route path={this.props.link_location + ':page'} render={props => <Page page_api={this.props.page_api} link_location={this.props.link_location}key={props.match.params.page} {...props} />}/>
                    </div>
                </Router>
            </div>
        );
    }
}