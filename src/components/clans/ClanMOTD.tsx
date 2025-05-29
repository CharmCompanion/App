import { useEffect, useState } from 'react';
import { getMOTD, saveMOTD } from '../../firebase/clans';
import { useAuth } from '../../hooks/useAuth';

export default function ClanMOTD() {
  const { user } = useAuth();
  const [motd, setMOTD] = useState('');

  useEffect(() => {
    if (user?.uid) {
      getMOTD(user.uid).then(setMOTD);
    }
  }, [user]);

  const handleSave = async () => {
    if (user?.uid) {
      await saveMOTD(user.uid, motd);
    }
  };

  return (
    <div>
      <textarea
        className="w-full h-32 p-2 bg-zinc-800 border border-zinc-600 text-white rounded"
        value={motd}
        onChange={(e) => setMOTD(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-teal-600 rounded hover:bg-teal-500"
      >
        Save MOTD
      </button>
    </div>
  );
}