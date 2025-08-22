# EdTech Backend API

MongoDB-powered REST API for the EdTech platform, serving all course, blog, company, and user data.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/edtech

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run migrate` - Run basic data migration
- `npm run seed` - Run complete database seeding

## 📊 API Endpoints

### Company & About Data
```
GET /api/company/info          - Company information
GET /api/company/team          - Team members
GET /api/company/values        - Company values
GET /api/company/stats         - About statistics
GET /api/company/milestones    - Company milestones
GET /api/company/contact       - Contact information
GET /api/company/skills        - Upcoming skills
GET /api/company/about         - Complete about data
```

### Courses
```
GET /api/courses               - All courses
GET /api/courses/featured      - Featured courses
GET /api/courses/:id           - Course by ID
GET /api/courses/:id/details   - Course details
GET /api/courses/pricing/all   - All course pricing
GET /api/courses/pricing/:id   - Course pricing by ID
```

### Blog
```
GET /api/blog                  - All blog posts
GET /api/blog/featured         - Featured posts
GET /api/blog/categories       - Blog categories
GET /api/blog/id/:id          - Post by ID
GET /api/blog/slug/:slug      - Post by slug
GET /api/blog/slug/:slug/related - Related posts
GET /api/blog/category/:category - Posts by category
```

### Other Data
```
GET /api/faqs                  - FAQ data
GET /api/mentors               - Mentor profiles
GET /api/mentors/features      - Mentor features
GET /api/mentors/companies     - Partner companies
GET /api/mentors/all           - Complete mentor data
GET /api/stats                 - Advantage statistics
GET /api/testimonials          - Student testimonials
GET /api/icons                 - Course icons
GET /api/icons/categories      - Icon categories
GET /api/icons/:iconName       - Icon by name
GET /api/icons/all             - Complete icons data
GET /api/geo                   - Geographic data for globe
GET /api/health                - Health check
```

## 🏗️ Architecture

### Tech Stack
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, Rate limiting
- **Performance**: Compression, optimized queries

### Project Structure
```
src/
├── controllers/     # Request handlers
├── models/         # MongoDB schemas
├── routes/         # API route definitions
├── middleware/     # Custom middleware
├── scripts/        # Migration & seeding scripts
├── types/          # TypeScript type definitions
├── utils/          # Database connection & utilities
└── server.ts       # Main application entry
```

### Data Models
- **Company**: Info, team, values, stats, milestones
- **Courses**: Listings, details, pricing
- **Blog**: Posts, categories, authors
- **Users**: Mentors, testimonials
- **Assets**: Icons, geographic data

## 🔒 Environment Variables

Required environment variables (create `.env` from `.env.example`):

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/edtech

# Server
PORT=8000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📦 Database Migration

The migration scripts transfer all data from the frontend's static files to MongoDB:

```bash
# Run basic migration (company, courses, FAQs)
npm run migrate

# Run comprehensive migration (blog, testimonials, etc.)
npm run seed
```

### Migration includes:
- ✅ Company information & team
- ✅ Course listings & details  
- ✅ Blog posts & categories
- ✅ Testimonials & mentors
- ✅ FAQ data
- ✅ Icons & assets
- ✅ Geographic data

## 🚦 Development

### Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or install locally and start
mongod
```

### Development Workflow
1. Start MongoDB
2. Run `npm run seed` to populate data
3. Run `npm run dev` for development
4. API available at `http://localhost:8000/api`

### Testing Endpoints
```bash
# Health check
curl http://localhost:8000/api/health

# Get all courses
curl http://localhost:8000/api/courses

# Get company info
curl http://localhost:8000/api/company/info
```

## 🔧 Production Deployment

### Build & Start
```bash
npm run build
npm start
```

### Environment Setup
- Set `NODE_ENV=production`
- Configure production MongoDB URI
- Set appropriate CORS origins
- Configure rate limiting for production load

### Performance Considerations
- MongoDB indexing on frequently queried fields
- Compression middleware for response optimization
- Rate limiting to prevent abuse
- Caching strategies for static data

## 🤝 Frontend Integration

The backend is designed to be a drop-in replacement for the frontend's static data files. All TypeScript interfaces remain identical, ensuring zero breaking changes to the frontend components.

Update the frontend's `src/api/index.ts` to point to these endpoints instead of importing static files.
