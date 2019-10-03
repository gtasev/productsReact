import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Product from './App';
import ProductList from './productList/productList';

it('renders without crashing', () => {
  // var app = (
  //     <div>
  //       <Person name='Max' age='28' />
  //       <Person name='Manu' age='29' />
  //     </div>
  // );

  const div = document.createElement('div');
  // ReactDOM.render(app, document.querySelector('#app'));
  ReactDOM.render(<Product />, div);
});



