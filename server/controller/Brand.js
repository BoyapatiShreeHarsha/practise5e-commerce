const { Brand } = require("../models/Brand");

async function createBrand(req, res, next) {
    try {
        const data = req.body;
        const newBrand = new Brand(data);
        await newBrand.save();
        return res.status(200).json({ data: newBrand });
    } catch (error) {
        next(error);
    }
}

async function getAllBrand(req, res, next) {
    try {
        const Brands = await Brand.find();
        return res.status(200).json({ data: Brands });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createBrand,
    getAllBrand
}