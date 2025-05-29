import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

export async function getGuide(userId: string) {
  const ref = doc(db, 'guides', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().content : '';
}

export async function saveGuide(userId: string, content: string) {
  const ref = doc(db, 'guides', userId);
  await setDoc(ref, { content });
}