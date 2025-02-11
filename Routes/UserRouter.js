const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')
const { body, validationResult } = require('express-validator')


router.post('/signup',
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.json({ success: false, errorMessage: result.array() })
        }

        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.json({ success: false, error: "Email ID already exists" })
            }

            user = await new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }).save()

            res.json({ success: true, message: "User Registered Successfully" })

        } catch (error) {
            console.error(error.message)
            res.status(500).json({ success: false, message: "Internal Server Error" })

        }
    })


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, error: "Invalid Credentials" })
        }
        if (user.password !== password) {
            return res.json({ success: false, error: "Invalid Credentials" })
        }
        res.json({ success: true, message: "User Logged in Successfully" })
    } catch (error) {
        return res.json({ success: false, error: "Invalid Credentials" })
    }
})








module.exports = router