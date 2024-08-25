const artist = require("../Models/artist");
const Artwork= require("../Models/artwork")

//  controller for adding a category
const addArtist = async (req, res) => {
  const { name, bio, profileImage } = req.body;
  if (!name || !bio) {
    return res.status(400).json({ msg: "Fields are required" });
  }
  //  check if category already exists
  try {
    const artistExists = await artist.findOne({ name });
    if (artistExists) {
      return res.status(400).json({ msg: "Artist already exists" });
    }
    const artisto = new artist({
      name,
      bio,
      profileImage
    });
    await artisto.save();
    return res
      .status(201)
      .json({ msg: "Artist added successfully", artisto: artisto });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting all categories

const getArtists = async (req, res) => {
  try {
    const artists = await artist.find();
    return res
      .status(200)
      .json({ msg: "Artists fetched successfully", artists});
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting a single category

const getArtist = async (req, res) => {
  try {
    const artistId= req.params.id;
    const singleartist = await artist.findById(artistId);
    if (!singleartist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    const artworks = await Artwork.find({ artist: artistId });
    return res
      .status(200)
      .json({ msg: "Artist fetched successfully", singleartist ,artworks});
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for updating a category

const updateArtist = async (req, res) => {
  const { name, bio, profileImage} = req.body;
  try {
    const artguy = await artist.findOne({ _id: req.params.id });
    if (!artguy) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    if (!name) {
      artguy.bio = bio;
      artguy.profileImage= profileImage;
    } else if (!bio) {
      artguy.name = name;
      artguy.profileImage= profileImage;
    } 
    else if (!profileImage) {
    artguy.name = name;
    artguy.bio=bio;
    }
    else {
        artguy.name = name;
        artguy.bio = bio;
        artguy.profileImage= profileImage;
    }

    await artguy.save();
    return res
      .status(200)
      .json({ msg: "Artist updated successfully", artguy });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for deleting a category

const deleteArtist = async (req, res) => {
  try {
    const aartist = await artist.findByIdAndDelete(req.params.id);
    if (!aartist) {
      return res.status(404).json({ msg: "Artist not found" });
    }
    return res.status(200).json({ msg: "Artist deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  addArtist,
  getArtist,
  getArtists,
  updateArtist,
  deleteArtist,
};