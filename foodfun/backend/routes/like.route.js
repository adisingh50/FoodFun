const router = require('express').Router();
const Like = require('.././models/like.model');

router.route('/viewFoodLikes').post((req, res) => {
    Like.findOne({foodName: req.body.foodName, foodCalories: req.body.foodCalories})
        .then(match => res.status(200).json(match))
        .catch(err => res.json("Error: " + err));
});

router.route('/addFoodLike').post((req, res) => {
    Like.findOne({foodName: req.body.foodName, foodCalories: req.body.foodCalories})
        .then(match => {
            if (match) {
                const currLikes = match.numLikes;
                match.numLikes = currLikes + 1;

                match.save()
                    .then(() => res.status(200).json("Food Like Incremented"))
                    .catch(err => res.status(400).json("Error: " + err));
            } else {
                const newLikeforFood = new Like({
                    foodName: req.body.foodName,
                    foodCalories: req.body.foodCalories,
                    userFirstName: req.body.userFirstName,
                    userLastName: req.body.userLastName,
                    userEmail: req.body.userEmail,
                    numLikes: 1
                });

                newLikeforFood.save()
                    .then(() => res.status(200).json("NEW Food Like Added"))
                    .catch(err => res.status(400).json(err));
            }
        })
        .catch(err => res.json("Error: " + err));
});

router.route('/removeFoodLike').post((req, res) => {
    Like.findOne({foodName: req.body.foodName, foodCalories: req.body.foodCalories})
        .then(match => {
            if (match.numLikes) {
                const currLikes = match.numLikes;
                match.numLikes = currLikes - 1;
                
                match.save()
                    .then(() => res.status(200).json("Food Like Decremented"))
                    .catch(() => res.status(400).json("Error: " + err));
            }
        })
        .catch(err => res.json("Error: " + err));
});

module.exports = router;

