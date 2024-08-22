const joi = require('joi');
const fs = require('fs');
const ApiError = require('../../../utils/error/genericError');
const signUpValidator = async(req,res,next)=>{
    try{
    const signUpSchema = joi.object({
        first_name:joi.string().required(),
        email:joi.string().email().required(),
        username:joi.string().required(),
        password:joi.string().required(),
        role_id:joi.number().required(),
    })
    await signUpSchema.validateAsync({
        first_name:req.body.first_name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
        role_id:req.body.role_id
    })
}catch(err)
{
    
    if(req.file) fs.unlinkSync(req.file.path)
    return res.status(400).json({
        message:err.message,
        success:false,
        data:{}
    })
}
    next();
}
const signInValidator = async(req,res,next)=>{
    try{
    const signUpSchema = joi.object({
        username:joi.string().required(),
        password:joi.string().required(),
    })
    await signUpSchema.validateAsync({
        username:req.body.username,
        password:req.body.password
    })
}catch(err)
{
    // throw new ApiError(err.message,400);
    return res.status(400).json({
        message:err.message,
        success:false,
        data:{}
    })
}
    next();
}
module.exports ={
    signUpValidator,
    signInValidator
}