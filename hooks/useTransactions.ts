'use client';

import { useEffect, useState } from 'react';
import { subscribeToTransactions } from '@/lib/services/firebase.service';
import { Transaction } from '@/types';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = subscribeToTransactions((data) => {
        setTransactions(data);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, []);

  return { transactions, loading, error };
}
