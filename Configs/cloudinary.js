const cloudinary = require('cloudinary').v2
const multer = require('multer')
const {Readable} = require('stream')

module.exports = async function UploadImage(imagePaths){
    //configuring with api credentials
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })

    

    //converting to readable streams
    const bufferToStream = (buffer)=>{
        const stream = new Readable()
        stream.push(buffer)
        stream.push(null)   //this indicates to the consumer of the stream that theres no more data to read 
        return stream
    }


    try{
        const uploadPromise = imagePaths.map(async(image)=>{
            // const stream = bufferToStream(image.buffer)
            const stream = image.buffer
            const result = await cloudinary.uploader.upload(stream, {resource_type: 'auto'})
            return result.secure_url
        })

        const urls = await Promise.all(uploadPromise)
        return urls
    }
    catch(err){
        console.log('Error uploading image: ', err)
    }
}