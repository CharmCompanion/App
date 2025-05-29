import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

export async function getLFGPosts() {
  const ref = collection(db, 'lfg');
  const snap = await getDocs(ref);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// FILE: src/pages/Events.tsx
import ThermiaTracker from '../components/events/ThermiaTracker';

export default function EventsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Events & Alerts</h1>
      <ThermiaTracker />
    </div>
  );
}