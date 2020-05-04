const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http');
const path = require('path');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// const uri = process.env.ATLAS_URI;
// mongoose.connect(process.env.MONGODB_URI || uri, {
//     useNewUrlParser: true,
//     userCreateIndex: true,
//     useUnifiedTopology: true
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established succesfully");
// });

const searchRouter = require('./routes/search.route');
app.use('/search', searchRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})