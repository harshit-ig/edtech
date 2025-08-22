import mongoose, { Schema, Document } from 'mongoose';
import { CourseIcons, IconCategories, GeoJsonCollection } from '../types';

// Course Icons Schema - Store as key-value pairs
const CourseIconsSchema = new Schema<CourseIcons & Document>({
  iconName: { type: String, required: true, unique: true },
  iconPath: { type: String, required: true }
}, { timestamps: true });

// Icon Categories Schema
const IconCategoriesSchema = new Schema<{ category: string; icons: string[] } & Document>({
  category: { type: String, required: true, unique: true },
  icons: [{ type: String, required: true }]
}, { timestamps: true });

// GeoJSON Schema - Store the complete world.geojson data
const GeoDataSchema = new Schema<GeoJsonCollection & Document>({
  type: { type: String, required: true, default: 'FeatureCollection' },
  features: [{
    type: { type: String, required: true, default: 'Feature' },
    properties: {
      name: { type: String, required: true }
    },
    geometry: {
      type: { type: String, required: true },
      coordinates: { type: Schema.Types.Mixed, required: true }
    },
    id: { type: String, required: true }
  }]
}, { timestamps: true });

// Highlighted Countries Schema
const HighlightedCountriesSchema = new Schema<{ countries: string[] } & Document>({
  countries: [{ type: String, required: true }]
}, { timestamps: true });

// Create and export models
export const CourseIconModel = mongoose.model<{ iconName: string; iconPath: string } & Document>('CourseIcon', CourseIconsSchema);
export const IconCategoryModel = mongoose.model<{ category: string; icons: string[] } & Document>('IconCategory', IconCategoriesSchema);
export const GeoDataModel = mongoose.model<GeoJsonCollection & Document>('GeoData', GeoDataSchema);
export const HighlightedCountriesModel = mongoose.model<{ countries: string[] } & Document>('HighlightedCountries', HighlightedCountriesSchema);
