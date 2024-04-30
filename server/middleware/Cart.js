const { z } = require("zod");


const CartShcema = z.object({
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
    productId: z.string(),
    quantity: z.number().refine((num) => num > 0, {
        message: 'Quantity must be positive'
    }),
    user: z.string()
})

async function validCart(req, res, next) {
    try {
        const result = CartShcema.parse(req.body);
        next();
    } catch (error) {
        res.status(403).json({ data: "Invalid data of Cart", message: error });
    }
}

module.exports = {
    validCart
}