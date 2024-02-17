const cloudinary = require('cloudinary').v2
const multer = require('multer')
const urls = []

module.exports = async function UploadImage(imagePath){
    //configuring with api credentials
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })

    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(imagePath, { use_filename: true }, (err, result) => {
                if (err) {
                    console.error("Error uploading file:", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}