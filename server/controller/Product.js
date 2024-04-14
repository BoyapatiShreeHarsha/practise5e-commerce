const { Product } = require("../models/Product");


async function createProduct(req, res) {
    try {
        const body = req.body;
        const newProduct = new Product(body);
        await newProduct.save();
        res.status(200).json({ data: newProduct });
    } catch (error) {
        res.status(404).json(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        // if it is /:productId
        const searchId = req.params.productId;
        const newBody = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: searchId },
            newBody,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(403).json({ data: "Product not found" });
        }

        return res.status(200).json({ data: updatedProduct });
    } catch (error) {
        next(error);
    }

}

async function fetchProduct(req, res, next) {
    try {
        const searchId = req.params.productId;

        const productData = await Product.findById(searchId);

        if (!productData) {
            return res.status(403).json({ data: "Product not found" });
        }

        return res.status(200).json({ data: productData });
    } catch (error) {
        // even thought there is a global chatch i need to use try catch
        next(error)
    }


}

async function fetchProductsByFilters(req, res, next) {
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_per_page=12}.

    try {
        let query = Product.find({});
        let totalProductsQuery = Product.find({});

        if (req.query.category) {
            const categories = req.query.category.split(",");
            query = query.find({ category: { $in: categories } }); //handling multiple categories
            totalProductsQuery = totalProductsQuery.find({ category: { $in: categories } });
        }
        if (req.query.brand) {
            query = query.find({ brand: req.query.brand });
            totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
        }
        //TODO : How to get sort on discounted Price not on Actual price
        if (req.query._sort && req.query._order) {
            // if (req.query._sort === 'price') {
            //     // Sort by calculated price after discount
            //     query = query.addFields({
            //         calculatedPrice: {
            //             $multiply: [
            //                 "$price",
            //                 {
            //                     $subtract: [1, { $divide: ["$discountPercentage", 100] }]
            //                 }
            //             ]
            //         }
            //     });

            //     query = query.sort({
            //         calculatedPrice: req.query._order === 'asc' ? 1 : -1
            //     });
            // } else {
            // Sort by other fields
            query = query.sort({ [req.query._sort]: req.query._order });
            // }
        }

        const totalDocs = await totalProductsQuery.count().exec();
        let pageSize = parseFloat(req.query._per_page);
        let totalPages = Math.ceil(totalDocs / pageSize);


        if (req.query._page && req.query._per_page) {
            const pageSize = req.query._per_page;
            const page = req.query._page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }


        const docs = await query.exec();
        res.status(200).json({ "pages": totalPages, "items": totalDocs, "data": docs });
    } catch (error) {
        next(error);
    }

}


module.exports = {
    createProduct,
    updateProduct,
    fetchProduct,
    fetchProductsByFilters
}