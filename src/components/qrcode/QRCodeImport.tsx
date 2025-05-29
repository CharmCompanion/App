import { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useAuth } from '../../hooks/useAuth';
import { saveLoadout } from '../../firebase/loadouts';

interface Props {
  onComplete?: () => void;
}

export default function QRCodeImport({ onComplete }: Props) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const handleScan = async (value: string | null) => {
    if (!value || !user?.uid) return;

    try {
      const decoded = atob(value);
      const parsed = JSON.parse(decoded);

      if (!parsed.frame || !parsed.mods || !Array.isArray(parsed.mods)) {
        throw new Error('Invalid loadout structure.');
      }

      await saveLoadout(user.uid, parsed);
      setSuccess(`Imported loadout for ${parsed.frame}`);
      if (onComplete) onComplete();
    } catch (err) {
      console.error(err);
      setError('Invalid or corrupt QR code.');
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    setError('Scanner error.');
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-white mb-2">Scan Loadout QR Code</h2>
      <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
      {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      {success && <p className="text-green-400 mt-2 text-sm">{success}</p>}
    </div>
  );
}
