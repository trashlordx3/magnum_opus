const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const authorize = require("../Middleware/authorize");
const {addArtist, updateArtist, deleteArtist, getArtists, getArtist} = require("../Controller/artist2controller")

/**
 * @description To get all categories
 * @api /api/category/create
 * @access Private
 * @type POST
 * @return response
 */

router.post("/add", auth, authorize.authorizeRole("admin"), addArtist);

/**
 * @description To update categories by id
 * @api /api/category/update/:id
 * @access Private
 * @type PUT
 * @return response
 */
router.patch("/update/:id", auth, authorize.authorizeRole('admin'), updateArtist);


router.get("/", getArtists);

router.get("/:id", getArtist);

router.delete("/delete/:id", auth, authorize.authorizeRole('admin'), deleteArtist);

module.exports = router;