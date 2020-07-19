import jwt from 'jsonwebtoken';
const config = require('config');

export const getToken = (user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin

    },config.get("jwtSecret"),{
        expiresIn:'48h'
    })

}

export const isAuth =(req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7,token.length);
        jwt.verify(onlyToken,config.get("jwtSecret"),(err,decode)=>{
            req.user=decode;
            next();
            return;
        })
    }else{
        return res.status(401).send({msg:"Token is not supplied"});
    }
}

export const isAdmin =(req,res,next)=>{
    console.log(req.user);
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({msg:'Admin token is invalid'})
}