const Storage = require('../models/Storage')

exports.getStorages = async (req, res) => {
    const storages = await Storage.find({})

    res.status(200).send(storages)
}

exports.getStorageById = async (req, res) => {
    const { storageid } = req.body  

    const storage = await Storage.findOne({_id: storageid})
    if (!storage) res.status(404).send("No storage with that id found")
    
    res.status(200).send(storage)
}




exports.createStorage = async (req, res) => {
    const { name, number, volume, floorspace, priceperday, status} = req.body  
    try{
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



        console.log("Saved Storage");
        console.log(savedStorage);
        res.status(200).json({
            ...savedStorage
        })
    } catch (e){
        res.status(400).json({ error: e.message })
    }
}
exports.updateStorage = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    const storage = await Storage.findOneAndUpdate({ _id: id }, req.body)
    console.log(storage);
    if (!storage) res.status(404).send("No storage with that id found")

    const updatedStorage = await Storage.findOne({ _id: id })

    res.status(200).json({
        ...updatedStorage
    })
}





exports.deleteStorage = async (req, res) => {
    const { id } = req.params;

    const storage = await Storage.findOneAndDelete({ _id: id })

    if (!storage) res.status(404).send("No storage with that id found")

    res.status(200).send(`Successfully deleted the following storage: \n ${storage}`)
}