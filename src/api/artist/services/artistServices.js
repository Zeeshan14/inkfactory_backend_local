const {allArtists} = require('./artistListServices');
const {deleteArtist,updateArtist,updateArtistAddresses,createArtist, getArtistById} = require('./artistUpdateServices');

module.exports={
    allArtists,
    deleteArtist,
    updateArtist,
    updateArtistAddresses,
    createArtist,
    getArtistById
};