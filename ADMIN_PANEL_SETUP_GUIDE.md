# EdTech Admin Panel Setup Guide

## Overview
A complete admin panel built with Vite, React, TypeScript, and Tailwind CSS for managing the EdTech platform's data and content.

## 🏗️ Backend Changes

### New Features Added:
1. **User Authentication System**
   - User model with admin/user roles
   - JWT-based authentication
   - Password hashing with bcrypt
   - Auth middleware for protected routes

2. **Admin CRUD Routes**
   - Complete CRUD operations for all models
   - Protected admin-only endpoints
   - Dashboard statistics API
   - User management functionality

3. **Seed Script Enhancement**
   - Creates default admin user on first run
   - Uses environment variables for admin credentials
   - Checks for existing admin before creating

### Backend Routes Added:
- `POST /api/auth/login` - Admin login
- `GET /api/auth/profile` - Get current user profile
- `GET /api/auth/users` - List all users (admin only)
- `POST /api/auth/users` - Create new user (admin only)
- `DELETE /api/auth/users/:id` - Delete user (admin only)
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET/POST/PUT/DELETE /api/admin/*` - CRUD for all models

### Environment Variables:
```env
ADMIN_EMAIL=admin@edtech.com
ADMIN_PASSWORD=admin123456
ADMIN_NAME=Admin User
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

## 🎨 Admin Panel Features

### Built-in Pages:
1. **Dashboard** - Overview with statistics and quick actions
2. **Courses Management** - CRUD for courses with search/filtering
3. **Blog Management** - Visual blog post management with cards
4. **Team Members** - Profile-based team member management
5. **User Management** - Admin user accounts management

### UI Components:
- **Login System** - Secure admin authentication
- **Responsive Layout** - Mobile-friendly sidebar and header
- **Data Tables** - Sortable, searchable tables
- **Cards Layout** - Visual content management
- **Search & Filters** - Easy content discovery
- **Loading States** - Smooth user experience
- **Error Handling** - Comprehensive error management

### Technical Features:
- **TypeScript** - Full type safety
- **React Router** - SPA navigation
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Modern, responsive styling
- **Context API** - State management
- **Protected Routes** - Role-based access control

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed  # Creates admin user and sample data
npm run dev   # Start backend server (port 8000)
```

### 2. Admin Panel Setup
```bash
cd admin-panel
npm install axios @tailwindcss/vite tailwindcss @types/node  # Install missing deps
npm run dev   # Start admin panel (port 5174)
```

### 3. Login to Admin Panel
- URL: http://localhost:5174
- Default credentials:
  - Email: admin@edtech.com
  - Password: admin123456

## 📱 Usage Guide

### Managing Courses:
1. Navigate to "Courses" from the sidebar
2. View all courses in a searchable table
3. Use search to filter by title/category
4. Click action buttons to view/edit/delete
5. Use "Add Course" for new entries

### Managing Blog Posts:
1. Go to "Blog Posts" section
2. Visual card layout shows featured images
3. Filter by title, category, or tags
4. Manage featured status and categories
5. Track read time and author information

### Team Management:
1. Access "Team Members" section
2. Profile cards with social links
3. Manage bios, roles, and contact info
4. Visual profile image management

### User Administration:
1. "User Management" for admin accounts
2. Create/delete admin users
3. View user roles and permissions
4. Cannot delete your own account (safety)

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Role-based Access** - Admin-only panel access
- **Protected Routes** - Route-level protection
- **Password Hashing** - bcrypt password security
- **Token Expiration** - Automatic session timeout
- **CORS Protection** - Cross-origin request safety

## 🎛️ Admin Panel Structure

```
admin-panel/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Login.tsx       # Authentication form
│   │   ├── Layout.tsx      # Main app layout
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── Header.tsx      # Top navigation
│   │   └── Dashboard.tsx   # Dashboard overview
│   ├── pages/              # Page components
│   │   ├── Courses.tsx     # Course management
│   │   ├── Blogs.tsx       # Blog management
│   │   ├── TeamMembers.tsx # Team management
│   │   └── Users.tsx       # User management
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── lib/                # Utilities
│   │   ├── api.ts         # API client
│   │   └── auth.ts        # Auth utilities
│   ├── types/             # TypeScript types
│   └── index.css          # Tailwind styles
```

## 🔄 API Integration

The admin panel connects to the backend via:
- **Proxy Configuration** - Vite proxy for API calls
- **Axios Interceptors** - Auto token attachment
- **Error Handling** - 401 redirect to login
- **Loading States** - UI feedback during requests

## 📊 Dashboard Features

- **Real-time Statistics** - Live data counts
- **Quick Actions** - Direct links to common tasks
- **System Status** - Health monitoring
- **Visual Indicators** - Color-coded metrics

## 🎨 Design System

Custom Tailwind theme with:
- **Admin Color Palette** - Professional blue theme
- **Component Classes** - Reusable UI patterns
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean, minimal interface

## 🚀 Next Steps

To extend the admin panel:
1. Complete placeholder pages for remaining models
2. Add form modals for create/edit operations
3. Implement file upload for images
4. Add data export functionality
5. Create detailed analytics dashboards
6. Add audit logging for admin actions

## 🔧 Development Notes

- Admin panel runs on port 5174 (different from frontend)
- Backend proxy configured for API calls
- Default admin credentials in environment variables
- Hot reload enabled for development
- TypeScript strict mode enabled

## 📝 Default Admin Credentials

**Email:** admin@edtech.com  
**Password:** admin123456  

⚠️ **Important:** Change these credentials in production by setting environment variables before running the seed script.
