const messages = require('../../../utils/constants/messages');
const errorResponse = require('../../../utils/response/errorResponse');
const Menu = require('../models/menuModel');
const MenuCategory =require('../models/menuCategoryModel');
const response = require('../../../utils/response/genericResponse');
const menuUpdate = async(req)=>{
    try{
        const menu =await Menu.findByPk(req.params.id);
        if(!menu)
        {
            return errorResponse("Menu not found",{},false,400);
        }
        await menu.update({
            menu_title:req.body.menu_title
        })
        return response("menu updated successfully",menu);
    }catch(err)
    {
        return errorResponse();
    }
}
const menuCategoryUpdate =async(req)=>{
    try{

        const menu =await Menu.findByPk(req.body.menu_id);
        if(!menu)
        {
            return errorResponse("Menu not found",{},false,400);
        }
        await menu.update({
            menu_title:req.body.menu_title
        })
        let categoriesExist = await MenuCategory.findAll({
            attributes:['category_id'],
            where:{
                menu_id:req.body.menu_id,
                category_id:req.body.category_id
            }
        })
        categoriesExist =categoriesExist.map(element=> element.category_id);
        const newCategories = req.body.category_id.filter((element)=>{
            if(!categoriesExist.includes(element))
            {
                return element;
            }
        });
        
        const menuCategories = newCategories.map((element)=>{
            return{
                menu_id:req.body.menu_id,
                category_id:element
            }
        });
        await MenuCategory.bulkCreate(menuCategories);
        return response("categories added in menu successfully");
    }catch(err)
    {
        return errorResponse();
    }
}
const menuDelete =async(req)=>{
    try{
        await MenuCategory.destroy({where:{
            menu_id:req.params.id
        }});
        const menu =await Menu.findByPk(req.params.id);
        if(!menu)
        {
            return errorResponse("Menu not found",{},false,400);
        }
        await menu.destroy()
        return response("menu deleted successfully",menu);
    }catch(err)
    {
        return errorResponse();
    }
}
module.exports={
    menuUpdate,
    menuCategoryUpdate,
    menuDelete
}