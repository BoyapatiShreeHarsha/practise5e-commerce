const { z } = require("zod");


const userSchema = z.object({
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
// anything else properties are not allowed by this.

async function validUser(req, res, next) {
    try {
        userSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(403).json({ data: "Invalid data of User", message: error });
    }
}

module.exports = {
    validUser
}