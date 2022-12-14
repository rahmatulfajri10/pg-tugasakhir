
const db = require('../../db/config');
// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllCategories = async () => {
    const result = await (await db.query(`SELECT * FROM product_categories`)).rows;

    return result;
};

const createCategories = async(req)=>{
    const name = req;
    // cari categories dengan field name
    const check = await (await db.query(`SELECT * FROM product_categories WHERE nama='${name}'`)).rowCount;
    console.log(check)
  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
    if (check!=0) throw new BadRequestError('kategori nama duplikat');

    const result = await (await db.query(`INSERT INTO product_categories(nama) VALUES ('${name}')`)).command;
    
    return result;
}

const getOneCategories = async (req) => {
    const { id } = req.params;

    const result = await (await db.query(`SELECT * FROM product_categories WHERE id='${id}'`));
    if (result.rowCount==0) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

    return result.rows;
};

const updateCategories = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
    const check1 = await (await db.query(`SELECT * FROM product_categories WHERE id='${id}'`));
    if (check1.rowCount==0) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);
    // cari categories dengan field name dan id selain dari yang dikirim dari params
    

    const check = await (await db.query(`SELECT * FROM product_categories WHERE nama='${name}'`));

    // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
    if (check.rowCount>0) throw new BadRequestError('kategori nama duplikat');

    const result = await (await db.query(`UPDATE product_categories SET nama='${name}' WHERE id='${id}'`)).rowCount;
    console.log(result)

    return result;
};

const deleteCategories = async (req) => {
    const { id } = req.params;

    // const result = await Categories.findOne({
    //     _id: id,
    //     organizer: req.user.organizer,
    // });

    const check = await (await db.query(`SELECT * FROM product_categories WHERE id='${id}'`));
    if (check.rowCount==0) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);


    const result = await (await db.query(`DELETE FROM product_categories WHERE id='${id}'`)).command;
    
    

    return result;
};

module.exports = {
    getAllCategories,
    createCategories,
    getOneCategories,
    updateCategories,
    deleteCategories,
    // <-- export function checking categories
};