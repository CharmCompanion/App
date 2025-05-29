import { useState } from 'react';
import QRCode from 'qrcode.react';

interface Props {
  data: any;
  label?: string;
}

export default function QRCodeGenerator({ data, label = 'Export QR Code' }: Props) {
  const [showQR, setShowQR] = useState(false);

  const encoded = btoa(JSON.stringify(data));

  return (
    <div className="mt-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        onClick={() => setShowQR(!showQR)}
      >
        {label}
      </button>

      {showQR && (
        <div className="mt-4 p-4 border border-zinc-700 bg-zinc-900 rounded">
          <QRCode value={encoded} size={200} />
          <p className="mt-2 text-sm text-zinc-400">Scan to import this build</p>
        </div>
      )}
    </div>
  );
}
