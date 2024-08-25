const { response } = require("express");
const Artwork = require("../Models/artwork");
const domain = "http://localhost:8080";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Create a new product (Admin Only)
const addArtwork = async (req, res) => {
  try {
    const {
      artist,
      category,
      title,
      description,
      imageUrl,
      images,
      price,
      countInStock,
      createdAt
    } = req.body;
    let artworkData = {
        artist,
        category,
        title,
        description,
        imageUrl,
        images,
        price,
        countInStock,
        createdAt
    };

    if (req.file) {
      const imageUrl = `${domain}/uploads/artworks/${req.file.filename}`;
      artworkData.imageUrl = imageUrl;
    }

    const artwork = new Artwork(artworkData);
    await artwork.save();

    res.status(201).json({
      msg: "Artwork added successfully",
      artwork: artwork,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Update a product (Admin Only)
const updateArtwork = async (req, res) => {
  try {
    const {
      artist,
      category,
      title,
      description,
      price,
      countInStock,
      createdAt
    } = req.body;
    let updateData = {
        artist,
        category,
        title,
        description,
        price,
        countInStock,
        createdAt
    };

    if (req.file) {
      const imageUrl = `${domain}/uploads/artworks/${req.file.filename}`;
      updateData.imageUrl = imageUrl;
    }

    const product = await Artwork.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    res.status(200).json({
      msg: "Artwork updated successfully",
      product: product,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const searchArtworks = async (req, res) => {
  const { search, sort } = req.query;
  let query = {
  };
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  let products = await Artwork.find(query);

  if (sort) {
    const sortOrder = sort === "asc" ? 1 : -1;
    products = products.sort((a, b) => (a.price - b.price) * sortOrder);
  }

  res.json(products);
};
// Get all products (Public)
// const getArtworks = async (req, res) => {
//   const { search, sort } = req.query;
//   let query = {};
//   if (search) {
//     query.name = { $regex: search, $options: "i" };
//   }

//   let products = await Artwork.find(query);

//   if (sort) {
//     const sortOrder = sort === "asc" ? 1 : -1;
//     products = products.sort((a, b) => (a.price - b.price) * sortOrder);
//   }

//   res.json(products);
// };

const getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().populate('artist');
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products (Public) and filter by category
const getArtworksByArtist = async (req, res) => {
  try {
      const { artistId } = req.params;
      const artworks = await Artwork.find({ artist: artistId }).populate('artist');
      res.json(artworks);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
};

const getArtworksfromCategory= async(req, res)=>{
  try {
    const categoryId = req.params.categoryId;
    const artworks = await Artwork.find({ category: categoryId }).populate('artist category');
    res.json(artworks);
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

const getArtwork = async (req, res) => {
  try {
    const product = await Artwork.findById(req.params.id).populate('artist').populate('category');

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

// Delete a product (Admin Only)
const deleteArtwork = async (req, res) => {
  try {
    const product = await Artwork.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Artwork not found" });
    }

    res
      .status(200)
      .json({ msg: "Artwork deleted successfully", success: true });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getRecentArtworks = async (req, res) => {
  try {
    console.log("Fetching recent artworks...");
    const recentArtworks = await Artwork.find().sort({ _id: -1 }).limit(10).populate("artist");
    console.log("Recent Artworks Fetched:", recentArtworks);
    res.json(recentArtworks);
  } catch (error) {
    console.error('Error fetching recent artworks:', error);
    res.status(500).json({ error: 'Failed to fetch recent artworks' });
  }
};

module.exports = {
    addArtwork,
    updateArtwork,
    getArtworksByArtist,
    getArtworks,
    getArtwork,
    deleteArtwork,
    getRecentArtworks,
    getArtworksfromCategory,
    searchArtworks
};