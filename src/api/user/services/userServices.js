const {allUsers,getLoggedInUser,getSingleUser} =require('./userListServices');
const {deleteUser,updateUser,updateUserAddresses,updateProfileImage,queryEmail} =require('./userUpdateServices');

module.exports={
    allUsers,
    deleteUser,
    updateUser,
    updateUserAddresses,
    getLoggedInUser,
    updateProfileImage,
    queryEmail,
    getSingleUser
}