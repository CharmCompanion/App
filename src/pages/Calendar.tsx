import CalendarDisplay from '../components/calendar/CalendarDisplay';

export default function CalendarPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Warframe Calendar</h1>
      <CalendarDisplay />
    </div>
  );
}