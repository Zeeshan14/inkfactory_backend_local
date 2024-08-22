const response = require("../../../utils/response/genericResponse");
const status = require("http-status");
const messages = require("../../../utils/constants/messages");
const { Artist, Role } = require("../../../models");
const errorResponse = require("../../../utils/response/errorResponse");
const bcrypt = require("bcryptjs");

const createArtist = async (req) => {
  try {
    const { first_name, last_name, email, username, password, contact_number, profile_pic, address, country, city, postal_code, shipping_address, shipping_country, shipping_city, shipping_postal_code, role_id } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newArtist = await Artist.create({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
      contact_number,
      profile_pic,
      address,
      country,
      city,
      postal_code,
      shipping_address,
      shipping_country,
      shipping_city,
      shipping_postal_code,
      role_id
    });

    return response(messages.ARTIST_CREATED, newArtist, true, status.CREATED);
  } catch (err) {
    return errorResponse();
  }
};

const getArtistById = async (req) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(id, {
      include: [Role]
    });

    if (!artist) {
      return errorResponse(messages.ARTIST_NOT_FOUND, {}, false, status.NOT_FOUND);
    }

    return response(messages.ARTIST_FETCHED, artist, true, status.OK);
  } catch (err) {
    return errorResponse();
  }
};

const deleteArtist = async (req) => {
  try {
    const { id } = req.params;
    await Artist.destroy({
      where: {
        id: id,
      },
    });
    return response(messages.ARTIST_DELETE);
  } catch (err) {
    return errorResponse();
  }
};

const updateArtist = async (req) => {
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
    const artistObj = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      contact_number: contact_number,
    };
    const artistExist = await Artist.findByPk(id, {
      include: [Role],
    });
    if (!artistExist) {
      return errorResponse("Artist does not exist", {}, false, 400);
    }
    if (currentPassword || newPassword) {
      const comparepassword = bcrypt.compareSync(
        currentPassword,
        artistExist.password
      );
      if (!comparepassword) {
        return errorResponse("Invalid current password", {}, false, 400);
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      artistObj.password = hashedPassword;
    }

    let updateArtist = await artistExist.update(artistObj);
    const token = await assignJwt(updateArtist.toJSON(), { expiresIn: "24h" });
    updateArtist = updateArtist.toJSON();
    updateArtist.token = token;
    delete updateArtist.password;
    return response("Artist updated successfully", updateArtist);
  } catch (err) {
    return errorResponse();
  }
};

const updateArtistAddresses = async (req) => {
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
    const artistObj = {
      address,
      city,
      country,
      postal_code,
      shipping_address,
      shipping_city,
      shipping_country,
      shipping_postal_code,
    };
    const artistExist = await Artist.findByPk(id, {
      include: [Role],
    });
    if (!artistExist) {
      return errorResponse("Artist does not exist", {}, false, 400);
    }
    let updateArtist = await artistExist.update(artistObj);
    const token = await assignJwt(updateArtist.toJSON(), { expiresIn: "24h" });
    updateArtist = updateArtist.toJSON();
    updateArtist.token = token;
    delete updateArtist.password;
    return response("Artist updated successfully", updateArtist);
  } catch (err) {
    return errorResponse();
  }
};

module.exports = {
  deleteArtist,
  updateArtist,
  updateArtistAddresses,
  createArtist,
  getArtistById
};
