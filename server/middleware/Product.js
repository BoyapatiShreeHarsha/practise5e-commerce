const { z } = require("zod");


const productShema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number().refine((num) => num > 0, {
        message: 'Price must be positive'
    }),
    discountPercentage: z.number().refine((num) => num >= 0 && num <= 100, {
        message: "Discount Percentage should be percentage only"
    }),
    rating: z.optional(z.number()),
    stock: z.number(),
    brand: z.string(),
    category: z.string(),
    thumbnail: z.string().url(),
    images: z.array(z.string().url()),
})
// anything else properties are not allowed by this.

async function validProduct(req, res, next) {
    try {
        const result = productShema.parse(req.body);
        next();
    } catch (error) {
        res.status(403).json({ data: "Invalid data of Product" });
    }
}

module.exports = {
    validProduct
}