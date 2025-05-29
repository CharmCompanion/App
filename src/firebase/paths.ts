import {
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from './config';

export async function getPaths(userId: string) {
  const ref = collection(db, 'users', userId, 'paths');
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function updateTaskStatus(userId: string, pathId: string, taskIndex: number, complete: boolean) {
  const ref = doc(db, 'users', userId, 'paths', pathId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data();
    const tasks = data.tasks || [];
    tasks[taskIndex].complete = complete;
    await setDoc(ref, { ...data, tasks });
  }
}