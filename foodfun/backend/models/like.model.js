const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    foodName: {type: String, required: true},
    foodCalories: {type: Number, required: true},
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: {type: String, required: true},
    numLikes: {type: Number, required: true}
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;