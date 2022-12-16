const express = require('express')
const router = express.Router()
const { create, index, find, update, destroy} = require('./controller');

router.get('/products', index)
router.get('/products/:id', find);
router.route('/products').post(create)
router.put('/products/:id', update);
router.delete('/products/:id', destroy);

module.exports = router