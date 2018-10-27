import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import AppRouter from './router/router';

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)


export default jsx;