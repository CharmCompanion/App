import { useState } from 'react';

interface Props {
  data: any;
  onSave: (updated: any) => void;
}

export default function LoadoutEditor({ data, onSave }: Props) {
  const [loadout, setLoadout] = useState(data);

  const updateField = (key: string, value: any) => {
    setLoadout({ ...loadout, [key]: value });
  };

  return (
    <div className="p-4 border border-yellow-600 bg-zinc-900 text-white rounded">
      <h2 className="text-lg font-semibold mb-2">Edit Loadout</h2>
      <input
        type="text"
        value={loadout.name}
        onChange={(e) => updateField('name', e.target.value)}
        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
      />
      <button
        onClick={() => onSave(loadout)}
        className="mt-4 px-4 py-2 bg-teal-600 rounded hover:bg-teal-500"
      >
        Save Changes
      </button>
    </div>
  );
}
