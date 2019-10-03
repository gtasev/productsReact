var express = require('express');
var router = express.Router();

let products = [
    {id: uniqueId(), name :'Android', price: 121, src: 'bbb'},
    {id: uniqueId(), name :'iPhone', price: 123, src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone8-plus-gold-select-2018?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1550795417455'},
    {id: uniqueId(), name :'Nokia', price: 65, src: 'aaa'}
];

/* GET home page. */
router.get('/', async function (req, res) {
    setTimeout(() => {
        res.status(200).json({success: true, products: products });
        console.log('de da go vidam')
    }, 5000);
});

router.post('/addNew', function (req, res) {
    products.push({id: uniqueId(), name: req.body.name, price: parseInt(req.body.price)});
    res.status(200).json({success: true, products: products });
});

function randomId() {
    return Math.floor(Math.random() * 1000000);
}

var _uid = 0;

function uniqueId() {
    _uid++;
    return _uid;
}
module.exports = router;
