import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Building2,
  TrendingUp,
  Settings,
  Sparkles,
  BarChart3,
  MapPin,
  Calendar,
  Laptop,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/courses', icon: BookOpen },
    { name: 'Blog Posts', href: '/blogs', icon: BookOpen },
    { name: 'Team Members', href: '/team-members', icon: Users },
    { name: 'Mentors', href: '/mentors', icon: Users },
    { name: 'FAQs', href: '/faqs', icon: HelpCircle },
    { name: 'Company Info', href: '/company-info', icon: Building2 },
    { name: 'Upcoming Skills', href: '/upcoming-skills', icon: TrendingUp },
    { name: 'Values', href: '/values', icon: Sparkles },
    { name: 'Statistics', href: '/stats', icon: BarChart3 },
    { name: 'Milestones', href: '/milestones', icon: Calendar },
    { name: 'Contact Data', href: '/contact-data', icon: MapPin },
    { name: 'User Management', href: '/users', icon: Settings },
  ];

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : ''}`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="sidebar-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">EdTech Admin</h1>
              <p className="text-xs text-gray-500">Management Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => {
                  // Close mobile sidebar when navigating
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p className="font-medium">EdTech Admin Panel</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
