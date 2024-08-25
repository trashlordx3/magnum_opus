const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const {authorizeRole} = require("../Middleware/authorize");
const categoryController = require("../Controller/categoryController");

/**
 * @description To get all categories
 * @api /api/category/create
 * @access PUBLIC
 * @type POST
 * @return response
 */

router.post("/create", auth, authorizeRole("admin"), categoryController.addCategory);

router.patch('/:id',auth, authorizeRole("admin"),categoryController.updateCategory);

router.delete("/delete/:id", auth, authorizeRole("admin"), categoryController.deleteCategory);

router.get("/", categoryController.getCategories);

module.exports = router;