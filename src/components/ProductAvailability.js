import React from 'react';
import StoreInfo from '../components/StoreInfo';

const token = "access_key=MDowNGNhZjc4MC1kMGQ1LTExZTgtODg1MS0xM2M3NjAzM2Q0NmQ6UVFydTE3ZVpPMzRzQ0FzWnFhUjVrODBMMFZTWmEyZkdBalNp";
class ProductAvailability extends React.Component {

  state = {
    storeData: [],
    inventoryData: []
  }
  componentDidMount() {
    fetch(`https://lcboapi.com/inventories?product_id=${this.props.selectedBeer}&per_page=15&${token}`)
    .then((results) => {
      return results.json();
    })
    .then((data) => {      
      return  data.result.map((store) => {
        return store.store_id
      })
    })  
    .then((results) => {      
      Promise.all(results
        .map((storeId) => {
          return fetch(`https://lcboapi.com/stores/${storeId}?${token}`)
          .then((res) => {
            return res.json();
          })
        })
      )
      .then((data) => {
          const storeArr = [];
          data.forEach(store => {
            storeArr.push(store.result)
          });
          this.setState(() => {
            return {
              storeData: storeArr
            }
          })
          return storeArr;          
        })
      .then((stores) => {
        Promise.all(stores.map((store) => {
          return fetch(`http://lcboapi.com/stores/${store.id}/products/${this.props.selectedBeer}/inventory?${token}`)
          .then((res) => {
            return res.json();            
          })
        }))
        .then((inventoryData) => {
          const inventoryArr = [];
          inventoryData.forEach(item => {
            inventoryArr.push(item.result);
          });
          this.setState(() => {
            return {
              inventoryData: inventoryArr
            }            
          })
        })
      })
    })
}
     
  render() {
    // I don't know if I've done this right. Spent quite a bit of time trying to figure out the best way to get available stock for each store before using map to reutrn <StoreInfo />
    const mergedState = this.state.storeData.map( (store, i) => {
      return Object.assign( {}, store, this.state.inventoryData[i] ); 
    });

    return (
      
      <div className="storeInfo">
        <div>
          <p className="storeInfo_beer-name">{this.props.beerName} is available at the following LCBO locations:</p>
          <table>
            <tbody>
            <tr>
              <td className="storeInfo__storeDetails"><strong>Store Location</strong></td>
              <td className="storeInfo__storeDetails"><strong>Qty Available</strong></td>
            </tr>
              {
                mergedState.map((store) => {
                  return <StoreInfo key={store.id} storeDetails={store} />
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ProductAvailability;
