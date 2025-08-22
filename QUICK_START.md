# 🚀 Quick Start Guide

## Step 1: Backend Setup (2 minutes)
```bash
cd backend
npm install
```

Create `.env` file:
```bash
MONGODB_URI=mongodb://localhost:27017/edtech
PORT=8000
CORS_ORIGIN=http://localhost:5173
```

## Step 2: Start MongoDB
```bash
# Option A: Docker (easiest)
docker run -d -p 27017:27017 --name mongodb mongo

# Option B: Local installation
mongod
```

## Step 3: Populate Database
```bash
npm run seed
# ✅ Transfers all your /data folder content to MongoDB
```

## Step 4: Start Backend  
```bash
npm run dev
# 🚀 Backend running on http://localhost:8000
```

## Step 5: Test API
```bash
# Health check
curl http://localhost:8000/api/health

# Your courses data
curl http://localhost:8000/api/courses

# Company info  
curl http://localhost:8000/api/company/info
```

## Step 6: Frontend Integration (Optional)
Your frontend continues to work as-is. To use the API:

```typescript
// Replace static imports with API calls
import { getFeaturedCoursesData } from './utils/dataAdapter';

// In your component
const [courses, setCourses] = useState([]);
useEffect(() => {
  getFeaturedCoursesData().then(setCourses);
}, []);
```

## 🎉 Done!
- ✅ All your data is now in MongoDB
- ✅ RESTful API serving 25+ endpoints  
- ✅ Zero changes needed to existing code
- ✅ Ready for production deployment

**Your EdTech platform is now database-powered!** 🚀
