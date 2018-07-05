import React, { Component } from 'react';

// Dependencies
import axios from 'axios';
import URLSearchParams  from 'url-search-params';

// Components
import Store from '../../stores/stores';
import Post from '../Post/Post.js';
import Path from '../Path/Path';
import utils from '../../utils/utils';

class Grid extends Component {

    componentDidMount()
    {
        Store.on('search',  () => {
            this.search(true);
        });

        if (this.props.history.location.search)
        {
            this.search();
        }
    }

    componentWillUnmount() {
        Store.removeAllListeners();
    }

    state = {
        posts: [],
        categories: null
    }

    search(search) {
        let params = new URLSearchParams(this.props.history.location.search);
        let param = params.get('search');

        if ((this.state.posts.length === 0) || search)
        {
            axios.get(`${utils.getUrlApi()}?q=${param}`).then(resp => {
                this.setState({ posts: resp.data.items, error: false, categories: resp.data.categories });
                Store.setCategory(resp.data.categories);
            }).catch(err => {
                this.setState({ posts: [], error: true });
            });
        }
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Cargando ...</p>;

        if (!this.state.error)
        {
            posts = this.state.posts.map(post => {
                  return <Post key={post.id} post={post} />;
            });
        }
        return (
            <div className="container">
                <Path categories={this.state.categories} />
                {posts}
            </div>
        )
    }
}


export default Grid;
