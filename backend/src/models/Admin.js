const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isAdmin: {type: String, required: true}
});

const Admin = model("Admin", adminSchema)

module.exports = Admin