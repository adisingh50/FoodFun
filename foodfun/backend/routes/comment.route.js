const router = require('express').Router();
const fComment = require('.././models/comment.model');

router.route('/viewAllComments').get((req, res) => {
    fComment.find()
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(400).json(err => "Error: " + err));
});

router.route('/viewFoodComments').post((req, res) => {
    fComment.find({foodName: req.body.foodName, foodCalories: req.body.foodCalories})
        .then(matches => res.status(200).json(matches))
        .catch(err => res.status(400).json(err));
});

router.route('/post').post((req, res) => {
    const d = new Date();
    const dP = d.toLocaleString("en-US");

    const newComment = new fComment({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userEmail: req.body.userEmail,
        foodName: req.body.foodName,
        foodCalories: req.body.foodCalories,
        numStars: req.body.numStars,
        message: req.body.message,
        datePosted: dP
    });

    newComment.save()
        .then(() => res.status(200).json({newCom: newComment}))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/editComment/:id').post((req, res) => {
    fComment.findById(req.params.id)
        .then(comment => {
            comment.message = req.body.message;

            comment.save()
                .then(() => res.status(200).json("Comment Edited."))
                .catch(err => res.status(400).json("Error: " + err));
        });
});

router.route('/deleteComment/:id').delete((req, res) => {
    fComment.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("Comment Deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;