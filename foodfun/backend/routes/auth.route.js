const router = require('express').Router();
const User = require('.././models/user.model');
const {registerValidation, loginValidation} = require('.././validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/register').post((req, res) => {
    const validationRes = registerValidation(req.body);

    if (validationRes.error) return res.status(400).json(validationRes.error.details[0].message);
    
    User.findOne({email: req.body.email})
        .then(match => {
            if (match) {
                return res.status(400).json("The Email You Entered Already Exists");
            } else {
                //hash pw
                var salt = bcrypt.genSaltSync(10); //level of complexity of hash
                const hashedPW = bcrypt.hashSync(req.body.password, salt);

                //successful register
                const newUser = new User({
                    firstName: req.body.firstName,            
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPW
                });
                
                newUser.save()
                    .then(() => res.status(200).json("User Added: " + req.body.firstName))
                    .catch(err => res.status(400).json(err));
            }
        });
});

router.route('/login').post((req, res) => {
    const validationRes = loginValidation(req.body);

    if (validationRes.error) return res.status(400).json(validationRes.error.details[0].message);

    User.findOne({email: req.body.email})
        .then(match => {
            if (match) {
                if (bcrypt.compareSync(req.body.password, match.password)) {
                    const token = jwt.sign({_id: match._id}, process.env.TOKEN_SECRET);
                    res.header('auth-token', token).status(200).json("Logged In!");
                } else {
                    res.status(400).json("Invalid Password");
                }
            } else {
                res.status(400).json("The Email You Entered Does Not Exist.");
            }
        });
});

module.exports = router;