interface Props {
  loadout: any;
  onApply: (loadout: any) => void;
}

export default function LoadoutApplyButton({ loadout, onApply }: Props) {
  return (
    <button
      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-500"
      onClick={() => onApply(loadout)}
    >
      Apply Loadout
    </button>
  );
}