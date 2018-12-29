import React, { Component } from 'react';

export default class TipPopup extends Component {
    constructor() {
        super();
        this.state = {
            user: []
        }
       this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
      
        e.preventDefault();
        let body = this.refs.body.value;
        let title = this.refs.title.value;
        title = title.charAt(0).toUpperCase() + title.slice(1);
        let data = [title,body];
        if(body !== '') {
            this.props.addTip(data);
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
                        <textarea placeholder='Tip..' ref="body" />
                    </label>
                    <input type="submit" value="Submit" className='btn btn-primary' />
                </form>
            </div>
        </div>
      );
    }
  }