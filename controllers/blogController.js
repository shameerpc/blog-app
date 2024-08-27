
import User from '../models/user.js'
import { validationResult } from 'express-validator';
import Blog from '../models/blog.js'
import 'dotenv/config'

const blogcontroller={
    createBlog: async(req,res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, content, author, status } = req.body;

                // Create a new blog post
                const newBlog = new Blog({
                    title,
                    content,
                    author,  // Assuming the author ID is sent in the request body
                    status
                });
        
                // Save the blog post to the database
                await newBlog.save();
        
                res.status(201).json({
                    message: 'Blog post created successfully',
                    blog: newBlog
                });
        } catch (error) {
            console.error('Error creating blog post:', error);
        res.status(500).json({
            message: 'Server error. Could not create blog post.'
        });
        }
    },

}

export default blogcontroller