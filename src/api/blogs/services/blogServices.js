const response = require("../../../utils/response/genericResponse");
const errorResponse = require("../../../utils/response/errorResponse");
const Blog = require("../models/Blog.model");
const fs = require('fs')
const blogCreate = async (req) => {
  try {
    //needs bvalidator

    const { blog_title, blog_detail, blog_image } = req.body;
    await Blog.create({
      blog_title,
      blog_detail,
      blog_image: req.file
        ? `${process.env.UPLOAD_FILE_URL}/${req.file.destination}${
            req.file.filename
          }`
        : null,
    });
    // needs constants
    return response("Blog created successfully");
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    return errorResponse();
  }
};
const blogUpdate =async(req)=>{
  try {
    //needs bvalidator

    const { blog_title, blog_detail } = req.body;
    const blog =await Blog.findByPk(req.params.id);
    if(req.file)
    {
      try{
        fs.unlinkSync(
          blog.blog_image
            .split(process.env.UPLOAD_FILE_URL + "/")[1]
            .replaceAll("/", "\\")
        );
      }catch(err){
        console.log("Error on deleting old file",err)
      };
}
    await blog.update({
      blog_title,
      blog_detail,
      blog_image: req.file
        ? `${process.env.UPLOAD_FILE_URL}/${req.file.destination}${
            req.file.filename
          }`
        : blog.blog_image,
    });
    // needs constants
    return response("Blog updated successfully");
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    return errorResponse();
  }
}
const blogDelete =async(req)=>{
  try {
    //needs bvalidator

    const { blog_title, blog_detail, blog_image } = req.body;
    const blog =await Blog.findByPk(req.params.id);
    if(!blog)
    {
      return errorResponse("blog not found",{},false,400);
    }
    if(blog.blog_image)
    {
    fs.unlinkSync(
      blog.blog_image
        .split(process.env.UPLOAD_FILE_URL + "/")[1]
        .replaceAll("/", "\\")
    );}
    await blog.destroy();
    // needs constants
    return response("Blog deleted successfully");
  } catch (err) {
    return errorResponse();
  }
}
const getBlogDetail=async(req)=>{
  try {
    //needs bvalidator

    const blog =await Blog.findByPk(req.params.id);
    if(!blog)
    {
      return errorResponse("blog not found",{},false,400);
    }
    // needs constants
    return response("Blog fetched successfully",blog);
  } catch (err) {
    return errorResponse();
  }
}
const getAllBlogs =async(req)=>{
  try {
    //needs bvalidator

    const blog =await Blog.findAll();
    // needs constants
    return response("Blog fetched successfully",blog);
  } catch (err) {
    return errorResponse();
  }
}

module.exports={
  blogCreate,
  blogUpdate,
  blogDelete,
  getBlogDetail,
  getAllBlogs
}