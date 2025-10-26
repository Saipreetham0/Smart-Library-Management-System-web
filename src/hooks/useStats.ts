'use client';

import { useEffect, useState } from 'react';
import { subscribeToStats } from '@/lib/services/firebase.service';
import { Stats } from '@/types';

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalBooks: 0,
    peopleCount: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = subscribeToStats((data) => {
        setStats(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { stats, loading, error };
}
