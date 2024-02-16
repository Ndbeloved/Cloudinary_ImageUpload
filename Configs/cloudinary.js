const cloudinary = require('cloudinary').v2

//configuring with api credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

module.exports = async function UploadImage(imagePath){
    try{
        const result = await cloudinary.uploader.upload(imagePath)
        return result.secure_url
    }
    catch(err){
        console.log('Error uploading image: ', err)
        res.status(500).json({"message": "Error uploading image"})
    }
}