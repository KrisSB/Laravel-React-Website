import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class Article extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            articleData: []
        }
    }
    //Finds the dyanamic part of the URL
    get_article_url() {
        let url = window.location.href;
        let array = url.split('/');
        let article= array[4];
        return article;
    }
    //TODO: add way to catch memory leak
    componentDidMount() {
        let article = this.get_article_url();
        fetch('../api/showNews/' + article)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data === false) {
                    return window.location.replace('http://' + window.location.hostname + '/News');
                } else {
                    this.setState({articleData:data})
                }
            })
            .catch(err => console.error(err));
        //Gets user Data, we use Laravel Passport in the background to pass a Laravel_Token
        axios.get('/api/user')
        .then(response => {
            this.setState({ user : response.data });
        })
    }
    handleEditArticle(data) {

    }
    render() {
        return(
            <div>
               <h1>{this.state.articleData.title}</h1>
               <h5>{this.state.articleData.description}</h5>
               <h2><p>{this.state.articleData.body}</p></h2>
            </div>
        );
        
        
    }

}

if (document.getElementById('article')) {
    ReactDOM.render(<Article />, document.getElementById('article'));
}