const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")

exports.adminlogin = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const admin = await Admin.findOne({ email })
    
        if (!admin) throw Error("Admin with this e-mail does not exist")
    
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) throw Error("I should not say that the password does not match")
    
        const adminTemplate = {
            id: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email,
            isAdmin: admin.isAdmin
        }
    
        const token = jwt.sign(adminTemplate, process.env.JWT_SECRET)
        if (!token) throw Error("Something critical happened 99981811")
    
        res.status(200).json({
            token,
            ...adminTemplate
        })
    
    } catch (e){
    res.status(400).json({ error: e.message })
    }
}



exports.adminsignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const admin = await Admin.findOne({ email })

        if (admin) throw Error("Admin with that e-mail already exists")

        const salt = await bcrypt.genSalt(10)
        if (!salt) throw Error("Something critical happened 100000000")

        const hash = await bcrypt.hash(password, salt)
        if (!hash) throw Error("Something critical happened 123172387")

        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: hash,
            isAdmin: true
        })

        const savedAdmin = await newAdmin.save()
        if (!savedAdmin) throw Error("Error saving admin")

        res.status(200).json({ message: "Admin created successfully" })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}


exports.deleteAdmin = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email })
    
    if (!admin) res.status(404).send("Admin with this id does not exist")

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) res.status(403).send("Password does not match")

    const deletedAdmin = await Admin.findOneAndDelete({ email: email })

    if (!deletedAdmin) res.status(404).send("No admin with that id found")

    res.status(200).send(`Successfully deleted the following admin: \n ${deletedAdmin}`)
}