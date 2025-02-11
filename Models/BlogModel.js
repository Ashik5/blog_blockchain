const mongoose = require('mongoose')

const { Schema } = mongoose

const BlogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    // contentHash: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
    isApproved:{type:Boolean,default:false},
})

module.exports = mongoose.model('blogs', BlogSchema)