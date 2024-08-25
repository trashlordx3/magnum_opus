const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const {authorizeRole} = require('../Middleware/authorize');
const { artworkImage } = require('../Middleware/uploadMiddleware');
const {
  addArtwork,
  updateArtwork,
  getArtworks,
  getArtwork,
  deleteArtwork,
  getRecentArtworks,
  getArtworksByArtist,
  getArtworksfromCategory,
  searchArtworks
} = require('../Controller/artwork2controller');

/**
 * @description Create a new product
 * @route POST /api/products
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the created product
 */
router.post('/add', authMiddleware, authorizeRole('admin'), artworkImage.single('artworkImage'), addArtwork);

/**
 * @description Update an existing product
 * @route PUT /api/products/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the updated product
 */
router.patch('/:id', authMiddleware, authorizeRole('admin'), artworkImage.single('artworkImage'), updateArtwork);

/**
 * @description Delete a product
 * @route DELETE /api/products/:id
 * @access Private/Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object confirming deletion
 */
router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteArtwork);

/**
 * @description Get a single product by ID
 * @route GET /api/products/:id
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing the product data
 */
router.get('/search', searchArtworks);

router.get('/recents', getRecentArtworks);

router.get('/:id', getArtwork);

router.get('/category/:categoryId',getArtworksfromCategory);

router.get('/artists/:artistId/', getArtworksByArtist);

/**
 * @description Get all products
 * @route GET /api/products
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} response - The response object containing an array of products
 */
router.get('/', getArtworks);

// router.get('/recents', getRecentArtworks);

module.exports = router;