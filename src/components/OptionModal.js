import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import ProductAvailability from '../components/ProductAvailability';


const OptionModal = (props) => {
  const beerDetails = props.beers ? props.beers : '';
  return (
    <Modal 
        isOpen={props.isOpen}
        onRequestClose={props.handleCloseModal}
        contentLabel="Beau's Modal"
        className="modal"
    >
      <div className="detailsWrapper__image">
        <h3 className="detailsWrapper__beer-name">{beerDetails.name}</h3>
        <img src={beerDetails.image_url} alt={beerDetails.name} width={300} />
        { beerDetails.tasting_note ? (<p className="detailsWrapper__beer-taste"><strong>Tasting Notes:</strong> <br />{beerDetails.tasting_note}</p>) : ""}
      </div>
      <ProductAvailability selectedBeer={props.selectedBeer} beerName={beerDetails.name} />
    </Modal>
  )
}

const mapStateToProps = (state, props) => ({  
  beers: state.find((item) => {
    return item.id === props.selectedBeer
  })
})
export default connect(mapStateToProps)(OptionModal);


