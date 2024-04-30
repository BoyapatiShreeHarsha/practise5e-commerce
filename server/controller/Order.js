const { Order } = require("../models/Order");

async function createOrder(req, res) {
    try {
        const data = req.body;
        const newOrder = new Order(data);
        await newOrder.save();
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(404).json({ message: error });

    }
}
// need to create a way so that we store only the userId but while sending we should populate the user data also


async function updateOrder(req, res, next) {
    try {
        let searchId = req.params.orderId;
        const newData = await Order.findByIdAndUpdate(searchId, req.body, { new: true });
        if (!newData) {
            return res.status(404).json({ data: "Can't find the order" });
        }

        return res.status(200).json(newData);
    } catch (error) {
        next(error);
    }
}

async function fetchByUser(req, res, next) {
    try {
        const { user } = req.query;
        const orders = await Order.find({ 'user.id': user });

        res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
}

async function fetchAllOrders(req, res, next) {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_per_page=12}.
    try {
        let query = Order.find({});
        let totalOrdersQuery = Order.find({});

        if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order });
        }

        const totalDocs = await totalOrdersQuery.count().exec();
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
    createOrder,
    updateOrder,
    fetchAllOrders,
    fetchByUser
}