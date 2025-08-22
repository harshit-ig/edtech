import mongoose, { Schema, Document } from 'mongoose';
import { BlogPost } from '../types';

// Blog Post Schema
const BlogPostSchema = new Schema<BlogPost & Document>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  publishedAt: { type: String, required: true },
  readTime: { type: Number, required: true },
  featured: { type: Boolean, required: true },
  image: { type: String, required: true }
}, { 
  timestamps: true,
  // Add indexes for better query performance
  index: { slug: 1, category: 1, featured: 1, publishedAt: 1 }
});

// Create and export model
export const BlogPostModel = mongoose.model<BlogPost & Document>('BlogPost', BlogPostSchema);
