const mongoose = require('mongoose')
require('dotenv').config()
const uri = "mongodb+srv://ashik-95:8fGlNTppPM2lU4pH@cluster0.astwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const MongDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongDB")

    } catch (error) {
        console.log("connection failed")
        process.exit(1)
    }
}

module.exports = MongDB