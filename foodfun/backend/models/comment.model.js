const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: {type: String, required: true},
    foodName: {type: String, required: true},
    foodCalories: {type: Number, required: true},
    numStars: {type: Number, required: true},
    message: {type: String, required: true},
    datePosted: {type: Date}
});

const fComment = mongoose.model('fComment', commentSchema);
module.exports = fComment;