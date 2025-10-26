# Project Structure - Next.js 16

This document outlines the folder structure and organization of the Smart Library Management System web dashboard.

## Directory Structure

```
web-dashboard/
├── app/                          # Next.js 16 App Router
│   ├── api/                     # API routes
│   │   └── health/             # Health check endpoint
│   ├── alerts/                  # Alerts page
│   ├── books/                   # Books page
│   ├── students/                # Students page
│   ├── transactions/            # Transactions page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage/Dashboard
│   └── globals.css             # Global styles
│
├── components/                   # Reusable React components
│   ├── Navigation.tsx          # Navigation component
│   ├── RecentActivity.tsx      # Recent activity component
│   └── StatCard.tsx            # Statistics card component
│
├── hooks/                        # Custom React hooks
│   ├── useStats.ts             # Hook for fetching stats
│   ├── useStudents.ts          # Hook for fetching students
│   ├── useBooks.ts             # Hook for fetching books
│   ├── useTransactions.ts      # Hook for fetching transactions
│   └── index.ts                # Barrel export
│
├── lib/                          # Library/utility modules
│   └── services/               # Service layer
│       └── firebase.service.ts # Firebase database operations
│
├── types/                        # TypeScript type definitions
│   └── index.ts                # All type definitions
│
├── utils/                        # Utility functions
│   ├── date.ts                 # Date formatting utilities
│   └── index.ts                # Barrel export
│
├── constants/                    # Application constants
│   └── index.ts                # App-wide constants
│
├── config/                       # Configuration files
│   └── firebase.ts             # Firebase configuration
│
├── public/                       # Static assets
│   ├── images/                 # Image files
│   └── icons/                  # Icon files
│
├── .claude/                      # Claude Code settings
├── node_modules/                 # Dependencies (not in git)
├── .next/                        # Next.js build output (not in git)
├── package.json                  # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── next.config.js               # Next.js configuration (if exists)
└── README.md                     # Project documentation
```

## Folder Descriptions

### `/app` - Application Routes
Contains all pages and routes using Next.js 16 App Router with React Server Components.
- Each folder represents a route
- `page.tsx` files are the actual pages
- `layout.tsx` defines layouts
- `api/` folder contains API routes

### `/components` - UI Components
Reusable React components used across the application.
- Keep components pure and focused
- Use TypeScript for type safety
- Follow naming convention: PascalCase

### `/hooks` - Custom Hooks
Custom React hooks for data fetching and state management.
- Prefix with `use` (e.g., `useStats`)
- Keep hooks focused on single responsibility
- Export from index.ts for clean imports

### `/lib` - Libraries and Services
Business logic and external service integrations.
- `/services/` - Service layer for API/database operations
- Keep Firebase logic separate from components

### `/types` - Type Definitions
TypeScript interfaces and types.
- Centralized type definitions
- Shared across the application
- Exported from index.ts

### `/utils` - Utility Functions
Helper functions and utilities.
- Pure functions without side effects
- Organized by domain (date, string, etc.)

### `/constants` - Constants
Application-wide constants and configuration values.
- Transaction types
- Color schemes
- Routes
- Static values

### `/config` - Configuration
Configuration files for external services.
- Firebase configuration
- Environment-specific settings

### `/public` - Static Assets
Static files served directly.
- Images, icons, fonts
- Accessible via `/` URL path

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
@/app/*           → ./app/*
@/components/*    → ./components/*
@/hooks           → ./hooks
@/lib/*           → ./lib/*
@/types           → ./types
@/utils           → ./utils
@/constants       → ./constants
@/config/*        → ./config/*
```

### Usage Examples

```typescript
// Instead of: import { useStats } from '../../hooks/useStats'
import { useStats } from '@/hooks';

// Instead of: import { Student } from '../../lib/types'
import { Student } from '@/types';

// Instead of: import { formatDate } from '../../utils/date'
import { formatDate } from '@/utils';
```

## Best Practices

### Component Organization
```typescript
// 1. Imports
import { useState } from 'react';
import { useStats } from '@/hooks';
import { Button } from '@/components/Button';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export function MyComponent({ title }: Props) {
  // 4. Hooks
  const { stats } = useStats();

  // 5. Event handlers
  const handleClick = () => {};

  // 6. Render
  return <div>{title}</div>;
}
```

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `StatCard.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useStats.ts`)
- Utils: `camelCase.ts` (e.g., `date.ts`)
- Types: `index.ts` or `types.ts`
- Constants: `index.ts` or `constants.ts`

### Import Order
1. External libraries (React, Next.js, etc.)
2. Internal aliases (@/hooks, @/types, etc.)
3. Relative imports
4. CSS/Style imports

## Adding New Features

### Adding a New Page
1. Create folder in `/app` (e.g., `/app/reports`)
2. Add `page.tsx` file
3. Add route to `/constants/index.ts` if needed

### Adding a New Hook
1. Create file in `/hooks` (e.g., `useReports.ts`)
2. Export from `/hooks/index.ts`
3. Follow existing hook patterns

### Adding a New Service
1. Create file in `/lib/services` (e.g., `reports.service.ts`)
2. Use Firebase config from `@/config/firebase`
3. Export functions for use in hooks

### Adding New Types
1. Add to `/types/index.ts`
2. Export interface/type
3. Use across application

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Technology Stack

- **Framework**: Next.js 16 (with App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Database**: Firebase Realtime Database
- **Icons**: Lucide React
- **Node.js**: v20.19.5
- **Package Manager**: npm 10.8.2

## Migration Notes

This structure follows Next.js 16 best practices:
- ✅ App Router (not Pages Router)
- ✅ React Server Components by default
- ✅ Client Components marked with 'use client'
- ✅ Organized folder structure
- ✅ Custom hooks for data fetching
- ✅ Path aliases for clean imports
- ✅ Separated concerns (UI, logic, data)

## Further Reading

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
