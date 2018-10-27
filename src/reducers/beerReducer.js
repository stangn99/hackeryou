
const beerReducerDefaultState = [];
const beerReducer = (state = beerReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ITEMS':
      return action.beers;
    default:
      return state;
  }
}

export default beerReducer;