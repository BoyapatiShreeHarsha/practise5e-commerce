const { User } = require("../models/User");

async function createUser(req, res) {
    try {
        const data = req.body;
        const newUser = new User(data);
        await newUser.save();
        res.status(200).json({ id: newUser.id });
    } catch (error) {
        res.status(404).json(error);
    }
}

async function checkUser(req, res, next) {
    try {
        let query = User.find({});
        if (req.query.email)
            query = query.find({ email: req.query.email });

        if (req.query.id)
            query = query.find({ _id: req.query.id });

        let docs = await query.exec();
        res.status(200).json(docs);

    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        let searchId = req.params.userId;
        const newData = await User.findByIdAndUpdate(searchId, req.body, { new: true });
        if (!newData) {
            return res.status(404).json({ message: "Can't find the user" });
        }

        return res.status(200).json(newData);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createUser,
    checkUser,
    updateUser
}