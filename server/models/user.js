const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv').config()
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide name'],
        minlength:1

    },
    email:{
        type:String,
        required:[true,'Please Provide email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please Provide password'],
        minlength:1
    },
})
//encrypting the passowrd
//the pre-save modifies the document just before saving like here we are saving encyprted password
UserSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})
//generating our jwt
UserSchema.methods.createJwt=function(){
  return  jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'30d'})
}
//check passoword
UserSchema.methods.checkPassword=async function(inputPassword){
    const isMatch=await bcrypt.compare(inputPassword,this.password)
    return isMatch
}
module.exports=mongoose.model('User',UserSchema)