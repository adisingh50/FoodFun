const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = new Schema({
    foodName: {type: String, required: true},
    foodCalories: {type: String, required: true},
    userFirstName: {type: String, required: true},
    userLastName: {type: String, required: true},
    userEmail: {type: String, required: true},
    numDislikes: {type: Number, required: true}
});

const Dislike = mongoose.model('Dislike', dislikeSchema);
module.exports = Dislike;