const router = require("express").Router()
const storageController = require("../controllers/storage")

router.get("/", storageController.getStorages)
router.post("/create", storageController.createStorage)
router.post("/byid", storageController.getStorageById)
router.put("/update/:id", storageController.updateStorage)
router.delete("/delete/:id", storageController.deleteStorage)

module.exports = router