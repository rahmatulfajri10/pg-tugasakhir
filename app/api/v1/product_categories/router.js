const express = require('express')
const router = express.Router()
const { create, index, find, update, destroy} = require('./controller');
const { urlValidation } = require('./validators');

router.get('/categories', index)
router.get('/categories/:id', find);
router.route('/categories').post(urlValidation.insertUrl, create)
router.put('/categories/:id', update);
router.delete('/categories/:id', destroy);

module.exports = router