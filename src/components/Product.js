import React from 'react';

export default (props) => (
    <div>
      <div className="product__image-wrapper">
        {props.beer.image_thumb_url ? <img src={props.beer.image_thumb_url} alt={props.beer.name} className="product__image" /> : <img src="./images/thumb-img-missing.jpg" alt={props.beer.name} className="product__image" />}
      </div>
      <div className="product__info-wrapper">
        <div className="product__details product__details__name">{props.beer.name}</div>
        <div className="product__details">Alcohol Content: {props.beer.alcohol_content}ml</div>
        <div className="product__details"><strong>Price</strong>: ${props.beer.price_in_cents / 100}</div>
        <button onClick={(e) => {
            props.handleSelectedBeer(props.beer.id);
            props.handleOpenModal();
            }}> details</button>
      </div>
    </div>
  )