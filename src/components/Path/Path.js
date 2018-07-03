import React, { Component } from 'react';
import _ from 'lodash'
import Store from '../../stores/stores';

// Styles
import './Path.scss';


class Path extends Component {
    constructor() {
        super();
        this.state = {
            categories: Store.getAll()
        };
    }

    componentDidMount() {
        Store.on('change', () => {
            this.setState({
                categories: Store.getAll()
            })
        });
    }

    componentWillUnmount() {
        Store.removeAllListeners();
    }
    

    render() {
        let path = '';
        if (this.state.categories)
        {
            _.each(this.state.categories, (cat, index) => {
                if (index === 0)
                {
                    path = cat;
                }else
                {
                    path = path + '>' + cat;
                }
            });
        }

        return (
            <section className="path">
                <span>{path}</span>
            </section>
        )
    }
}

export default Path;