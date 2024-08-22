const messages = require('../../../utils/constants/messages');
const errorResponse = require('../../../utils/response/errorResponse');
const Menu = require('../models/menuModel');
const response = require('../../../utils/response/genericResponse');
const MenuCategory = require('../models/menuCategoryModel');
const menuCreate = async(req)=>{
    try{
        const {categories,menu_title}=req.body;
        // const {categories,menu_title,menu_titles}=req.body;
        const menu = await Menu.create({
            menu_title:menu_title
        });        
        const menuCategories = categories.map((element)=>{
            return{
                menu_id:menu.id,
                category_id:element
            }
        })
        await MenuCategory.bulkCreate(menuCategories);
        return response("menu created successfullt");
    }catch(err)
    {
        console.log(err)
        return errorResponse();
    }
}
module.exports={
    menuCreate
}