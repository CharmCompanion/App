import { useEffect, useState } from 'react';
import { getThermiaEvent } from '../../firebase/events';

export default function ThermiaTracker() {
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    getThermiaEvent().then(setEvent);
  }, []);

  if (!event) return <p>Loading Thermia status...</p>;

  return (
    <div className="p-4 bg-zinc-800 border border-zinc-600 rounded">
      <h2 className="text-lg font-semibold">Thermia Fractures</h2>
      <p>Status: {event.active ? 'Active' : 'Inactive'}</p>
      <p>Time Remaining: {event.timeLeft}</p>
    </div>
  );
}