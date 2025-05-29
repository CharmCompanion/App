import { useRef, useState } from 'react';
import { handleJsonImport } from '../../utils/handleJsonImport';
import { useAuth } from '../../hooks/useAuth';
import { useAlertContext } from '../../hooks/useAlertContext';

interface Props {
  onComplete?: () => void;
}

export default function ScannerJsonUpload({ onComplete }: Props) {
  const { user } = useAuth();
  const { refreshAlerts } = useAlertContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFile = async (file: File) => {
    if (!user?.uid) return;

    setStatus('loading');
    try {
      await handleJsonImport(file, user.uid, refreshAlerts);
      setStatus('success');
      if (onComplete) onComplete();
    } catch (err) {
      console.error('Failed to import JSON:', err);
      setStatus('error');
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className="border border-dashed border-zinc-500 p-6 rounded-md text-center bg-zinc-900 text-white relative"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <p className="mb-2 font-medium">Import Warframe Scanner JSON</p>
      <p className="text-sm text-zinc-400 mb-4">Drag a file here or click to select</p>

      <input
        type="file"
        accept=".json"
        className="hidden"
        ref={inputRef}
        onChange={onFileSelect}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 rounded bg-teal-600 hover:bg-teal-500"
      >
        Select JSON File
      </button>

      {status === 'loading' && <p className="mt-2 text-yellow-300">Importing...</p>}
      {status === 'success' && <p className="mt-2 text-green-400">Import successful!</p>}
      {status === 'error' && <p className="mt-2 text-red-400">Failed to import JSON.</p>}
    </div>
  );
}