import React, {useState, useEffect} from 'react';
import '../App.css';
import Product from '../product/product';
import ProductForm from '../productForm/productForm';
import Total from '../total/total';
// import CircularIndeterminate from '../spinner/spinner';
import axios from 'axios';


export const ProductList = () => {
    const [total, setTotal] = React.useState(0);
    const [productList, setProductList] = React.useState([]);
    const [spinner, setSpinnerValue] = React.useState(true);
    const [newProductForm, setNewProdForm] = React.useState({name: '', price: ''});

    const onMount = async () => {
        const result = await axios.get('http://localhost:3001/');
        const productList = result.data.products;
        setProductList(productList);
        setSpinnerValue(false);
    };

    useEffect( ()=>{
        onMount()
    },[]);

    var products = productList.map(product => {
        return <Product key={product.id} id={product.id} name={product.name} price = {product.price} link = {product.src} handleShow={showProduct} handleTotal={calculateTotal} handleRemoveProduct={removeProduct}/>
    });

    function randomId() {
        return Math.floor(Math.random() * 1000000);
    }

    function calculateTotal(action,price) {
        let value;
        if (action === 'add') {
             value = total + price;
        }else if (action === 'reduce') {
            value = total - price;
        }
        setTotal(value)
    }

    function showProduct(name) {
        alert('You  selected ' + name);
    }

    function addNewProduct() {
        const newList = productList.slice();
        newList.push({id: randomId(), name: newProductForm.name, price: parseInt(newProductForm.price)});
        setProductList(newList);
        setNewProdForm({name: '', price: 0});
    }

    function removeProduct(id, productsAmount) {
        let newList = productList.slice();
        newList.splice(productList.findIndex(ele => ele.id === id), 1);
        calculateTotal('reduce', productsAmount);
        setProductList(newList);
    }

    function editFormName(name) {
        let editedProductForm = Object.assign({}, newProductForm);
        editedProductForm.name = name;
        setNewProdForm (editedProductForm);
    }

    function editFormPrice(price) {
        let editedProductForm = Object.assign({}, newProductForm);
        editedProductForm.price = parseInt(price);
        setNewProdForm (editedProductForm);
    }

    return(
         spinner ?
            <div className='centerSpinner'>

            </div>
            :
            <div className='noClassName'>
                <div className='newProdForm'>
                    <ProductForm name={newProductForm.name} price={newProductForm.price} handleName={editFormName} handlePrice={editFormPrice} handleSubmit={addNewProduct}/>
                </div>
                <div className='productsClass'>
                    {products}
                </div>
                <Total total={total}/>
            </div>
    )
};
