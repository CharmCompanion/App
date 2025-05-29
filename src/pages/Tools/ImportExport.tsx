import ScannerJsonUpload from '../../components/import/ScannerJsonUpload';
import QRCodeImport from '../../components/qrcode/QRCodeImport';
import QRCodeGenerator from '../../components/qrcode/QRCodeGenerator';

const sampleBuild = {
  name: 'Default Loadout',
  frame: 'Volt',
  weapons: {
    primary: 'Braton Prime',
    secondary: 'Lex Prime',
    melee: 'Skana Prime',
  },
  mods: ['Stretch', 'Flow', 'Intensify'],
  colors: ['#00FFFF', '#FF00FF'],
  config: 'A',
};

export default function ImportExport() {
  const handleQRImport = (data: any) => {
    console.log('Imported Build:', data);
    // Future: link to loadout editor
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Import & Export Tools</h1>

      <section>
        <h2 className="text-xl font-semibold text-teal-400">Scanner JSON Import</h2>
        <ScannerJsonUpload />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-blue-400">QR Code Tools</h2>
        <QRCodeGenerator data={sampleBuild} />
        <QRCodeImport onImport={handleQRImport} />
      </section>
    </div>
  );
}