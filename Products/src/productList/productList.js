import React, {useState, useEffect} from 'react';
import '../App.css';
import Product from '../product/product';
import ProductForm from '../productForm/productForm';
import Total from '../total/total';
import CircularIndeterminate from '../spinner/spinner';
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
        return <Product key={product.id} id={product.id} name={product.name} price = {product.price} link = {product.src} handleTotal={calculateTotal} handleRemoveProduct={removeProduct}/>
    });

    function calculateTotal(action,price) {
        let value;
        if (action === 'add') {
             value = total + price;
        }else if (action === 'reduce') {
            value = total - price;
        }
        setTotal(value)
    }

    async function addNewProduct() {
        const addNewProd = await axios.post('http://localhost:3001/addNew', {
            name: newProductForm.name, price: parseInt(newProductForm.price)
        });




        const newList = productList.slice();
        newList.push({name: newProductForm.name, price: parseInt(newProductForm.price)});
        setProductList(newList);
        setNewProdForm({name: '', price: 0});
    }

    async function removeProduct(id, productsAmount) {
        setSpinnerValue(true);
        const deleteProd = await axios.delete(
            'http://localhost:3001/removeProduct',
            {headers: {},
                data:{
                    productId: id
                }}
        );
        if (deleteProd.status === 200) {
            calculateTotal('reduce', productsAmount);
            onMount();
        }
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
                <CircularIndeterminate />
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
