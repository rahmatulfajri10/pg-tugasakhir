const { loginUser, logoutUser, registerUser, verifyUser } = require('../../../service/pg/user');
const db = require('../../../db/config');


const login = async (req, res, next) =>{
    const {email, password } = req.body;
    if (!(email && password)) {
        throw new BadRequestError('Tidak ada inputan kosong!');
    }
    const data = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
    if (data.rowCount == 0 ){
        throw new BadRequestError('User doesnt exist');
    }else{
        if (bcrypt.compareSync(password, data.rows[0].password)){
            
             // 10. Generate token menggunakan jwt sign
            const token = jwt.sign(
                { id: data.rows[0].id,
                    username: data.rows[0].username,
                    email:data.rows[0].email,
                    password:data.rows[0].password },
                process.env.SECRET,
                {
                    expiresIn: "2h",
                }
            );
            //11. kembalikan nilai id, email, dan username
            return res.cookie("JWT", token, {httpOnly: true,sameSite: "strict"}).status(200).json({
                id: data.rows[0].id,
                username: data.rows[0].username,
                email:data.rows[0].email,
                token: token,
                message: "You are login"
                
            });
        }else{
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    }
}

const logout = async (req, res, next) =>{
    try{
        
        return res.clearCookie("JWT").status(200).send("You are has been logout")

    }catch(err){
        next(err)
    }
}

const register = async (req, res, next) =>{
    try{
        const result= await registerUser(req)  
        
        res.status(200).json({ 
            data: result
        })
    }catch(err){
        next(err)
    }
}

const verify = async (req, res, next) => {
    try {
        
        const result = await verifyUser(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};



module.exports = {
    login,
    logout,
    register,
    verify
}