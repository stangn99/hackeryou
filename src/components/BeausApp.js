import React from 'react';
import { connect } from 'react-redux';
import { addAllProducts } from '../actions/beerActions';
import Modal from 'react-modal';
import Product from '../components/Product';
import OptionModal from '../components/OptionModal';
import Top from '../components/Top';
import Hero from '../components/Hero';

const token = "?q=beaus&where=is_seasonal&per_page=25&access_key=MDowNGNhZjc4MC1kMGQ1LTExZTgtODg1MS0xM2M3NjAzM2Q0NmQ6UVFydTE3ZVpPMzRzQ0FzWnFhUjVrODBMMFZTWmEyZkdBalNp";
class BeausApp extends React.Component {
  state = {
    showModal: false,
    selectedBeerId: undefined
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleSelectedBeer = (id) => {
    this.setState({selectedBeerId: id})
  }

  componentDidMount() {
    fetch(`https://lcboapi.com/products${token}&where=is_seasonal&where_not=is_dead`)
    .then((results) => {
      return results.json();
    })
    .then((data) => {      
      let seasonalBeers = data.result.map((beer) => {
        return beer
      })
      this.props.dispatch(addAllProducts(seasonalBeers))
    })
  }

  componentWillMount() {
    Modal.setAppElement("body")
  }

  render() {
    return (
      <div>
        <Top />
        <Hero />
        <div className="product">
          {this.props.beers.map((beer) => (
              <Product key={beer.id} beer={beer} handleOpenModal={this.handleOpenModal} handleSelectedBeer={this.handleSelectedBeer} />            
            ))
          }
          <OptionModal isOpen={this.state.showModal} handleCloseModal={this.handleCloseModal}  selectedBeer={this.state.selectedBeerId} />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({beers: state})
const connectedBeausApp = connect(mapStateToProps)(BeausApp);

export default connectedBeausApp;