import { useEffect, useState } from 'react';
import { getLoadouts, deleteLoadout } from '../firebase/loadouts';
import { useAuth } from '../hooks/useAuth';

export default function LoadoutsPage() {
  const { user } = useAuth();
  const [loadouts, setLoadouts] = useState<any[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getLoadouts(user.uid).then(setLoadouts);
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user?.uid) return;
    await deleteLoadout(user.uid, id);
    setLoadouts((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">My Loadouts</h1>
      {loadouts.length === 0 ? (
        <p>No loadouts saved yet.</p>
      ) : (
        <ul className="space-y-4">
          {loadouts.map((l) => (
            <li key={l.id} className="border p-4 rounded bg-zinc-800">
              <h2 className="text-lg font-semibold">{l.name || l.frame}</h2>
              <p className="text-sm text-zinc-400">{l.frame} – Config {l.config}</p>
              <button
                onClick={() => handleDelete(l.id)}
                className="mt-2 text-red-400 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
