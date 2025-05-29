import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import resources from '../../data/resources';
import {
  fetchResourceAlerts,
  saveResourceAlerts,
} from '../../firebase/resource';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ResourceAlertSettings({ open, onClose }: Props) {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid && open) {
      fetchResourceAlerts(user.uid).then((data) => {
        setAlerts(data);
        setLoading(false);
      });
    }
  }, [user, open]);

  const handleSave = async () => {
    if (!user?.uid) return;
    await saveResourceAlerts(user.uid, alerts);
    onClose();
  };

  const handleUpdate = (resourceId: string, key: 'enabled' | 'threshold', value: any) => {
    const current = alerts[resourceId] || { enabled: false, threshold: 0 };
    setAlerts({
      ...alerts,
      [resourceId]: {
        ...current,
        [key]: value,
      },
    });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-zinc-900 p-6 shadow-xl transition-all border border-zinc-700">
                <Dialog.Title className="text-lg font-bold text-white mb-4">
                  Resource Alert Settings
                </Dialog.Title>

                {loading ? (
                  <div className="text-white">Loading...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                    {resources.map((res) => {
                      const config = alerts[res.id] || { threshold: 0, enabled: false };
                      return (
                        <div key={res.id} className="border border-zinc-700 p-4 rounded">
                          <div className="font-semibold mb-1">{res.name}</div>
                          <label className="block text-sm">
                            Threshold:
                            <input
                              type="number"
                              className="w-20 ml-2 px-1 bg-zinc-800 border border-zinc-600 rounded"
                              value={config.threshold}
                              onChange={(e) =>
                                handleUpdate(res.id, 'threshold', parseInt(e.target.value, 10))
                              }
                            />
                          </label>
                          <label className="block mt-2 text-sm">
                            Enable:
                            <input
                              type="checkbox"
                              className="ml-2"
                              checked={config.enabled}
                              onChange={(e) =>
                                handleUpdate(res.id, 'enabled', e.target.checked)
                              }
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500"
                  >
                    Save Settings
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
