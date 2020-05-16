const router = require('express').Router();
const Dislike = require('.././models/dislike.model');

router.route('/viewFoodDislikes').post((req, res) => {
    Dislike.findOne({foodName: req.body.foodName, foodCalories: req.body.foodCalories})
        .then(match => res.status(200).json(match))
        .catch(err => res.json("Error: " + err));
});

router.route('/addFoodDislike').post((req, res) => {
    Dislike.findOne({foodName: req.body.foodName, foodCalories: req.body.foodCalories})
        .then(match => {
            if (match) {
                const currDislikes = match.numDislikes;
                match.numDislikes = currDislikes + 1;

                match.save()
                    .then(() => res.status(200).json("Food Dislike Incremented"))
                    .catch(err => res.status(400).json("Error: " + err));
            } else {
                const newDislikeforFood = new Dislike({
                    foodName: req.body.foodName,
                    foodCalories: req.body.foodCalories,
                    userFirstName: req.body.userFirstName,
                    userLastName: req.body.userLastName,
                    userEmail: req.body.userEmail,
                    numDislikes: 1
                });

                newDislikeforFood.save()
                    .then(() => res.status(200).json("NEW Food Dislike Added"))
                    .catch(err => res.status(400).json(err));
            }
        })
});

router.route('/removeFoodDislike').post((req, res) => {
    Dislike.findOne({foodName: req.body.foodName, foodCalories: req.body.foodCalories})
        .then(match => {
            if (match.numDislikes) {
                const currDislikes = match.numDislikes;
                match.numDislikes = currDislikes - 1;

                match.save()
                    .then(() => res.status(200).json("Food Dislike Decremented"))
                    .catch(err => res.status(400).json("Error: " + err));
            }
        }).catch(err => res.json("Error: " + err));
});

module.exports = router;