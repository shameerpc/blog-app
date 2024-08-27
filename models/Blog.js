import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Blog schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['published', 'draft'],
        default: 'draft',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to update the `updatedAt` field before saving
blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});


const Blog = mongoose.model('Blog', blogSchema);

export default Blog;