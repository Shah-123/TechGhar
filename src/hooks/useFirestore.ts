import { useState,useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDocument = async (collection: string, id: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      return null;
    }
  };

  const setDocument = async (collection: string, id: string, data: any) => {
    try {
      setLoading(true);
      await setDoc(doc(db, collection, id), data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  const updateDocument = async (collection: string, id: string, data: any) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, collection, id), data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  return {
    getDocument,
    setDocument,
    updateDocument,
    loading,
    error
  };
};