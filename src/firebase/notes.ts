import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

export async function getUserNotes(userId: string) {
  const ref = doc(db, 'users', userId, 'notes', 'default');
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().content : '';
}

export async function saveUserNotes(userId: string, content: string) {
  const ref = doc(db, 'users', userId, 'notes', 'default');
  await setDoc(ref, { content });
}