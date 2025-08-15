import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ContactPage from './pages/Contact.tsx'
import CoursesPage from './pages/Courses.tsx'
import CoursePage from './pages/Course.tsx'
import AboutPage from './pages/About.tsx'
import PricingPage from './pages/Pricing.tsx'
import BlogPage from './pages/Blog.tsx'
import PostPage from './pages/Post.tsx'
import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <Layout><App /></Layout> },
  { path: '/contact', element: <Layout><ContactPage /></Layout> },
  { path: '/courses', element: <Layout><CoursesPage /></Layout> },
  { path: '/course/:courseId', element: <Layout><CoursePage /></Layout> },
  { path: '/about', element: <Layout><AboutPage /></Layout> },
  { path: '/pricing', element: <Layout><PricingPage /></Layout> },
  { path: '/blog', element: <Layout><BlogPage /></Layout> },
  { path: '/blog/:slug', element: <Layout><PostPage /></Layout> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
