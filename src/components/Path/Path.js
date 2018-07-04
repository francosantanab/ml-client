import React, { Component } from 'react';
import _ from 'lodash'
import Store from '../../stores/stores';
import BreadcrumbItem from '../BreadcrumbItem/BreadcrumbItem';

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
        let path = [];
        if (this.state.categories)
        {
            _.each(this.state.categories, (cat, index) => {
                let span = document.createElement('span');
                if (index === 0)
                {
                    span.innerHTML = cat;
                }else
                {
                    span.innerHTML = ` >  ${cat}`;
                }
                path.push(span);
            });
        }

        let paths = path.map((span, index )=> {
            return <BreadcrumbItem  key={index} bread={span}/>;
        })

        return (
            <section className="path">
            {paths}
            </section>
        )
    }
}

export default Path;