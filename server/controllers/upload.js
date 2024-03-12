const multer = require('multer')
const fs = require('fs')
const path = require('path')
const uploadDeviceRouter = require('express').Router()


const photosMiddleware = multer({dest:'uploads/'})
uploadDeviceRouter.post('/', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = []
    
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        const newPath = path + '.' + ext
        
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
        console.log(uploadedFiles);
    }
    res.json(uploadedFiles)
})

module.exports = uploadDeviceRouter