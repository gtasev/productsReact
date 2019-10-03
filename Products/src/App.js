import React from 'react';
import './App.css';

function Product() {
  const [qty, setqty] = React.useState(5);

  function buy() {
    const value = qty  +1
    setqty(value);
  }

  return(
      <div className='person'>
        <p>Android - $199</p>
        <button onClick={buy}>Buy</button>
        <h3>Qty: {qty} item(s)</h3>
      </div>
  )
}

export default Product;
