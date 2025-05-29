import { useEffect, useState } from 'react';
import resources from '../../data/resources';
import { fetchResourceAlerts } from '../../firebase/resource';
import { useAuth } from '../../hooks/useAuth';
import { fetchInventoryResources } from '../../firebase/inventory';

interface Alert {
  id: string;
  name: string;
  threshold: number;
  current: number; // Placeholder for future scanner integration
}

export default function HomeAlerts() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!user?.uid) return;

  Promise.all([
    fetchResourceAlerts(user.uid),
    fetchInventoryResources(user.uid)
  ]).then(([alertsData, resourceTotals]) => {
    setGlobalEnabled(alertsData.globalAlertsEnabled ?? true);
    const result: Alert[] = [];

    for (const resource of resources) {
      const config = alertsData[resource.id];
      if (config?.enabled && config.threshold > 0) {
        const current = resourceTotals[resource.id] || 0;
        if (current < config.threshold) {
          result.push({
            id: resource.id,
            name: resource.name,
            threshold: config.threshold,
            current,
          });
        }
      }
    }

    setAlerts(result);
    setLoading(false);
  });
}, [user]);

  if (loading || !globalEnabled) return null;
  if (alerts.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-red-500 rounded p-4 shadow text-red-300 mt-4">
      <h2 className="text-lg font-bold mb-2">Low Inventory Alerts</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {alerts.map((alert) => (
          <li key={alert.id}>
            {alert.name}: {alert.current} / {alert.threshold}
          </li>
        ))}
      </ul>
      <div className="mt-3 text-xs italic text-zinc-400">
        * Values based on latest scanner import. Update your data to keep alerts accurate.
      </div>
    </div>
  );
}
