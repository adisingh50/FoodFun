const router = require('express').Router();
const User = require('.././models/user.model');
const {registerValidation, loginValidation} = require('.././validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('.././middleware/auth');

router.route('/register').post((req, res) => {
    const validationRes = registerValidation(req.body);

    if (validationRes.error) return res.json({error: validationRes.error.details[0].message});
    
    User.findOne({email: req.body.email})
        .then(match => {
            if (match) {
                return res.json({error: "The Email You Entered Already Exists"});
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
                    .then(() => res.status(200).json({person: match}))
                    .catch(err => res.status(400).json(err));
            }
        });
});

router.route('/login').post((req, res) => {
    const validationRes = loginValidation(req.body);

    if (validationRes.error) {
        return res.json({
            errors: validationRes.error.details[0].message, 
            status: false,
        });
    }
    
    User.findOne({email: req.body.email})
        .then(match => {
            if (match) {
                if (bcrypt.compareSync(req.body.password, match.password)) {
                    const token = jwt.sign({_id: match._id}, process.env.TOKEN_SECRET);

                    res.header('auth-token', token).status(200).json({
                        token: token,
                        status: true,
                        person: match
                    });
                } else {
                    res.json({
                        errors: "Invalid Password",
                        status: false
                    });
                }
            } else {
                res.json({
                    errors: "The Email You Entered Does Not Exist.",
                    status: false
                });
            }
        });
});

router.route('/delete', auth, async (req, res) => {

})

module.exports = router;