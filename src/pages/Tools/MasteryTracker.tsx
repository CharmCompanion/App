import { useState, useEffect, useMemo } from 'react';
import { useCharm } from '../../CharmContext';
import { MasteryService, type BuildableItem, type MasteryProgress } from '../services/masteryService';
import WarframeFoundry from './foundry';
import { CompleteWarframeAPI } from '../../api/warframeClient';
import '../pages/mastery-tracker.css';

export default function MasteryTracker() {
  const { state, save } = useCharm();

  const [items, setItems] = useState<BuildableItem[]>([]);
  const [loading, setLoad] = useState(true);
  const [tab, setTab] = useState<'overview' | 'items' | 'foundry'>('overview');

  const prog: MasteryProgress = state.mastery ?? {
    currentMR: 0,
    currentXP: 0,
    totalMasteryAvailable: 0,
    ownedItems: {},
    formaedItems: {},
    builtItems: {},
    goals: [],
    lastUpdated: new Date()
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [buildableItems, masteryItems] = await Promise.all([
          MasteryService.fetchBuildableItems(),
          CompleteWarframeAPI.getAllMasteryItems()
        ]);

        const combinedItems = [...buildableItems];
        const existingIds = new Set(buildableItems.map(item => item.id));

        masteryItems.forEach(item => {
          if (!existingIds.has(item.id)) {
            combinedItems.push({
              id: item.id,
              name: item.name,
              masteryXP: item.totalMastery,
              type: mapItemType(item.itemType),
              category: 'misc',
              masteryRank: 0,
              craftingTime: 0,
              requirements: [],
              blueprint: { source: 'Unknown' }
            });
          }
        });

        setItems(combinedItems);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoad(false);
      }
    };

    fetchItems();
  }, []);

  const ownedXP = useMemo(() =>
    items.reduce((sum, i) => prog.ownedItems[i.id] ? sum + i.masteryXP : sum, 0),
    [items, prog.ownedItems]);

  if (loading) return <div className="mastery-container">Loading…</div>;

  return (
    <div className="mastery-container max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mt-4">Mastery Tracker</h1>
      <div className="flex gap-2">
        {(['overview', 'items', 'foundry'] as const).map(key => (
          <button
            key={key}
            className={`flex-1 py-2 font-semibold rounded
                        ${tab === key ? 'bg-indigo-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700'}`}
            onClick={() => setTab(key)}
          >
            {key === 'overview' ? 'Overview' : key === 'items' ? 'Items' : 'Foundry'}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{ownedXP.toLocaleString()} XP&nbsp;Owned</span>
              <span>{prog.totalMasteryAvailable.toLocaleString()} XP&nbsp;Total</span>
            </div>
            <progress
              value={ownedXP}
              max={prog.totalMasteryAvailable}
              className="w-full h-4 rounded bg-gray-700
                         [&::-webkit-progress-value]:bg-green-500
                         [&::-moz-progress-bar]:bg-green-500"
            />
          </div>
          <p className="text-center">Current MR {prog.currentMR}</p>
        </div>
      )}

      {tab === 'items' && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4">
          {items.map(item => {
            const owned = !!prog.ownedItems[item.id];
            return (
              <div
                key={item.id}
                className={`p-4 rounded border
                            ${owned ? 'border-green-500 bg-green-900/40'
                              : 'border-gray-600 bg-gray-800'}`}
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm opacity-70">{item.masteryXP} XP</p>
                <button
                  onClick={() => save({
                    mastery: {
                      ...prog,
                      ownedItems: { ...prog.ownedItems, [item.id]: !owned }
                    }
                  })}
                  className="mt-2 w-full py-1 rounded text-sm
                             bg-indigo-600 hover:bg-indigo-700"
                >
                  {owned ? 'Owned' : 'Mark Owned'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'foundry' && (
        <div className="mt-4">
          <WarframeFoundry />
        </div>
      )}
    </div>
  );
}

function mapItemType(input: string): 'warframe' | 'weapon' | 'companion' | 'archwing' | 'vehicle' {
  const type = input.toLowerCase();
  if (['primary', 'secondary', 'melee', 'zaw', 'kitgun'].includes(type)) return 'weapon';
  if (['warframe', 'necramech'].includes(type)) return 'warframe';
  if (['sentinel', 'moa', 'kavat', 'kubrow', 'predasite', 'vasca', 'helminth charger'].includes(type)) return 'companion';
  if (['archwing', 'archgun', 'archmelee'].includes(type)) return 'archwing';
  if (['vehicle'].includes(type)) return 'vehicle';
  console.warn(`Unknown item type "${input}", defaulting to "weapon"`);
  return 'weapon';
}
