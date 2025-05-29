import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export async function getGoals(userId: string) {
  const ref = collection(db, 'users', userId, 'goals');
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}