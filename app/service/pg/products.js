const db = require('../../db/config');
// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllProducts = async () => {
    const result = await (await db.query(`SELECT products.id,
	products.name,
	products.price,
	products.description,
	product_galleries.url
FROM
	products LEFT JOIN product_galleries ON products.categories_id = product_galleries.id`)).rows;

    return result;
};

const createProducts = async(req)=>{
    const {name,price,description,categories_id} = req.body;
    

    // cari Product dengan field name
    const check = await (await db.query(`SELECT * FROM products WHERE name='${name}'`)).rowCount;
    
  // apa bila check true / data Products sudah ada maka kita tampilkan error bad request dengan message kategori name duplikat
    if (check!=0) throw new BadRequestError('Product name duplikat');

    const result = await (await db.query(`INSERT INTO products(name,price,description,categories_id) VALUES ('${name}','${price}','${description}','${categories_id}')`)).command;
    
    return result;
}

const getOneProducts = async (req) => {
    const { id } = req.params;

    const result = await (await db.query(`SELECT * FROM product_categories WHERE id='${id}'`));
    if (result.rowCount==0) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

    return result.rows;
};

const updateProducts = async (req) => {
    const { id } = req.params;
    const { name } = req.body;

    // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
    const check1 = await (await db.query(`SELECT * FROM product_categories WHERE id='${id}'`));
    if (check1.rowCount==0) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);
    // cari Product dengan field name dan id selain dari yang dikirim dari params
    

    const check = await (await db.query(`SELECT * FROM product_categories WHERE name='${name}'`));

    // apa bila check true / data Product sudah ada maka kita tampilkan error bad request dengan message kategori name duplikat
    if (check.rowCount>0) throw new BadRequestError('kategori name duplikat');

    const result = await (await db.query(`UPDATE product_categories SET name='${name}' WHERE id='${id}'`)).rowCount;
    console.log(result)

    return result;
};

const deleteProducts = async (req) => {
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
    getAllProducts,
    createProducts,
    getOneProducts,
    updateProducts,
    deleteProducts,
    // <-- export function checking categories
};