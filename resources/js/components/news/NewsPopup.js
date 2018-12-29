import React, { Component } from 'react';

export default class NewsPopup extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            showPopup: false,
        }
       this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get('/api/user')
            .then(response => {
                this.setState({ user : response.data });
            });
    }
    handleSubmit(e) {
      
        e.preventDefault();
        let description = this.refs.description.value;
        let title = this.refs.title.value;
        let user_id = this.state.user.id;
        title = title.charAt(0).toUpperCase() + title.slice(1);
        let data = [title,description,user_id];
        if(title !== '') {
            this.props.addArticle(data);
            this.props.closePopup();
        } else {
            
        }
    }
    render() {
      return (
        <div className='popup'>
            <div className='popup_outer' onClick={this.props.closePopup}></div>
            <div className='popup_inner'>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder='Title..' ref="title" /><br />
                        <textarea placeholder='Description..' ref="description" />
                    </label>
                    <input type="submit" value="Submit" className='btn btn-primary' />
                </form>
            </div>
        </div>
      );
    }
  }