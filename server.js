require('dotenv').config()
const multer = require('multer')
const express = require('express')
const app = express()
const PORT = 3000


const ImageUploader = require('./Configs/cloudinary')

app.use(express.json())


//setting multer for image upload
const upload = multer({storage: multer.memoryStorage()})

app.post('/upload', upload.array('images'),async(req, res)=>{
    try{
        const urls = ImageUploader(req.files)
        res.status(200).json({urls})
    }
    catch(err){
        console.log('error trying to upload: ', err)
        res.status(500).json({"message": "error trying to upload"})
    }
})

app.listen(PORT, ()=>{
    console.log('Server listening on http://localhost:',PORT)
})