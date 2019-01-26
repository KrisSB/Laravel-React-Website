import React, { Component } from 'react';

import SBPopup from './SBPopup';

export default class Searchbar extends Component {
    /*
    Required Props: api, link_location
    */
    constructor() {
        super();
        this.state = {
            data: [],
            filtered_data: [],
            showResults: false
        }
        this.search = this.search.bind(this);
    }
    componentDidMount() {
        Promise.all(this.props.api.map(url =>
            fetch(url)
            .then(response => response.json())
        ))
        .then(data => {
            this.setState({data})
        })
    }
    search() {
        let search = this.refs.search.value;
        let filter_check = this.filter(search);
        if(search.length <= 2) {
            let clear_array = [];
            this.setState({filtered_data : clear_array});
            this.setState({ showResults: false});
        }
        if((search.length >= 3) && (this.state.data.length >= 1)) {
            this.setState({ filtered_data: filter_check});
            this.setState({ showResults: true});
        }
        var check = false;
        for(let i = 0; i < filter_check.length; i++) {
            if(filter_check[i].length < 1 || search.length <= 2) {

            } else {
                check = true;
            }
        }
        if(check == false) {
            this.setState({ showResults: false});
        }
    }
    filter(search) {
        if(this.state.data.length > 0) {
            let array = new Array();
            for(var i = 0; i < this.state.data.length; i++) {
                let filtered_data = this.state.data[i].filter(result => {
                    let result_title = result.title.toLowerCase();
                    return result_title.indexOf(search.toLowerCase()) !== -1;
                });
                array.push(filtered_data);
            }
            return array;
            
        }
        return false;
    }
    toggle(bool) {
        setTimeout(
            function() {
                this.setState({showResults: bool})
            }
            .bind(this),
            250
        );
    }
    render() {
        return (
            <div id='searchbar'>
                <form>
                    <input type='text' placeholder='Search. .' ref='search' className='searchbar' onChange={this.search} onBlur={() => this.toggle(false)} onFocus={this.search} />
                </form>{this.state.showResults ? 
                    <div className='search_results'>
                         <SBPopup 
                            results={this.state.filtered_data}
                            link_location={this.props.link_location}
                        />
                    </div>
                    : null
                }
                
            </div>
        );
    }
}