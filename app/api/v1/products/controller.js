const Categories = require('./model');
const { getAllProducts, createProducts, getOneProducts, updateProducts, deleteProducts } = require('../../../service/pg/products');
const db = require('../../../db/config');


const index = async (req, res, next) =>{
    try{
        const result = await getAllProducts();
        res.status(200).json({
            data: result
        })
    }catch(err){
        next(err)
    }
}

const create = async (req, res, next) =>{
    try{
        
        const result = await createProducts(req);
        res.status(200).json({
            data: result,
        })

    }catch(err){
        next(err)
    }
}

const find = async (req, res, next) =>{
    try{
        const result= await getOneProducts(req)  
        
        res.status(200).json({ 
            data: result
        })
    }catch(err){
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        
        const result = await updateProducts(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteProducts(req);
        res.status(StatusCodes.OK).json({
        data: result,
        });
    } catch (err) {
        next(err);    
    }
}

module.exports = {
    index,
    create,
    find,
    update,
    destroy
}