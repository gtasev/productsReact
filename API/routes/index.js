var express = require('express');
var router = express.Router();

let products = [
    {id: randomId(), name :'Android', price: 121, src: 'bbb'},
    {id: randomId(), name :'iPhone', price: 123, src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone8-plus-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795417455'},
    {id: randomId(), name :'Nokia', price: 65, src: 'aaa'}
];

router.get('/', async function (req, res) {
    setTimeout(() => {
        res.status(200).json({success: true, products: products });
        console.log('de da go vidam')
    }, 2500);
});

router.post('/addNew', function (req, res) {
    products.push({id: randomId(), name: req.body.name, price: parseInt(req.body.price)});
    res.status(200).json({success: true, products: products });
});

router.delete('/removeProduct', function (req, res) {
    const id = req.body.productId;
    products.splice(products.findIndex(ele => ele.id === id), 1);
    returnResponse(res);
});

function returnResponse (res) {
    setTimeout(() => {
        res.status(200).json({success: true});
    }, 1500);
}

function randomId() {
    return Math.floor(Math.random() * 1000000);
}
module.exports = router;
