const express = require('express');
const {connectDB} =  require("./mongo/connection");
const cors = require('cors');
const productRouter = require('./routers/productRouter')
const app = express();
app.use(cors());
app.use(express.json());



app.use('/products', productRouter);


connectDB().then(() => console.log("Connected to database!"))

const server = app.listen(3001, () => {
    console.log('Server is up and running at 3001 ⚡')
});
