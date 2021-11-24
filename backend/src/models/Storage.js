const { Schema, model } = require('mongoose')

const storageSchema = new Schema({
    
    name: { type: String, required: true },
    number: { type: String, required: true },
    volume: { type: String, requiered: true },
    floorspace: { type: String, requiered: true },
    priceperday: { type: String, requiered: true },
    status: { type: String, requiered: true },  
});



// staatused: available, inUse, outOfOrder
const Storage = model("Storage", storageSchema)

module.exports = Storage