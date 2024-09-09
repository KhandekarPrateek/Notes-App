const jwt=require('jsonwebtoken')
// const User=require('../models/User')
const { UnauthenticatedError} =require('../errors')
require('dotenv')
const authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        //the keyword bearer means start of auth token
        throw new UnauthenticatedError('no token')
    }
    //get the token from the entire auth header
    //header format Authorization:Bearer token
    const token=authHeader.split(' ')[1]
    try {
        //decode the user data from the jwt token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        //put the data in req.user for next process mailny like login etc
        req.user={userId:decoded.userId,name:decoded.name}//thisname and userId is the format in which we created jwt in the original user model
       //req.user means setting a new property on the req 
        next()
    } catch (error) {
        // console.log('Invalid token');
        return res.status(401).json({ message: 'Token is not valid' });
    }
}
module.exports=authMiddleware