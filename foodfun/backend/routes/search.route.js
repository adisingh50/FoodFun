const router = require('express').Router();
const axios = require('axios');
var privateVars = require('.././private');

router.route('/:foodName').get((req, res) => {
    axios.get(`https://api.edamam.com/search?q=${req.params.foodName}&app_id=${privateVars.APP_ID}&app_key=${privateVars.APP_KEY}`)
        .then(response => res.status(200).json(response.data))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
