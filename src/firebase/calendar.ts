import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export async function getCalendarEvents() {
  const ref = collection(db, 'calendar');
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
