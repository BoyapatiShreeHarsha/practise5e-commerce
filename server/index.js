const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const productRouter = require("./routes/Product");
const categoryRouter = require("./routes/Category");
const brandRouter = require("./routes/Brand");
const userRouter = require("./routes/User");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");


// Middleware for parsing request bodies
app.use(express.json());
// the object inside this is mainly to tell we send this header in response and no error should come.
app.use(cors({
    exposedHeaders: ['X-Total-Count']
}))
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter)

async function ConnectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/e-commerce');
        console.log("Mongo Connection established");
    } catch (error) {
        console.log("mongo connection failed ----------------->", error);
    }
}

ConnectToMongo();


app.get("*", (req, res) => {
    return res.status(404).send("wrong route")
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});