const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, {
    useNewUrlParser: true,
    userCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

const searchRouter = require('./routes/search.route');
const authRouter = require('./routes/auth.route');
const commentRouter = require('./routes/comment.route');
const likeRouter = require('./routes/like.route');
const dislikeRouter = require('./routes/dislike.route');
app.use('/search', searchRouter);
app.use('/auth', authRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/dislike', dislikeRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})