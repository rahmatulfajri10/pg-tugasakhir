const Categories = require('./model');
const { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories } = require('../../../service/pg/categories');
const db = require('../../../db/config');


const index = async (req, res, next) =>{
    try{
        const result = await getAllCategories();
        res.status(200).json({
            data: result
        })
    }catch(err){
        next(err)
    }
}

const create = async (req, res, next) =>{
    try{
        const {name} = req.body
        const result = await createCategories(name);
        res.status(200).json({
            data: result,
        })

    }catch(err){
        next(err)
    }
}

const find = async (req, res, next) =>{
    try{
        const result= await getOneCategories(req)  
        
        res.status(200).json({ 
            data: result
        })
    }catch(err){
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        
        const result = await updateCategories(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteCategories(req);
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