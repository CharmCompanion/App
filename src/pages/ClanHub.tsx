import ClanMOTD from '../components/clans/ClanMOTD';

export default function ClanHub() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Clan Hub</h1>
      <ClanMOTD />
    </div>
  );
}