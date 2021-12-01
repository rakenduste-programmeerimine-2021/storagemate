const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.login = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await User.findOne({ email })
    
        if (!user) throw Error("User with this e-mail does not exist")
    
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw Error("I should not say that the password does not match")
    
        const userTemplate = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }
    
        const token = jwt.sign(userTemplate, process.env.JWT_SECRET)
        if (!token) throw Error("Something critical happened 99981811")
    
        res.status(200).json({
            token,
            ...userTemplate
        })
    
    } catch (e){
    res.status(400).json({ error: e.message })
    }
}



exports.signup = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body

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
            phone,
            password: hash
        })

        const savedUser = await newUser.save()
        if (!savedUser) throw Error("Error saving user")

        res.status(200).json({ message: "User created successfully" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}

exports.update = async (req, res) => {

    const { firstName, lastName, email, phone, password, createdAt } = req.body
    const { id } = req.params;

    try{

    const user = await User.findOne({ _id: id })
    
    if (!user) throw Error("User with this e-mail does not exist")

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw Error("I should not say that the password does not match")
    

    const userTemplate = {
        firstName,
        lastName,
        email,
        phone,
        createdAt,
    }

    const UserUpdate = await User.findOneAndUpdate({ _id: id }, userTemplate)

    if (!UserUpdate) throw Error("No user with that id found")

    const updatedUser = await User.findOne({ _id: id })
    console.log(updatedUser)

    const userTemplateAfterDB = {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
    }
    res.status(200).json({
        ...userTemplateAfterDB
    })
    } catch (e){
    res.status(400).json({ error: e.message })
    }
}


exports.changepw = async (req, res) => {
    const { firstName, lastName, email, phone, password, oldpassword } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) throw Error("No User with that e-mail found")

        const isMatch = await bcrypt.compare(oldpassword, user.password)
        if (!isMatch) throw Error("Validation failed")

        const salt = await bcrypt.genSalt(10)
        if (!salt) throw Error("Something critical happened 100000000")

        const hash = await bcrypt.hash(password, salt)
        if (!hash) throw Error("Something critical happened 123172387")

        const UpdatedUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password: hash
        })

        const savedUser = await User.findOneAndUpdate({email: email}, {password: hash})
        if (!savedUser) throw Error("Error updating password")

        res.status(200).json({ message: "User updated successfully" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}
