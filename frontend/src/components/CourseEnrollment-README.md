# Course Enrollment System

This system allows users to apply for courses with detailed tracking of which course they're interested in.

## Components Created

### 1. CourseEnrollmentModal
A modal specifically for course applications that captures:
- User details (name, email, phone)
- Course information (ID, name, category)
- Source tracking (where the application came from)

### 2. CourseEnrollmentModalContext
Context provider to manage the course enrollment modal state globally.

### 3. API Enhancement
Added `submitCourseEnrollment` API function that will send to `/api/course-enrollment` endpoint.

## Usage in Components

### Import the Hook
```tsx
import { useCourseEnrollmentModal } from "../contexts/CourseEnrollmentModalContext";
```

### Use in Component
```tsx
export default function SomeComponent() {
  const { openModal } = useCourseEnrollmentModal();

  const handleApplyNow = (courseId: string, courseName: string, courseCategory?: string, source?: string) => {
    openModal(courseId, courseName, courseCategory, source);
  };

  return (
    <button onClick={() => handleApplyNow('data-analytics', 'Data Analytics Course', 'DATA ANALYTICS', 'course-page')}>
      Apply Now
    </button>
  );
}
```

### Source Tracking Examples
- `'home-featured-courses'` - From home page featured courses
- `'courses-page'` - From courses listing page
- `'course-details'` - From individual course detail page
- `'limited-offer'` - From limited time offer sections
- `'navbar'` - From navigation bar
- `'footer'` - From footer links

## API Data Structure

When a user applies, the following data is sent to the backend:

```typescript
{
  fullName: "John Doe",
  email: "john@example.com", 
  phone: "+1234567890",
  courseId: "data-analytics",
  courseName: "10x Data Analyst and AI Complete Certification with Microsoft",
  courseCategory: "DATA ANALYTICS",
  source: "home-featured-courses"
}
```

## Components to Update

You can now update these components to use the course enrollment modal:

1. **Home Page** - Featured courses "Apply Now" buttons ✅ (Already done)
2. **Courses Page** - All course "Apply Now" buttons
3. **Course Detail Page** - Main "Apply Now" and "Limited Time Offer" buttons
4. **Navbar** - Any course-related CTAs
5. **Footer** - Course enrollment links
6. **Any promotional sections** - Special offer buttons

## Example Implementations

### For Course Detail Page
```tsx
const { openModal } = useCourseEnrollmentModal();

// Main apply button
<button onClick={() => openModal(course.id, course.title, course.category, 'course-details')}>
  Apply Now
</button>

// Limited offer button  
<button onClick={() => openModal(course.id, course.title, course.category, 'limited-offer')}>
  Claim Limited Offer
</button>
```

### For Courses Listing Page
```tsx
const { openModal } = useCourseEnrollmentModal();

{courses.map(course => (
  <button onClick={() => openModal(course.id, course.title, course.category, 'courses-page')}>
    Apply Now
  </button>
))}
```

This system provides detailed tracking of user interest and allows the backend to handle course enrollments with full context about which course and where the user came from.
