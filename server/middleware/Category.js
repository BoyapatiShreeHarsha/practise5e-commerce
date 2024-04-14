const { z } = require("zod");

const categorySchema = z.object({
    value: z.string(),
    label: z.string()
});

async function validateCategory(req, res, next) {
    try {
        const result = categorySchema.parse(req.body);
        next();
    } catch (error) {
        res.status(403).json({ data: "Invalid data of Category" });
    }
}

module.exports = {
    validateCategory
}