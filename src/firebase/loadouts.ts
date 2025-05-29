import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from './config';

export async function saveLoadout(userId: string, loadout: any) {
  const ref = collection(db, 'users', userId, 'loadouts');
  await addDoc(ref, loadout);
}

export async function getLoadouts(userId: string) {
  const ref = collection(db, 'users', userId, 'loadouts');
  const snap = await getDocs(ref);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteLoadout(userId: string, loadoutId: string) {
  const ref = doc(db, 'users', userId, 'loadouts', loadoutId);
  await deleteDoc(ref);
}
