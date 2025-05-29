import { useEffect, useState } from 'react';
import resources from '../../data/resources';
import {
  fetchResourceAlerts,
  updateSingleResourceAlert,
  saveResourceAlerts
} from '../../firebase/resource';
import { useAuth } from '../../hooks/useAuth'; // assumes you have auth context
import { useAlertContext } from '../../hooks/useAlertContext'; // make this yourself


interface ResourceAlert {
  threshold: number;
  enabled: boolean;
}

interface AlertSettings {
  [resourceId: string]: ResourceAlert;
  globalAlertsEnabled?: boolean;
}

export default function ResourceTracker() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<AlertSettings>({});
  const [loading, setLoading] = useState(true);
  const { refreshAlerts } = useAlertContext();

  useEffect(() => {
    if (!user?.uid) return;

    fetchResourceAlerts(user.uid).then((data) => {
      setAlerts(data);
      setLoading(false);
    });
  }, [user]);

  const updateAlert = async (resourceId: string, key: 'threshold' | 'enabled', value: number | boolean) => {
    const updated = {
      ...alerts,
      [resourceId]: {
        ...alerts[resourceId],
        [key]: value,
      },
    };
    setAlerts(updated);
    await updateSingleResourceAlert(user.uid, resourceId, updated[resourceId]);
  };

  const toggleGlobalAlerts = async () => {
    const newVal = !alerts.globalAlertsEnabled;
    const updated = { ...alerts, globalAlertsEnabled: newVal };
    setAlerts(updated);
    await saveResourceAlerts(user.uid, updated);
  };

  if (loading) return <div>Loading resource alerts...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Resource Alert Tracker</h2>
      <div className="mb-2">
        <label className="mr-2 font-medium">Global Alerts:</label>
        <input
          type="checkbox"
          checked={alerts.globalAlertsEnabled ?? true}
          onChange={toggleGlobalAlerts}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => {
          const config = alerts[resource.id] || { threshold: 0, enabled: false };
          return (
            <div key={resource.id} className="border p-4 rounded shadow">
              <div className="font-bold">{resource.name}</div>
              <label className="block mt-2">
                Threshold:
                <input
                  type="number"
                  min={0}
                  value={config.threshold}
                  onChange={(e) =>
                    updateAlert(resource.id, 'threshold', parseInt(e.target.value, 10))
                  }
                  className="ml-2 p-1 border w-20"
                />
              </label>
              <label className="block mt-2">
                Enable Alert:
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) => updateAlert(resource.id, 'enabled', e.target.checked)}
                  className="ml-2"
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
