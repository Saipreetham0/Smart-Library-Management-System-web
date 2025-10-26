/**
 * Application constants
 */

export const APP_NAME = 'Smart Library Management System';
export const APP_DESCRIPTION = 'Real-time library management dashboard with ESP32 and Firebase';

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = {
  CHECK_IN: 'CHECK_IN',
  CHECK_OUT: 'CHECK_OUT',
  BORROW: 'BORROW',
  RETURN: 'RETURN',
} as const;

/**
 * Transaction labels
 */
export const TRANSACTION_LABELS: Record<string, string> = {
  CHECK_IN: 'Checked In',
  CHECK_OUT: 'Checked Out',
  BORROW: 'Borrowed Book',
  RETURN: 'Returned Book',
};

/**
 * Color schemes for UI elements
 */
export const COLORS = {
  blue: {
    light: 'bg-blue-100',
    dark: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
  },
  green: {
    light: 'bg-green-100',
    dark: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-600',
  },
  purple: {
    light: 'bg-purple-100',
    dark: 'bg-purple-600',
    text: 'text-purple-600',
    border: 'border-purple-600',
  },
  orange: {
    light: 'bg-orange-100',
    dark: 'bg-orange-600',
    text: 'text-orange-600',
    border: 'border-orange-600',
  },
  red: {
    light: 'bg-red-100',
    dark: 'bg-red-600',
    text: 'text-red-600',
    border: 'border-red-600',
  },
} as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: '/',
  STUDENTS: '/students',
  BOOKS: '/books',
  TRANSACTIONS: '/transactions',
  ALERTS: '/alerts',
} as const;
