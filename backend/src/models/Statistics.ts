import mongoose, { Schema, Document } from 'mongoose';
import { AdvantageStat, Testimonial } from '../types';

// Advantage Stats Schema
const AdvantageStatSchema = new Schema<AdvantageStat & Document>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
  dots: { type: Number, required: true },
  accent: { 
    type: String, 
    required: true,
    enum: ['blue', 'orange', 'green']
  }
}, { timestamps: true });

// Testimonial Schema
const TestimonialSchema = new Schema<Testimonial & Document>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  category: { type: String, required: true },
  accent: { 
    type: String, 
    required: true,
    enum: ['blue', 'orange', 'green', 'red']
  }
}, { timestamps: true });

// Create and export models
export const AdvantageStatModel = mongoose.model<AdvantageStat & Document>('AdvantageStat', AdvantageStatSchema);
export const TestimonialModel = mongoose.model<Testimonial & Document>('Testimonial', TestimonialSchema);
