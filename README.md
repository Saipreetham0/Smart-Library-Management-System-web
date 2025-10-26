# Smart Library Management Dashboard

A modern Next.js web application with real-time Firebase integration for the Smart Library Management System using ESP32.

## Features

- **Real-time Dashboard**: Live statistics and monitoring
- **Student Management**: Add, edit, and track students with RFID cards
- **Book Management**: Manage book inventory with NFC tags
- **Transaction History**: View all check-ins, check-outs, borrows, and returns
- **Noise Alerts**: Monitor library noise levels and alerts
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Firebase Integration**: Real-time data synchronization with ESP32 device

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Runtime**: React 19
- **Styling**: Tailwind CSS 3.4
- **Database**: Firebase Realtime Database
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Firebase account and project (same one used by ESP32)
- Firebase Realtime Database enabled

## Installation

1. **Navigate to the dashboard directory**:
   ```bash
   cd web-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure Firebase**:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```

   - Update `.env.local` with your Firebase credentials:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

   > **Note**: These should match the Firebase credentials in your ESP32 `main.cpp` file.

## Getting Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (smart-library-using-esp32)
3. Click the gear icon → Project Settings
4. Scroll down to "Your apps" section
5. If you don't have a web app, click "Add app" and select Web
6. Copy the config values to your `.env.local` file

## Development

Start the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## Project Structure

```
web-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Dashboard home page
│   │   ├── students/          # Students management page
│   │   ├── books/             # Books management page
│   │   ├── transactions/      # Transaction history page
│   │   ├── alerts/            # Noise alerts page
│   │   ├── layout.tsx         # Root layout with navigation
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and services
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── config/                # Configuration files
│   └── constants/             # Constants
├── public/                # Static assets
└── package.json           # Dependencies
```

## Firebase Database Structure

The dashboard expects the following Firebase Realtime Database structure:

```json
{
  "students": {
    "S001": {
      "name": "Student Name",
      "rfidCard": "13E31EA8",
      "isCheckedIn": false,
      "booksBorrowed": 0,
      "lastCheckIn": "2025-01-15 10:30:00"
    }
  },
  "books": {
    "B001": {
      "title": "Book Title",
      "author": "Author Name",
      "nfcTag": "E7D2B865",
      "shelf": "A1",
      "isAvailable": true,
      "borrowedBy": ""
    }
  },
  "transactions": {
    "1234567890": {
      "type": "CHECK_IN",
      "studentId": "S001",
      "studentName": "Student Name",
      "timestamp": "2025-01-15 10:30:00"
    }
  },
  "stats": {
    "totalStudents": 3,
    "totalBooks": 2,
    "peopleCount": 5,
    "totalTransactions": 10,
    "lastSync": "2025-01-15 10:30:00"
  },
  "alerts": {
    "noise": {
      "1234567890": 750
    }
  }
}
```

## Features Overview

### Dashboard
- Real-time statistics (students, books, occupancy, transactions)
- Book availability status
- Student check-in status
- Recent activity feed

### Students Management
- View all registered students
- Add new students with RFID card UIDs
- Edit student information
- Delete students
- Search and filter functionality
- Check-in/check-out status tracking

### Books Management
- View all books in inventory
- Add new books with NFC tag UIDs
- Edit book information
- Delete books
- Track availability status
- See who borrowed each book

### Transactions
- View complete transaction history
- Filter by transaction type (check-in, check-out, borrow, return)
- Search by student or book
- Transaction statistics

### Alerts & Monitoring
- View noise level alerts
- Monitor current library occupancy
- Alert severity levels
- Historical alert data

## Deployment

This Next.js application can be deployed to various platforms:

### Vercel
1. Push your code to GitHub
2. Import repository at [Vercel](https://vercel.com)
3. Add environment variables from `.env.example`
4. Deploy

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Docker (Self-hosted)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms
- AWS Amplify
- Google Cloud Run
- DigitalOcean App Platform

## Troubleshooting

### Firebase Connection Issues

If you see "Loading..." indefinitely:
1. Verify Firebase credentials in `.env.local`
2. Ensure Firebase Realtime Database is enabled
3. Check database rules allow read/write access
4. Verify the ESP32 is writing data to Firebase
5. Check browser console for errors

### Database Security Rules

For development:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

For production, implement proper security:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### No Data Showing

1. Ensure ESP32 is connected and running
2. Verify data is being written in Firebase Console
3. Check database URL matches in both ESP32 and web app
4. Inspect browser console for errors

## ESP32 Integration

This dashboard works with the ESP32 Smart Library Management System. Make sure:

1. ESP32 is connected to WiFi
2. Firebase credentials match in both systems
3. ESP32 is successfully writing to Firebase
4. Database structure matches expected format

## Customization

### Change Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

### Add New Features

1. Create new page in `app/` directory
2. Add route to `Navigation.tsx`
3. Create necessary components
4. Add Firebase service functions in `lib/firebaseService.ts`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own smart library system.

## Next Steps

After setup:
1. Run your ESP32 device
2. Start the web dashboard
3. Scan RFID/NFC cards with ESP32
4. Watch real-time updates on the dashboard
5. Manage students and books through the web interface

Happy managing your smart library!
