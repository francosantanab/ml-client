import React, { Component } from 'react';
import axios from 'axios';

// Styles
import './FullProduct.scss';

//Components
import Path from '../Path/Path';
import Store from '../../stores/stores';
import utils from '../../utils/utils';

class FullProduct extends Component {
    state = {
        loadedItem: null
    }


    componentDidMount()
    {
        this.search();
    }

    componentWillUnmount() {
        Store.removeAllListeners();
    }

    search() {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedItem || (this.state.loadedItem && this.state.loadedItem.item.id !== this.props.match.params.id) ) {
                axios.get( `${utils.getUrlApi() + this.props.match.params.id}` )
                    .then( response => {
                        this.setState( { loadedItem: response.data } );
                        document.title = response.data.item.title;
                    }).catch(error => {

                    });
            }
        }
    }

    render () {

        let product = <p style={{ textAlign: 'center', color: '#999999', padding: '20px' }}>Cargando ...</p>;

        if ( this.state.loadedItem )
        {
            let state = null;

            if (this.state.loadedItem.item.condition === 'new') {
                state = 'Nuevo';
            }else {
                state = 'Usado';
            }

            product = (
                <div className="container">
                    <article className="FullProduct">
                        <div className="row product-wrap">
                            <div className="col-12 col-sm-9 product-image">
                                <img src={this.state.loadedItem.item.picture} alt={this.state.loadedItem.item.title} id="img-picture"/>
                            </div>
                            <div className="col-12 col-sm-3 product-resume">
                                <span className="item-condition">{ state } - { this.state.loadedItem.item.sold_quantity } vendidos</span>
                                <h1>{this.state.loadedItem.item.title}</h1>
                                <span className="product-price">{this.state.loadedItem.item.price.currency} {this.state.loadedItem.item.price.amount}</span>
                                <button className="buy-now">Comprar</button>
                            </div>
                        </div>

                        <div className="row product-description">
                            <div className="col-12 col-sm-8 ">
                                <h2>Descripción del producto</h2>
                                <p>{this.state.loadedItem.item.description}</p>
                            </div>
                        </div>
                    </article>
                </div>
            );
        }
        return (
            <div className="container">
                <Path />
                {product}
            </div>
        );
    }
}

export default FullProduct;
