const router = require('express').Router();
const axios = require('axios');
var privateVars = require('.././private');

router.route('/:foodName').get((req, res) => {
    axios.get(`https://api.edamam.com/search?q=${req.params.foodName}&app_id=${privateVars.APP_ID}&app_key=${privateVars.APP_KEY}`)
        .then(response => res.status(200).json(response.data.hits))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/filter').post((req, res) => {
    var mainFood = req.body.foodName;
    var calRange = '';
    var mealType = '';
    var timeRange = '';

    //calRange formatting 
    calRange += formatCalRange(req.body.calMin, req.body.calMax);

    //mealType formatting
    if (req.body.mealType != "") {
        mealType += '&mealtype=' + req.body.mealType.toLowerCase();
    }

    //timeRange formatting
    timeRange += formatTime(req.body.timeMin, req.body.timeMax);

    const finalQueryString = calRange + mealType + timeRange;
    axios.get(`https://api.edamam.com/search?q=${mainFood}&app_id=${privateVars.APP_ID}&app_key=${privateVars.APP_KEY}${finalQueryString}`)
        .then(response => res.status(200).json(response.data.hits))
        .catch(err => res.status(400).json("Error: " + err));
});

function formatTime(timeMin, timeMax) {
    if (timeMin === "" && timeMax === "") {
        return '';
    }
    var timeParams = '&time=';
    if (timeMin != "") {
        timeParams += timeMin;
        if (timeMax != "") {
            timeParams += '-';
        }
    }
    if (timeMax != "") {
        timeParams += timeMax;
    }
    return timeParams;
}

function formatCalRange(calMin, calMax) {
    if (calMin === "" && calMax === "") {
        return '';
    }

    var calParams = '&calories=';
    if (calMin != "") {
        calParams += calMin;
        if (calMax != "") {
            calParams += '-';
        }
    }
    if (calMax != "") {
        calParams += calMax;
    }
    return calParams;
}

module.exports = router;
