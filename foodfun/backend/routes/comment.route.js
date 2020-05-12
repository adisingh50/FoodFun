const router = require('express').Router();
const foodComment = require('.././models/comment.model');

router.route('/viewAllComments').get((req, res) => {
    foodComment.find()
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(400).json(err => "Error: " + err));
});

router.route('/viewFoodComments').post((req, res) => {
    foodComment.find({foodName: req.body.foodName})
        .then(matches => res.status(200).json(matches))
        .catch(err => res.status(400).json(err));
});

router.route('/post').post((req, res) => {
    const newComment = new foodComment({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userEmail: req.body.userEmail,
        foodName: req.body.foodName,
        numStars: req.body.numStars,
        message: req.body.message,
    });

    newComment.save()
        .then(() => res.status(200).json({newCom: newComment}))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/editComment/:id').post((req, res) => {
    foodComment.findById(req.params.id)
        .then(comment => {
            comment.message = req.body.message;

            comment.save()
                .then(() => res.status(200).json("Comment Edited."))
                .catch(err => res.status(400).json("Error: " + err));
        });
});

router.route('/deleteComment/:id').delete((req, res) => {
    foodComment.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json("Comment Deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;