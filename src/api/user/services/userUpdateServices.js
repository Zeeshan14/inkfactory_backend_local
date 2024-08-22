const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const messages = require("../../../utils/constants/messages");
const { User, Role, ContactUs } = require("../../../models");
const errorResponse = require("../../../utils/response/errorResponse");
const assignJwt = require("../../../utils/helpers/jwt");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { sendEmail, sendAutoReplyEmail } = require("../../../utils/helpers/sendEmail");
const deleteUser = async (req) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
    });
    return response(messages.USER_DELETE);
  } catch (err) {
    return errorResponse();
  }
};
const updateUser = async (req) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      email,
      contact_number,
      newPassword,
      currentPassword,
    } = req.body;
    const userObj = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      contact_number: contact_number,
    };
    const userExist = await User.findByPk(id, {
      include: [Role],
    });
    if (!userExist) {
      return errorResponse("User does not exist", {}, false, 400);
    }
    if (currentPassword || newPassword) {
      const comparepassword = bcrypt.compareSync(
        currentPassword,
        userExist.password
      );
      if (!comparepassword) {
        return errorResponse("Invalid current password", {}, false, 400);
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      userObj.password = hashedPassword;
    }

    let updateUser = await userExist.update(userObj);
    const token = await assignJwt(updateUser.toJSON(), { expiresIn: "24h" });
    updateUser = updateUser.toJSON();
    updateUser.token = token;
    delete updateUser.password;
    return response("User updated successfully", updateUser);
  } catch (err) {
    return errorResponse();
  }
};
const updateUserAddresses = async (req) => {
  try {
    const { id } = req.params;
    const {
      address,
      city,
      country,
      postal_code,
      shipping_address,
      shipping_city,
      shipping_country,
      shipping_postal_code,
    } = req.body;
    const userObj = {
      address,
      city,
      country,
      postal_code,
      shipping_address,
      shipping_city,
      shipping_country,
      shipping_postal_code,
    };
    const userExist = await User.findByPk(id, {
      include: [Role],
    });
    if (!userExist) {
      return errorResponse("User does not exist", {}, false, 400);
    }
    let updateUser = await userExist.update(userObj);
    const token = await assignJwt(updateUser.toJSON(), { expiresIn: "24h" });
    updateUser = updateUser.toJSON();
    updateUser.token = token;
    delete updateUser.password;
    return response("User updated successfully", updateUser);
  } catch (err) {
    return errorResponse();
  }
};
const updateProfileImage = async (req) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return errorResponse("Profile pic is required", {}, false, 400);
    }
    const profile_pic = req.file
      ? `${process.env.UPLOAD_FILE_URL}/${req.file.destination}${req.file.filename}`
      : null;
    const userExist = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [Role],
    });
    if (!userExist) {
      return errorResponse("User does not exist", {}, false, 400);
    }
    try {
      fs.unlinkSync(
        userExist.profile_pic
          .split(process.env.UPLOAD_FILE_URL + "/")[1]
          .replaceAll("/", "\\")
      );
    } catch (err) {
      console.log("Error on deleting old file", err);
    }
    let updateUser = await userExist.update({ profile_pic });
    return response("Profile image updated successfully", updateUser);
  } catch (err) {
    if (req.file) fs.unlinkSync(req?.file?.path);
    return errorResponse();
  }
};
const queryEmail = async (req) => {
  try {
    const { email_address, name, order_number, subject, note } = req.body;
    const emailSend =await sendEmail(req.body)
    if(!emailSend){
      return errorResponse("Email does not send",{},false,400);
    }
    const createQueryEmail = await ContactUs.create({
      email_address,
      name,
      order_number,
      subject,
      note,
      user_id:req.user.id
    });
    await sendAutoReplyEmail(req.body)
    return response("Email Send Successfully", {});
  } catch (err) {
    return errorResponse();
  }
};
module.exports = {
  deleteUser,
  updateUser,
  updateUserAddresses,
  updateProfileImage,
  queryEmail,
};
