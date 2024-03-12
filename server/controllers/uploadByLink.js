const imageDownloader = require('image-downloader')
const path = require('path')
const uploadLinkRouter = require('express').Router()

uploadLinkRouter.post('/', async (req, res) => {
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    const destPath = path.join(__dirname, '../uploads', newName)
    
    await imageDownloader.image({
        url: link,
        dest: destPath,
    })
  res.json(newName)
})

module.exports = uploadLinkRouter