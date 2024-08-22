const sequelize = require('../config/db');
require('../models/index');
const syncDB = async()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter:true});
        console.log("===========: Models Sync Successfully");
    }
    catch(err)
    {
        console.log(err);
        console.log("===========:  Error Syncing DB");
    }
}
 syncDB();

//module.exports = syncDB;