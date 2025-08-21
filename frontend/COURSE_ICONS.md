# Course Icon Management Guide

## Overview
The course icon system has been redesigned to be scalable and maintainable. Instead of hardcoding icons in components, we now use a centralized icon library.

## How to Add a New Course with an Icon

### 1. Choose an Icon
Browse the available icons in `/src/data/icons.ts`:

**Available Icons:**
- `bar-chart` - Perfect for data analytics courses
- `star-sparkle` - Great for AI/ML courses  
- `robot` - Ideal for automation/agentic AI
- `brain` - Good for machine learning
- `lightning` - General tech/fast courses
- `code` - For programming courses
- `globe` - For web development
- `trending-up` - For business/marketing
- `target` - For goal-oriented courses
- `cog` - For technical/engineering courses

### 2. Add the Course
In `/src/data/courses.ts`, add your new course:

```typescript
{
  id: 'your-course-id',
  category: 'YOUR CATEGORY',
  badge: 'NEW',
  title: 'Your Course Title',
  desc: 'Course description...',
  duration: '3 Months',
  extra: 'Bonus Features',
  accent: 'edtech-green', // or 'edtech-orange' or 'edtech-red'
  iconName: 'bar-chart', // Choose from available icons
}
```

### 3. Add New Icons (If Needed)
If you need a new icon, add it to `/src/data/icons.ts`:

```typescript
export const COURSE_ICONS = {
  // ... existing icons
  'your-new-icon': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', // Your SVG path
};
```

**Finding SVG Paths:**
- Use [Heroicons](https://heroicons.com/) - copy the path from SVG
- Use [Tabler Icons](https://tabler-icons.io/) - get SVG paths
- Use [Lucide Icons](https://lucide.dev/) - modern icon library
- Create custom paths with design tools

### 4. Icon Categories
Update the categories in `/src/data/icons.ts` if adding a new type:

```typescript
export const ICON_CATEGORIES = {
  // ... existing categories
  'your-category': ['icon1', 'icon2', 'icon3'],
};
```

## Benefits of This System

✅ **Scalable**: Easy to add new courses and icons
✅ **Maintainable**: All icons in one place
✅ **Type-safe**: TypeScript ensures icon names exist
✅ **Fallback**: Automatic fallback to default icon
✅ **Organized**: Icons grouped by category
✅ **Reusable**: Same icon can be used for multiple courses

## Example: Adding a "Web Development" Course

```typescript
// 1. Add to courses.ts
{
  id: 'web-dev-bootcamp',
  category: 'WEB DEVELOPMENT',
  badge: 'HOT',
  title: 'Full Stack Web Development Bootcamp',
  desc: 'Master modern web development with React, Node.js, and more.',
  duration: '4 Months',
  extra: '15+ Projects',
  accent: 'edtech-blue',
  iconName: 'code', // Using existing icon
}

// 2. If you need a custom icon, add to icons.ts
'react': 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236A2.236 2.236 0 0 1 12 9.768a2.236 2.236 0 0 1 2.23 2.236zM19.25 10.856c0 .446-.092.87-.274 1.258-.18.387-.437.71-.776.97-.44.337-.974.535-1.6.592-.18.014-.36.02-.54.02-.18 0-.36-.006-.54-.02-.626-.057-1.16-.255-1.6-.592-.339-.26-.596-.583-.776-.97-.18-.388-.274-.812-.274-1.258 0-.446.092-.87.274-1.258.18-.387.437-.71.776-.97.44-.337.974-.535 1.6-.592.18-.014.36-.02.54-.02.18 0 .36.006.54.02.626.057 1.16.255 1.6.592.339.26.596.583.776.97.18.388.274.812.274 1.258z',
```

That's it! The system automatically handles the rest. 🚀
