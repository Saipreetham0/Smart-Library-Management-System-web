import { database } from '@/config/firebase';
import { ref, onValue, off, get, set, remove } from 'firebase/database';
import { Student, Book, Transaction, Stats, NoiseAlert } from '@/types';

// Stats
export const subscribeToStats = (callback: (stats: Stats) => void) => {
  const statsRef = ref(database, 'stats');
  onValue(statsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {
      totalStudents: 0,
      totalBooks: 0,
      peopleCount: 0,
      totalTransactions: 0,
    });
  });
  return () => off(statsRef);
};

// Students
export const subscribeToStudents = (callback: (students: Student[]) => void) => {
  const studentsRef = ref(database, 'students');
  onValue(studentsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const studentsList = Object.keys(data).map(key => ({
        studentId: key,
        ...data[key]
      }));
      callback(studentsList);
    } else {
      callback([]);
    }
  });
  return () => off(studentsRef);
};

export const getStudent = async (studentId: string): Promise<Student | null> => {
  const studentRef = ref(database, `students/${studentId}`);
  const snapshot = await get(studentRef);
  if (snapshot.exists()) {
    return { studentId, ...snapshot.val() };
  }
  return null;
};

export const addStudent = async (student: Omit<Student, 'studentId'> & { studentId: string }) => {
  const studentRef = ref(database, `students/${student.studentId}`);
  await set(studentRef, {
    name: student.name,
    rfidCard: student.rfidCard,
    isCheckedIn: false,
    booksBorrowed: 0,
    lastCheckIn: '',
  });
};

export const updateStudent = async (studentId: string, data: Partial<Student>) => {
  const studentRef = ref(database, `students/${studentId}`);
  const snapshot = await get(studentRef);
  if (snapshot.exists()) {
    await set(studentRef, { ...snapshot.val(), ...data });
  }
};

export const deleteStudent = async (studentId: string) => {
  const studentRef = ref(database, `students/${studentId}`);
  await remove(studentRef);
};

// Books
export const subscribeToBooks = (callback: (books: Book[]) => void) => {
  const booksRef = ref(database, 'books');
  onValue(booksRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const booksList = Object.keys(data).map(key => ({
        bookId: key,
        ...data[key]
      }));
      callback(booksList);
    } else {
      callback([]);
    }
  });
  return () => off(booksRef);
};

export const getBook = async (bookId: string): Promise<Book | null> => {
  const bookRef = ref(database, `books/${bookId}`);
  const snapshot = await get(bookRef);
  if (snapshot.exists()) {
    return { bookId, ...snapshot.val() };
  }
  return null;
};

export const addBook = async (book: Omit<Book, 'bookId'> & { bookId: string }) => {
  const bookRef = ref(database, `books/${book.bookId}`);
  await set(bookRef, {
    title: book.title,
    author: book.author,
    nfcTag: book.nfcTag,
    shelf: book.shelf,
    isAvailable: true,
    borrowedBy: '',
  });
};

export const updateBook = async (bookId: string, data: Partial<Book>) => {
  const bookRef = ref(database, `books/${bookId}`);
  const snapshot = await get(bookRef);
  if (snapshot.exists()) {
    await set(bookRef, { ...snapshot.val(), ...data });
  }
};

export const deleteBook = async (bookId: string) => {
  const bookRef = ref(database, `books/${bookId}`);
  await remove(bookRef);
};

// Transactions
export const subscribeToTransactions = (callback: (transactions: Transaction[]) => void) => {
  const transactionsRef = ref(database, 'transactions');
  onValue(transactionsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const transactionsList = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })).sort((a, b) => {
        // Sort by timestamp descending (newest first)
        return b.id.localeCompare(a.id);
      });
      callback(transactionsList);
    } else {
      callback([]);
    }
  });
  return () => off(transactionsRef);
};

// Noise Alerts
export const subscribeToNoiseAlerts = (callback: (alerts: NoiseAlert[]) => void) => {
  const alertsRef = ref(database, 'alerts/noise');
  onValue(alertsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const alertsList = Object.keys(data).map(key => ({
        timestamp: key,
        level: data[key]
      })).sort((a, b) => {
        // Sort by timestamp descending (newest first)
        return b.timestamp.localeCompare(a.timestamp);
      });
      callback(alertsList);
    } else {
      callback([]);
    }
  });
  return () => off(alertsRef);
};
