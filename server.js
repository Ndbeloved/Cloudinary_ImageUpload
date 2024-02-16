require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000


const ImageUploader = require('./Configs/cloudinary')



app.use(express.json())

app.post('/upload', async(req, res)=>{

})

app.listen(PORT, ()=>{
    console.log('Server listening on http://localhost:',PORT)
})