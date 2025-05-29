import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './config'; // your firebase config

const getResourceAlertsRef = (userId: string) =>
  doc(db, 'users', userId, 'settings', 'resourceAlerts');

export async function fetchResourceAlerts(userId: string) {
  const ref = getResourceAlertsRef(userId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();
  } else {
    return { globalAlertsEnabled: true };
  }
}

export async function saveResourceAlerts(userId: string, data: any) {
  const ref = getResourceAlertsRef(userId);
  await setDoc(ref, data, { merge: true });
}

export async function updateSingleResourceAlert(userId: string, resourceId: string, config: any) {
  const ref = getResourceAlertsRef(userId);
  await updateDoc(ref, {
    [`${resourceId}`]: config,
  });
}
