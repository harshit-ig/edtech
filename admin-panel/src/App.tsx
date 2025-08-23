import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Courses from './pages/Courses';
import BlogsList from './pages/Blogs';
import TeamMembersList from './pages/TeamMembers';
import UsersList from './pages/Users';
import FAQs from './pages/FAQs';
import Mentors from './pages/Mentors';
import CompanyInfo from './pages/CompanyInfo';
import Statistics from './pages/Statistics';
import Values from './pages/Values';
import Milestones from './pages/Milestones';
import ContactData from './pages/ContactData';
import UpcomingSkills from './pages/UpcomingSkills';
import './index.css';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if authenticated)
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

// App Routes Component
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />

      {/* Protected routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="blogs" element={<BlogsList />} />
        <Route path="team-members" element={<TeamMembersList />} />
        <Route path="users" element={<UsersList />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="mentors" element={<Mentors />} />
        
        {/* Additional management pages */}
        <Route path="company-info" element={<CompanyInfo />} />
        <Route path="upcoming-skills" element={<UpcomingSkills />} />
        <Route path="values" element={<Values />} />
        <Route path="stats" element={<Statistics />} />
        <Route path="milestones" element={<Milestones />} />
        <Route path="contact-data" element={<ContactData />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;