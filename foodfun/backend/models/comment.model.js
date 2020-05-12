const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: {type: String, required: true},
    foodName: {type: String, required: true},
    numStars: {type: Number, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

const foodComment = mongoose.model('foodComment', commentSchema);
module.exports = foodComment;