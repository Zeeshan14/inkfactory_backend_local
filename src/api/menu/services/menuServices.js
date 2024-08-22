
const {menuCreate} =require('./createServices');
const {menuList,getMenyById} =require('./listServices');
const {menuUpdate,menuCategoryUpdate,menuDelete} =require('./updateServices');
module.exports={
    menuCreate,
    menuList,
    menuUpdate,
    menuCategoryUpdate,
    menuDelete,
    getMenyById
}