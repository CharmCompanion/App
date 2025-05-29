import LFGBoard from '../components/lfg/LFGBoard';

export default function LFGPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Looking for Group</h1>
      <LFGBoard />
    </div>
  );
}