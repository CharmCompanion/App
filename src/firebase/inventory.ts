import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

export async function saveInventoryResources(userId: string, resourceTotals: Record<string, number>) {
  const ref = doc(db, 'users', userId, 'snapshots', 'resources');
  await setDoc(ref, { totals: resourceTotals }, { merge: true });
}

export async function fetchInventoryResources(userId: string) {
  const ref = doc(db, 'users', userId, 'snapshots', 'resources');
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().totals || {};
  }
  return {};
}
