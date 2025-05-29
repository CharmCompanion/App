import NotesEditor from '../components/notes/NotesEditor';

export default function NotesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>
      <NotesEditor />
    </div>
  );
}