const authJwt = require('../../../utils/helpers/authJwt');
const {allArtists,deleteArtist,updateArtist,updateArtistAddresses, createArtist, getArtistById} = require('../controllers/artistController');
const {artistIdValidator} =require('../validators/artistValidator');
const router = require('express').Router();
router.get("/allArtists",authJwt,allArtists)
router.delete("/deleteArtist/:id",authJwt,artistIdValidator,deleteArtist)
router.post("/updateArtist/:id",authJwt,updateArtist)
router.post("/updateArtistAddresses/:id",authJwt,updateArtistAddresses)
router.post("/createArtist", authJwt, createArtist);
router.get("/getArtistById/:id", authJwt, artistIdValidator, getArtistById);

module.exports =router;