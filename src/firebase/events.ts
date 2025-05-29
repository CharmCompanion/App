import { doc, getDoc } from 'firebase/firestore';
import { db } from './config';

export async function getThermiaEvent() {
  const ref = doc(db, 'events', 'thermia');
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}