import { useState } from 'react';

interface Props {
  data: any;
  onSave: () => void;
}

export default function QRCodeLoadoutPreview({ data, onSave }: Props) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="p-4 border border-blue-600 bg-zinc-900 text-white rounded">
      <h2 className="text-lg font-semibold mb-2">Preview Loadout</h2>
      <p>Frame: {data.frame}</p>
      <p>Primary: {data.weapons?.primary}</p>
      <p>Secondary: {data.weapons?.secondary}</p>
      <p>Melee: {data.weapons?.melee}</p>
      <p>Mods: {data.mods?.join(', ')}</p>
      <button
        onClick={onSave}
        className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-500"
      >
        Save Loadout
      </button>
      <button
        onClick={() => setShow(false)}
        className="ml-2 text-red-400 hover:underline text-sm"
      >
        Cancel
      </button>
    </div>
  );
}