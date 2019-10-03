import React , {createRef } from 'react';
import '../App.css';

function ProdForm(props) {

    function submit(event) {
        event.preventDefault();
        props.handleSubmit();
    }

    function updateNameFormValue(event) {
        event.preventDefault();
        props.handleName(event.target.value);
    }

    function updatePriceFormValue(event) {
        event.preventDefault();
        props.handlePrice(event.target.value);
    }

    return (
        <div className='addNewProduct'>
            <div>
                <h3>Add new product</h3>
            </div>
            <form onSubmit={submit}>
                <input type="text" placeholder='Product Name' value={props.name} onChange={(event) => updateNameFormValue(event)}/>-
                <input type="number" placeholder='Product Price' value={props.price} onChange={(event) =>  updatePriceFormValue(event)}/>
                <br/>
                <br/>
                <button type='submit'>Create Product</button>
                <hr/>
            </form>
        </div>
    )

}

export default ProdForm;
