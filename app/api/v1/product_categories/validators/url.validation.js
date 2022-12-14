const { param, body } = require('express-validator');
const { validator } = require('./validator');


const insertUrl =  [
    body('name').notEmpty(),
    
    validator
]

module.exports = {
    
    insertUrl,
}
