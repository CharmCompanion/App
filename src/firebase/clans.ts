import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

export async function getMOTD(userId: string) {
  const ref = doc(db, 'clans', userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().motd : '';
}

export async function saveMOTD(userId: string, motd: string) {
  const ref = doc(db, 'clans', userId);
  await setDoc(ref, { motd });
}