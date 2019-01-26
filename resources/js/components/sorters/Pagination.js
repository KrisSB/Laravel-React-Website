import React, { Component } from 'react';

export default class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            nav: [],
            totalPages: 0,
            cushion: 1
        }
    }
    componentDidMount() {
        this.paginate_nav();
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.totalPages!==prevState.totalPages){
            return { totalPages: nextProps.totalPages};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.totalPages !== this.props.totalPages){
            this.setState({totalPages: this.props.totalPages});
            this.paginate_nav();
        }
    }
    paginate(page) {
        if(page === 'Previous') {
            page = this.props.currentPage - 1;
            if(this.props.currentPage < 2) {
                page = 1;
            }
        }
        if(page === 'Next') {
            
            page = this.props.currentPage + 1;
            if(this.props.currentPage >= this.props.totalPages) {
                page = this.props.totalPages;
            }
        }
        let gameStart = (this.props.resultsPerPage * (page - 1));
        let gameEnd = (this.props.resultsPerPage * page) - 1;
        this.props.changePage(gameStart,gameEnd,page);
    }
    paginate_nav(currentPage = 1) {
        currentPage = this.props.currentPage;
        let array = new Array();
        if((this.state.totalPages <= 5) && (this.state.totalPages > 1)) {
            array.push(<button onClick={() => this.paginate('Previous')}>Previous</button>);
            for(let i = 1; i < this.state.totalPages + 1; i++) {
                if(i == currentPage) {
                    array.push(<button onClick={() => this.paginate(i)} disabled>{i}</button>);
                } else {
                    array.push(<button onClick={() => this.paginate(i)}>{i}</button>);
                }
            }
            array.push(<button onClick={() => this.paginate('Next')}>Next</button>);
        }
        if(this.state.totalPages > 5) {
            array.push(<button onClick={() => this.paginate('Previous')}>Previous</button>);
            for(let i = 1; i < this.state.totalPages + 1; i++) {
                if(i < (currentPage - this.state.cushion) || i > (currentPage + this.state.cushion)) {
                    if (i == 1 || i == currentPage) {
                        array.push(<button onClick={() => this.paginate(i)}>{i}</button>);
                    } else if (i == 2 || i == (this.props.totalPages - 1)) {
                        array.push('...');
                    }
                } else {
                    if(i == currentPage) {
                        array.push(<button onClick={() => this.paginate(i)} disabled>{i}</button>);
                    } else {
                        array.push(<button onClick={() => this.paginate(i)}>{i}</button>);
                    }
                }
            }
            if(this.state.totalPages > (currentPage + this.state.cushion)) {
                array.push(<button onClick={() => this.paginate(this.state.totalPages)}>{this.state.totalPages}</button>);
            }
            array.push(<button onClick={() => this.paginate('Next')}>Next</button>);
        }
        this.setState({nav:array});
    }
    
    render() {
        let paginate = this.state.nav.map(function(page, index) {
            return <span key={index}>{page}</span>
        });
        return (
            <div>
                {paginate}
            </div>
        );
    }
}