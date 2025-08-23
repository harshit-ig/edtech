# Database Migration & Seeding Scripts

This directory contains scripts for managing database migrations and seeding.

## Scripts Overview

### `migrate.ts` - Comprehensive Data Migration
**Purpose**: Migrates all application data to the database in a single operation.

**What it does**:
- Clears all existing data from all collections
- Migrates company information, team members, values, stats, milestones
- Migrates contact data, upcoming skills, courses, FAQs, and course icons
- Migrates blog posts, testimonials, mentors, advantage stats, and course pricing
- Provides detailed logging and summary of migrated records

**Usage**:
```bash
npm run migrate
# or
npx ts-node src/scripts/migrate.ts
```

### `seed.ts` - Complete Database Seeding
**Purpose**: Sets up a complete database with admin user and all application data.

**What it does**:
- Creates an admin user (if it doesn't exist)
- Runs the comprehensive migration to populate all data
- Provides a one-stop solution for initial database setup

**Usage**:
```bash
npm run seed
# or
npx ts-node src/scripts/seed.ts
```

## Environment Variables

The scripts use the following environment variables:

- `ADMIN_EMAIL` - Admin user email (default: admin@edtech.com)
- `ADMIN_PASSWORD` - Admin user password (default: admin123456)
- `ADMIN_NAME` - Admin user name (default: Admin User)

## Why One Migration Script?

Previously, there were two separate migration scripts (`migrate.ts` and `fullMigrate.ts`), which was unnecessarily complex. The consolidated approach provides:

1. **Simpler maintenance** - One script to update instead of two
2. **Better data consistency** - All data migrated in one transaction
3. **Clearer purpose** - One script that does everything
4. **Easier debugging** - Single point of failure/control

## Data Categories Migrated

- **Company Data**: Info, team members, values, stats, milestones, contact info
- **Content Data**: Courses, FAQs, blog posts, testimonials
- **User Data**: Mentors, advantage statistics
- **Pricing Data**: Course pricing information
- **Assets**: Course icons and other static data

## Running in Production

For production deployments, you can run:

```bash
# For initial setup
npm run seed

# For data updates only (without admin user creation)
npm run migrate
```

## Notes

- The migration script clears all existing data before inserting new data
- Admin user creation is idempotent (won't create duplicates)
- All scripts include comprehensive error handling and logging
- Database connection is automatically managed
