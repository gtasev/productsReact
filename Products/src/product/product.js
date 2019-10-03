import React from 'react';
import '../App.css';

function Product(props) {
    const [qty, setqty] = React.useState(0);

    function buy() {
        const value = qty  + 1;
        setqty(value);
        props.handleTotal('add',props.price)
    }

    function reduce() {
        if (qty > 0) {
            const value = qty - 1;
            setqty(value);
            props.handleTotal('reduce',props.price)
        }
    }

    function remove(id) {
        props.handleRemoveProduct(id, qty*props.price);
    }

    function resetQty() {
        props.handleTotal('reduce', qty*props.price);
        setqty(0);
    }

    return(
        <div className='productComponentWrapper'>
            <div className='person'>
                <p>{props.name} - {props.price}</p>
                <button onClick={buy}>+</button>
                <button onClick={reduce}>-</button>
                <a id='link' target="_blank" href={props.link}><button type='button'>Show</button></a>
                <h3>Qty: {qty} item(s)</h3>
                <hr/>
                {qty > 0 ? <div className='deleteProduct' >
                    <button type='button' onClick={() => resetQty(props.id)}>Clear quantity</button>
                </div> : null}
            </div>
            <div className='deleteProduct'>
                <button type='button' onClick={() => remove(props.id)}>Remove product</button>
            </div>
        </div>
    )
}

export default Product;
