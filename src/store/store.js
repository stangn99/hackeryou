import { createStore } from 'redux';
import beerReducer from '../reducers/beerReducer';



const store = createStore(beerReducer);

export default store;

