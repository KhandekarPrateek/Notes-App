const User=require('../models/user')
const{ 
    UnauthenticatedError,
    BadRequestError} =require('../errors')


const register=async(req,res)=>{
    
    //create new user
    const user=await User.create({...req.body})
    //create jwt
    const token=user.createJwt() 
    res.status(201).json({user:{name:user.name},token})
    
}

const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new BadRequestError('please provide email and password')
    }
    const user=await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError(' user not exist')
    }
    //check passord
    const isPasswordCorrect=await user.checkPassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError(' incorrect passowrd')
    }
    const token=user.createJwt()
    res.status(200).json({user:{name:user.name,email:user.email},token})
}

module.exports={
    login,register
}