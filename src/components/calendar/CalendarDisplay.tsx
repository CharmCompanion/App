import { useEffect, useState } from 'react';
import { getCalendarEvents } from '../../firebase/calendar';

export default function CalendarDisplay() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getCalendarEvents().then(setEvents);
  }, []);

  return (
    <div className="space-y-4">
      {events.map((event, i) => (
        <div key={i} className="p-4 bg-zinc-800 border border-zinc-600 rounded">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-zinc-400">{event.date} | {event.time}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}
