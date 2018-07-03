import React, { Component } from 'react';

// Dependencies
import { Link } from 'react-router-dom';
import url   from 'url';

// Components
import Store from '../../stores/stores';

import './Search.scss';

class Search extends Component {

    constructor(props) {
        super(props);
        let state = '';

        if (this.props.history.location.search)
        {
            let param = new URLSearchParams(this.props.history.location.search);
            state  = param.get('search');
        }

        this.state = { value: state };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.history.location.pathname === '/') {
            Store.setCategory(null);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.history.push(`/items?search=${url.parse(this.state.value).path}`);
        Store.emit('search');
        Store.setCategory(null);
        event.preventDefault();
    }

    render () {
        return (
            <nav className="navbar">
                <div className="container">
                    <div className="nav-wrap">
                        <Link  to={`/`} className="navbar-brand"  title="Pagina principal de Mercadolibre"><span>Mercadolibre</span></Link>
                        <div className="search-holder">
                          <form className="search" onSubmit={this.handleSubmit}>
                              <input value={this.state.value} onChange={this.handleChange} className="nav-search-input" type="text" placeholder="Nunca dejes de buscar"/>
                              <button type="btn" title="Buscar articulo"></button>
                          </form>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Search;
