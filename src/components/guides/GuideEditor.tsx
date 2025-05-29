import { useEffect, useState } from 'react';
import { getGuide, saveGuide } from '../../firebase/guides';
import { useAuth } from '../../hooks/useAuth';

export default function GuideEditor() {
  const { user } = useAuth();
  const [guide, setGuide] = useState('');

  useEffect(() => {
    if (user?.uid) {
      getGuide(user.uid).then(setGuide);
    }
  }, [user]);

  const handleSave = async () => {
    if (user?.uid) {
      await saveGuide(user.uid, guide);
    }
  };

  return (
    <div>
      <textarea
        className="w-full h-64 p-2 bg-zinc-800 border border-zinc-600 text-white rounded"
        value={guide}
        onChange={(e) => setGuide(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500"
      >
        Save Guide
      </button>
    </div>
  );
}