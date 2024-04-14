const { z } = require("zod");

const brandSchema = z.object({
    value: z.string(),
    label: z.string()
});

async function validateBrand(req, res, next) {
    try {
        const result = brandSchema.parse(req.body);
        next();
    } catch (error) {
        return res.status(403).json({ data: "Invalid data of Brand" });
    }
}

module.exports = {
    validateBrand
}