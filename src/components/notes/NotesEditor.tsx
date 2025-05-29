import { useEffect, useState } from 'react';
import { getUserNotes, saveUserNotes } from '../../firebase/notes';
import { useAuth } from '../../hooks/useAuth';

export default function NotesEditor() {
  const { user } = useAuth();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (user?.uid) {
      getUserNotes(user.uid).then(setContent);
    }
  }, [user]);

  const handleSave = async () => {
    if (user?.uid) {
      await saveUserNotes(user.uid, content);
    }
  };

  return (
    <div>
      <textarea
        className="w-full h-64 p-2 bg-zinc-800 border border-zinc-600 text-white rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        Save Notes
      </button>
    </div>
  );
}