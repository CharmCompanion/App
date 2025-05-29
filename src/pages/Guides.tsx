import GuideEditor from '../components/guides/GuideEditor';

export default function GuidesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Guides</h1>
      <GuideEditor />
    </div>
  );
}