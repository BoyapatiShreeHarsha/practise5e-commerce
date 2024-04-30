const { Category } = require("../models/Category");

async function createCategory(req, res, next) {
    try {
        const data = req.body;
        const newCategory = new Category(data);
        await newCategory.save();
        return res.status(200).json({ data: newCategory });
    } catch (error) {
        next(error);
    }
}

async function getAllCategory(req, res, next) {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createCategory,
    getAllCategory
}