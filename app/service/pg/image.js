const Images = require('../../api/v1/images/model');
const db = require('../../db/config');
const { NotFoundError } = require('../../errors');

/**
 * 1. kita gunain cara ini
 * 2. generate url setalah submit baru kita simpen images
 * */

// * 2. generate url setalah submit baru kita simpen images
const generateUrlImage = async (req) => {
    const result = `uploads/${req.file.filename}`;

    return result;
};

// * 1. kita gunain cara ini
const createImages = async (req) => {
    console.log(req)
    if (!req.file){
        const result = await db.query(`INSERT INTO product_galleries(products_id, url) VALUES (1,'public/uploads/default.png')`);
    }else{
        const result = await db.query(`INSERT INTO product_galleries(products_id, url) VALUES (1, 'https://github.com/rahmatulfajri10/pg-tugasakhir/blob/main/${req.file.filename}')`);
    }
    // const result = await Images.create({
    //     name: req.file
    //     ? `uploads/${req.file.filename}`
    //     : 'uploads/default.jpeg',
    // });
    result=req.complete
    return result;
};

// tambahkan function checking Image
const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    console.log(result);

    if (!result) throw new NotFoundError(`Tidak ada Gambar dengan id :  ${id}`);

    return result;
};

// jangan lupa export checkingImage
module.exports = { createImages, checkingImage };