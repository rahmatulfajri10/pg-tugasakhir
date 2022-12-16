const db = require('../../db/config');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcryptjs');
require("dotenv").config();
SECRET = process.env.SECRET
// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require('../../errors');

const registerUser = async(req)=>{
     // Get user input
    const { username, email, password} = req.body;
    
     // Validate user input
    if (!(email && password && username)) {
        throw new BadRequestError('Semua Field Harus Diisi');
    }

     // check if user already exist
     // Validate if user exist in our database
    const data = await db.query(`SELECT * FROM users WHERE username = $1`, [username])

    if (!(data.rowCount == 0)) {
        throw new BadRequestError('User Sudah Ada!');
    }

     //Encrypt user password
     // * 7. silahkan ubah password yang telah diterima menjadi dalam bentuk hashing
    const hashPassword = await bcrypt.hash(password, 10);


     // Create user in our database
     // 8. Silahkan coding agar pengguna bisa menyimpan semua data yang diinputkan ke dalam database
    const result = (await db.query(`INSERT INTO users VALUES (DEFAULT, $1, $2, $3)`, [username, email.toLowerCase(), hashPassword])).command;
    return result;
}

const loginUser = async (req) => {
     // 9. komparasi antara password yang diinput oleh pengguna dan password yang ada didatabase
    // const {email, password } = req.body;
    // if (!(email && password)) {
    //     throw new BadRequestError('Tidak ada inputan kosong!');
    // }
    // const data = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
    // if (data.rowCount == 0 ){
    //     throw new BadRequestError('User doesnt exist');
    // }else{
    //     if (bcrypt.compareSync(password, data.rows[0].password)){
            
    //          // 10. Generate token menggunakan jwt sign
    //         const token = jwt.sign(
    //             { id: data.rows[0].id,
    //                 username: data.rows[0].username,
    //                 email:data.rows[0].email,
    //                 password:data.rows[0].password },
    //             process.env.SECRET,
    //             {
    //                 expiresIn: "2h",
    //             }
    //         );
    //         //11. kembalikan nilai id, email, dan username
    //         return res.cookie("JWT", token, {httpOnly: true,sameSite: "strict"}).status(200).json({
    //             id: data.rows[0].id,
    //             username: data.rows[0].username,
    //             email:data.rows[0].email,
    //             token: token,
    //             message: "You are login"
                
    //         });
    //     }else{
    //         return res.status(401).json({ message: "Invalid Credentials" });
    //     }
    // }
};

const logoutUser = async (req) => {
    // try {
    //     // 14. code untuk menghilangkan token dari cookies dan mengembalikan pesan "sudah keluar dari aplikasi" 
    //     // return res.clearCookie("JWT").status(200).send("You are has been logout");
    // } catch (err) {
    //     return res.status(500).send(err)
    // }
};

const verifyUser = async (req) => {
    const data= req.data
    return data;
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser    
};