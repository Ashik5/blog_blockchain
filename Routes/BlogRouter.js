const express = require('express')
const router = express.Router()
const Blog = require('../Models/BlogModel')



router.post("/createBlog", async (req, res) => {
    try {
        const { title, author, description } = req.body; // Include contentHash

        if (!title || !author || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required, including contentHash",
            });
        }

        // Create and save the new blog
        const blog = await new Blog({
            title,
            author,
            description,
        }).save();

        res.json({ success: true, message: "Blog Created Successfully", blog });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
});


router.get("/getBlogs", async (req, res) => {
    try {
        const blogs = await Blog.find({ isApproved: true });
        res.json({ success: true, blogs })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
});
router.get("/getAdminBlogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ success: true, blogs })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
});

module.exports = router