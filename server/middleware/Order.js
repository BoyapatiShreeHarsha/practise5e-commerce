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
    delete: z.optional(z.boolean()),
    id: z.optional(z.string())
})

const userSchema = z.object({
    id: z.optional(z.string()),
    email: z.string().email(),
    password: z.string(),
    addresses: z.optional(z.array(z.object({
        name: z.string(),
        phone: z.string(),
        street: z.string(),
        city: z.string(),
        state: z.string(),
        pinCode: z.string(),
    }))),
    uname: z.optional(z.string()),
    role: z.optional(z.string())
})

const orderSchema = z.object({
    items: z.array(productShema),
    totalAmount: z.number(),
    totalItems: z.number(),
    user: userSchema,
    paymentMethod: z.string(),
    selectedAddress: z.object({
        name: z.string(),
        phone: z.string(),
        street: z.string(),
        city: z.string(),
        state: z.string(),
        pinCode: z.string(),
        _id: z.optional(z.string())
    }),
    status: z.string()
});


async function validOrder(req, res, next) {
    try {
        const result = orderSchema.parse(req.body);
        next();
    } catch (error) {
        console.log("error-------------->", error);
        res.status(403).json({ data: "Invalid data of Order", error });
    }
}

module.exports = {
    validOrder
}