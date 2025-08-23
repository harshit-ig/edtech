import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Define allowed mime types
const ALLOWED_IMAGE_MIMETYPES = [
  'image/jpeg', 
  'image/png', 
  'image/webp', 
  'image/gif'
];

// Create upload directories if they don't exist
const createUploadDirectories = () => {
  const baseDir = path.join(__dirname, '../../../uploads');
  const blogImagesDir = path.join(baseDir, 'blog-images');
  
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }
  
  if (!fs.existsSync(blogImagesDir)) {
    fs.mkdirSync(blogImagesDir, { recursive: true });
  }
  
  return { baseDir, blogImagesDir };
};

// Create directories
const { blogImagesDir } = createUploadDirectories();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store blog images in the blog-images directory
    cb(null, blogImagesDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using a timestamp and random hash
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, `blog-${uniqueSuffix}${fileExt}`);
  }
});

// Create file filter to validate uploads
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check if the file type is in our allowed list
  if (ALLOWED_IMAGE_MIMETYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type. Allowed types: ${ALLOWED_IMAGE_MIMETYPES.join(', ')}`));
  }
};

// Create the multer instance with configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  }
});

// Middleware to handle file upload errors
export const handleUploadError = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`
    });
    return;
  }
  
  if (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
    return;
  }
  
  next();
};

// Export the configured upload middleware for different purposes
export const uploadBlogImage = upload.single('image');

// For multiple file uploads (featured image + avatar)
export const uploadBlogImages = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'avatarImage', maxCount: 1 }
]);

// Helper function to get the public URL for an image
export const getImageUrl = (filename: string, req: Request): string => {
  if (!filename) return '';
  
  // If it already starts with http, assume it's an external URL
  if (filename.startsWith('http')) {
    return filename;
  }
  
  // Otherwise, construct the URL to our server's image route
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/uploads/blog-images/${filename}`;
};
