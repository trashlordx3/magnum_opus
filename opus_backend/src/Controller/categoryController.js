const Category = require("../Models/categoryModels");

//  controller for adding a category
const addCategory = async (req, res) => {
  const { name, description, image} = req.body;
  if (!name || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  //  check if category already exists
  try {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ msg: "Category already exists" });
    }
    const category = new Category({
      name,
      description,
      image
    });
    await category.save();
    return res
      .status(201)
      .json({ msg: "Category added successfully", category });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// controller for getting all categories

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res
      .status(200)
      .json({ msg: "category fetched successfully", categories });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for getting a single category

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
        return res.status(404).json({ msg: "Category not found" });
        }
        return res.status(200).json({ msg: "Category fetched successfully", category });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }


// controller for updating a category

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    return res.status(200).json({ msg: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


// controller for deleting a category

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
        return res.status(404).json({ msg: "Category not found" });
        }
        return res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
    }

module.exports = { addCategory, getCategories, getCategory, updateCategory, deleteCategory };