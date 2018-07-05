import React from 'react';
import { Link } from 'react-router-dom';
import './Post.scss';

const Post = (props) => (

        <section className="row item-wrapper" onClick={props.clicked}>
            <div>
                <div className="image-content">
                    <img src={props.post.picture} width="180" height="180" alt={props.post.title}/>
                </div>
            </div>

            <div className="col-12 col-sm-7 col-md-7 info-container">
                <span className="price" title="precio">{ props.post.price.currency  } {props.post.price.amount} <span className="price-decimals"> {(props.post.price.decimals !== 0) ? props.post.price.decimals : null}</span></span>
                { props.post.free_shipping ? <span className="free-shipping" title="Envio Gratis"></span> : null }

                <span className="main-title">
                    <Link to={`/items/${props.post.id}`} style={{ textDecoration: 'none' }} >{props.post.title}</Link>
                </span>
            </div>

            <div className="d-none d-sm-block col-sm-2 col-md-2 right-content">
                <span>{props.post.seller_state}</span>
            </div>
        </section>

);

export default Post;
