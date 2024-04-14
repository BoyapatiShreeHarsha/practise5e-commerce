const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const productRouter = require("./routes/Product");
const categoryRouter = require("./routes/Category");
const brandRouter = require("./routes/Brand");


// Middleware for parsing request bodies
app.use(express.json());
app.use(cors({
    exposedHeaders: ['X-Total-Count']
}))
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);

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


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});