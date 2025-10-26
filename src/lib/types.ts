export interface Student {
  studentId: string;
  name: string;
  rfidCard: string;
  isCheckedIn: boolean;
  booksBorrowed: number;
  lastCheckIn?: string;
  lastCheckOut?: string;
}

export interface Book {
  bookId: string;
  title: string;
  author: string;
  nfcTag: string;
  isAvailable: boolean;
  borrowedBy: string;
  borrowedTime?: string;
  returnedTime?: string;
  shelf: string;
}

export interface Transaction {
  id: string;
  type: 'CHECK_IN' | 'CHECK_OUT' | 'BORROW' | 'RETURN';
  studentId: string;
  studentName: string;
  bookId?: string;
  bookTitle?: string;
  timestamp: string;
}

export interface Stats {
  totalStudents: number;
  totalBooks: number;
  peopleCount: number;
  totalTransactions: number;
  lastSync?: string;
}

export interface NoiseAlert {
  timestamp: string;
  level: number;
}
