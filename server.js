require('dotenv').config()
const multer = require('multer')
const express = require('express')
const app = express()
const PORT = 3000


const ImageUploader = require('./Configs/cloudinary')

app.use(express.json())

const storage = multer.diskStorage({
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

//setting multer for image upload
const upload = multer({storage: storage})

app.post('/upload', upload.array('images'), async(req, res)=>{
    try{
        const urls = []
        const files = req.files
        const uploadedFiles = files.map(async(file)=>{
            const imageUrl = await ImageUploader(file.path)
            urls.push(imageUrl)
        })

        await Promise.all(uploadedFiles)
        console.log(urls)
        res.status(200).json({urls: urls})
    }
    catch(err){
        console.log('error trying to upload: ', err)
        res.status(500).json({"message": "error trying to upload"})
    }
})

app.listen(PORT, ()=>{
    console.log('Server listening on http://localhost:',PORT)
})