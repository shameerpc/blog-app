
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
            const { title, content, status } = req.body;

                // Create a new blog post
                const newBlog = new Blog({
                    title,
                    content,
                    author:req.user._id,  
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
    updateBlog: async(req,res)=>{
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, content, status } = req.body;
            const blogId=req.params.id
            const blog = await Blog.findById(blogId);
            if (!blog) {
                return res.status(404).json({ message: 'Blog post not found' });
            }
            blog.title = title || blog.title;
            blog.content = content || blog.content;
            blog.status = status !== undefined ? status : blog.status;
            await blog.save();

            res.status(200).json({ message: 'Blog post updated successfully', blog });

        } catch (error) {
            console.error('Error updating blog post:', error);
        res.status(500).json({
            message: 'Server error. Could not update blog post.',
            error: error.message,
        });
    
        }
    }

}

export default blogcontroller