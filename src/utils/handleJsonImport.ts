import { extractResources } from './parseScannerJson';
import { saveInventoryResources } from '../firebase/inventory';

export async function handleJsonImport(
  file: File,
  userId: string,
  refreshAlerts?: () => void
) {
  const text = await file.text();
  const json = JSON.parse(text);

  const resourceTotals = extractResources(json);
  await saveInventoryResources(userId, resourceTotals);

  if (refreshAlerts) {
    refreshAlerts();
  }

  return {
    raw: json,
    resources: resourceTotals,
  };
}