'use client';

import { useEffect, useState } from 'react';
import { subscribeToBooks } from '@/lib/services/firebase.service';
import { Book } from '@/types';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = subscribeToBooks((data) => {
        setBooks(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { books, loading, error };
}
