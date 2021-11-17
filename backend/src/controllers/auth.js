const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (user) throw Error("User with that e-mail already exists")

        const salt = await bcrypt.genSalt(10)
        if (!salt) throw Error("Something critical happened 100000000")

        const hash = await bcrypt.hash(password, salt)
        if (!hash) throw Error("Something critical happened 123172387")

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash
        })

        const savedUser = await newUser.save()
        if (!savedUser) throw Error("Error saving user")

        res.status(200).json({ message: "User created successfully" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}