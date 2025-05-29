import CodexScanner from '../components/codex/CodexScanner';

export default function CodexPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Codex Scanner</h1>
      <CodexScanner />
    </div>
  );
}