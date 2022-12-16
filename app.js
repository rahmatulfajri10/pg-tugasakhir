const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();

//router
const categoriesRouter = require('./app/api/v1/product_categories/router')
const imagesRouter = require('./app/api/v1/images/router');
const productsRouter = require('./app/api/v1/products/router');
const usersRouter = require('./app/api/v1/users/router');
const v1 = '/api/v1/cms'

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to api Merch'
    })
});

app.use(v1, categoriesRouter)
app.use(`${v1}`, imagesRouter);
app.use(v1, productsRouter)
app.use(v1, usersRouter)

// middlewares
app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
