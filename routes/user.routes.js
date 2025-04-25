const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 1 }),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 })
    , async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid Data"
            })
        }

        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.json(newUser);
    })

module.exports = router