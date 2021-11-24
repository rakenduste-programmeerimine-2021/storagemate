const Storage = require('../models/Storage')

exports.getStorages = async (req, res) => {
    const storages = await Storage.find({})

    res.status(200).send(storages)
}


exports.createStorage = async (req, res) => {
    // Saaksite info kätta req.body -st
    const { name, number, volume, floorspace, priceperday, status} = req.body  

    const newStorage = new Storage({
        name,
        number,
        volume,
        floorspace,
        priceperday,
        status
    })

    const savedStorage = await newStorage.save()
    if (!savedStorage) throw Error("Error saving Storage")

    res.status(200).send(`yay ${savedStorage._id}`)
}
exports.updateStorage = async (req, res) => {

    const { id } = req.params;

    const storage = await Storage.findOneAndUpdate({ _id: id }, req.body)

    if (!storage) res.status(404).send("No storage with that id found")

    const updatedStorage = await Storage.findOne({ _id: id })

    res.status(200).send(`Successfully updated the following storage: \n ${updatedStorage}`)


}

exports.deleteStorage = async (req, res) => {
    const { id } = req.params;

    const Storage = await Storage.findOneAndDelete({ _id: id })

    if (!storage) res.status(404).send("No storage with that id found")

    res.status(200).send(`Successfully deleted the following storage: \n ${storage}`)
}