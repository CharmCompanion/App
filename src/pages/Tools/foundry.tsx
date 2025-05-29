import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Heart } from 'lucide-react';
import type { FoundryItem, FilterOptions, ItemType } from '../types/foundry';
import styles from './foundry.module.css';

const DEFAULT_FILTERS: FilterOptions = {
  itemTypes: [],
  masteryRank: { min: 0, max: 16 },
  owned: null,
  mastered: null,
  vaulted: null,
  building: null,
  favorited: null,
  missingComponents: null
};

type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: keyof FoundryItem;
  direction: SortDirection;
}

const DEFAULT_SORT: SortConfig = {
  field: 'name',
  direction: 'asc'
};

interface InventoryCounterProps {
  current: number;
  needed: number;
  onUpdate: (value: number) => void;
}

const InventoryCounter: React.FC<InventoryCounterProps> = ({ current, needed, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(current);

  return (
    <div className={styles.inventoryCounter}>
      {isEditing ? (
        <>          <label className="sr-only" htmlFor="inventory-input">Update inventory count</label>
          <input
            id="inventory-input"
            type="number"
            value={value}
            onChange={(e) => setValue(Math.max(0, parseInt(e.target.value) || 0))}
            className={styles.inventoryInput}
            min="0"
            autoFocus
            title="Inventory count"
            onBlur={() => {
              onUpdate(value);
              setIsEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onUpdate(value);
                setIsEditing(false);
              }
            }}
          />
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className={styles.inventoryDisplay}
        >
          {current}/{needed}
        </button>
      )}
    </div>
  );
};

interface FilterButtonProps {
  expanded: boolean;
  onToggle: () => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ expanded, onToggle, className }) => {
  return (
    <button
      onClick={onToggle}
      className={className}
      aria-label={expanded ? "Hide filters" : "Show filters"}
      data-testid="filter-toggle"
      type="button"
    >
      <Filter className="w-4 h-4" />
      <span>Filters</span>
    </button>
  );
};

interface ItemCardProps{
  item: FoundryItem;
  onToggleOwned: () => void;
  onToggleMastered: () => void;
  onToggleFavorite: () => void;
  onUpdateInventory: (resourceName: string, value: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onToggleOwned,
  onToggleMastered,
  onToggleFavorite,
  onUpdateInventory
}) => {
  const { name, itemType, masteryRank, vaulted, userProgress } = item;  const typeColors: Record<ItemType, string> = {
    Primary: 'text-blue-400',
    Secondary: 'text-green-400',
    Melee: 'text-red-400',
    Warframe: 'text-purple-400',
    Companion: 'text-yellow-400',
    Archwing: 'text-cyan-400',
    ArchwingGun: 'text-orange-400',
    ArchwingMelee: 'text-pink-400',
    Amp: 'text-indigo-400',
    Kdrive: 'text-lime-400',
    Cosmetic: 'text-rose-400',
    Ephemera: 'text-violet-400',
    Gear: 'text-amber-400'
  };

  return (
    <div className={`${styles.itemCard} ${vaulted ? styles.itemCardVaulted : ''}`}>
      <div className={styles.itemInfo}>
        <img
          src={`/items/${item.uniqueName}.png`}
          alt={name}
          className={styles.itemImage}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent && !parent.querySelector('.fallback')) {
              const fallback = document.createElement('div');
              fallback.className = 'fallback';
              fallback.textContent = itemType.substring(0, 3);
              parent.appendChild(fallback);
            }
          }}
        />
        <div className={styles.itemDetails}>
          <h3 className={styles.itemName}>{name}</h3>
          <span className={`${styles.itemType} ${typeColors[itemType]}`}>
            MR {masteryRank}
          </span>
          
          <div className={styles.itemButtons}>
            <button
              onClick={onToggleOwned}
              className={`${styles.button} ${
                userProgress?.owned ? styles.buttonPrimary : styles.buttonSecondary
              }`}
              aria-label={userProgress?.owned ? `Mark ${name} as not owned` : `Mark ${name} as owned`}
            >
              {userProgress?.owned ? 'Owned' : 'Get'}
            </button>
            
            <button
              onClick={onToggleMastered}
              className={`${styles.button} ${
                userProgress?.mastered ? styles.buttonPrimary : styles.buttonSecondary
              }`}
              aria-label={userProgress?.mastered ? `Mark ${name} as not mastered` : `Mark ${name} as mastered`}
            >
              {userProgress?.mastered ? 'Mastered' : 'Master'}
            </button>
            
            <button
              onClick={onToggleFavorite}
              className={`${styles.button} ${
                userProgress?.favorited ? styles.buttonPrimary : styles.buttonSecondary
              }`}
              aria-label={userProgress?.favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            >
              <Heart
                className="w-4 h-4"
                fill={userProgress?.favorited ? 'currentColor' : 'none'}
              />
            </button>          </div>
          
          {item.userProgress?.inventory && Object.entries(item.userProgress.inventory).length > 0 && (
            <div className={styles.resourceTracking}>
              <h4 className="text-sm font-medium mt-4 mb-2">Resources</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(item.userProgress.inventory).map(([resourceName, data]) => (
                  <div key={resourceName} className="flex items-center justify-between">
                    <span className="text-sm">{resourceName}</span>
                    <InventoryCounter
                      current={data.owned}
                      needed={data.needed}
                      onUpdate={(value) => onUpdateInventory(resourceName, value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function WarframeFoundry() {
  const [items, setItems] = useState<FoundryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        // TODO: Replace with actual API call
        const mockItems: FoundryItem[] = [
          {
            id: '1',
            name: 'Test Item',
            uniqueName: 'test-item',
            masteryRank: 0,
            totalMastery: 3000,
            wikiUrl: '',
            imageUrl: '',
            vaulted: false,
            tradeable: true,
            itemType: 'Primary',            userProgress: {
              owned: false,
              mastered: false,
              building: false,
              favorited: false,
              inventory: {}
            }
          }
        ];
        setItems(mockItems);
      } catch (error) {
        console.error('Failed to load items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items
      .filter(item => {
        if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }

        if (filters.itemTypes.length && !filters.itemTypes.includes(item.itemType)) {
          return false;
        }

        if (item.masteryRank < filters.masteryRank.min || 
            item.masteryRank > filters.masteryRank.max) {
          return false;
        }

        if (filters.owned !== null && item.userProgress?.owned !== filters.owned) {
          return false;
        }

        if (filters.mastered !== null && item.userProgress?.mastered !== filters.mastered) {
          return false;
        }

        if (filters.favorited !== null && item.userProgress?.favorited !== filters.favorited) {
          return false;
        }

        if (filters.vaulted !== null && item.vaulted !== filters.vaulted) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const aVal = a[sort.field];
        const bVal = b[sort.field];
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sort.direction === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
  }, [items, search, filters, sort]);

  if (loading) {
    return <div className={styles.foundryContainer}>Loading...</div>;
  }
  return (
    <div className={`${styles.foundryContainer} max-w-7xl mx-auto`}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <Search className="w-5 h-5 text-gray-400" />            <label className="sr-only" htmlFor="search-input">Search items</label>
            <input
              id="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className={styles.searchInput}
            />
          </div>          <FilterButton
            onToggle={() => setShowFilters(!showFilters)}
            expanded={showFilters}
            className={showFilters ? styles.filterButtonActive : styles.filterButtonInactive}
          />
        </div>

        {showFilters && (
          <div className={styles.filters} role="region" aria-label="Filter options">
            <div className={styles.filterSection}>
              <h3 className="font-semibold mb-2">Item Types</h3>
              <div className="flex flex-wrap gap-2">
                {['Primary', 'Secondary', 'Melee', 'Warframe', 'Companion'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      itemTypes: prev.itemTypes.includes(type as ItemType)
                        ? prev.itemTypes.filter(t => t !== type)
                        : [...prev.itemTypes, type as ItemType]
                    }))}
                    className={`px-2 py-1 rounded text-sm ${
                      filters.itemTypes.includes(type as ItemType)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>            </div>

            <div className={styles.filterSection}>
              <h3 className="font-semibold mb-2">Sort By</h3>
              <div className="flex gap-2">
                <select
                  value={sort.field}
                  onChange={(e) => setSort(prev => ({ ...prev, field: e.target.value as keyof FoundryItem }))}
                  className="bg-gray-700 rounded px-2 py-1"
                  aria-label="Sort field"
                >
                  <option value="name">Name</option>
                  <option value="masteryRank">Mastery Rank</option>
                  <option value="itemType">Type</option>
                </select>
                <button
                  onClick={() => setSort(prev => ({ 
                    ...prev, 
                    direction: prev.direction === 'asc' ? 'desc' : 'asc' 
                  }))}
                  className="bg-gray-700 px-2 py-1 rounded"
                  aria-label={`Sort ${sort.direction === 'asc' ? 'descending' : 'ascending'}`}
                >
                  {sort.direction === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
            
            <div className={styles.filterSection}>
              <h3 className="font-semibold mb-2">Progress Filters</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, owned: prev.owned === true ? null : true }))}
                  className={`px-2 py-1 rounded text-sm ${
                    filters.owned === true ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                >
                  Owned
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, mastered: prev.mastered === true ? null : true }))}
                  className={`px-2 py-1 rounded text-sm ${
                    filters.mastered === true ? 'bg-yellow-600' : 'bg-gray-700'
                  }`}
                >
                  Mastered
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, vaulted: prev.vaulted === true ? null : true }))}
                  className={`px-2 py-1 rounded text-sm ${
                    filters.vaulted === true ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
                >
                  Vaulted
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.itemGrid}>
        {filteredItems.map(item => (
          <ItemCard
            key={item.id}
            item={item}            onToggleOwned={() => {
              setItems(items.map(i =>
                i.id === item.id
                  ? {
                      ...i,
                      userProgress: {
                        ...i.userProgress!,
                        owned: !i.userProgress?.owned,
                        mastered: i.userProgress?.mastered ?? false,
                        building: i.userProgress?.building ?? false,
                        favorited: i.userProgress?.favorited ?? false,
                        inventory: i.userProgress?.inventory ?? {}
                      }
                    }
                  : i
              ));
            }}
            onToggleMastered={() => {
              setItems(items.map(i =>
                i.id === item.id
                  ? {
                      ...i,
                      userProgress: {
                        ...i.userProgress!,
                        mastered: !i.userProgress?.mastered,
                        owned: i.userProgress?.owned ?? false,
                        building: i.userProgress?.building ?? false,
                        favorited: i.userProgress?.favorited ?? false,
                        inventory: i.userProgress?.inventory ?? {}
                      }
                    }
                  : i
              ));
            }}
            onToggleFavorite={() => {
              setItems(items.map(i =>
                i.id === item.id
                  ? {
                      ...i,
                      userProgress: {
                        ...i.userProgress!,
                        favorited: !i.userProgress?.favorited,
                        owned: i.userProgress?.owned ?? false,
                        mastered: i.userProgress?.mastered ?? false,
                        building: i.userProgress?.building ?? false,
                        inventory: i.userProgress?.inventory ?? {}
                      }
                    }
                  : i
              ));
            }}
            onUpdateInventory={(resourceName, value) => {
              setItems(items.map(i =>
                i.id === item.id
                  ? {
                      ...i,
                      userProgress: {
                        ...i.userProgress!,
                        owned: i.userProgress?.owned ?? false,
                        mastered: i.userProgress?.mastered ?? false,
                        building: i.userProgress?.building ?? false,
                        favorited: i.userProgress?.favorited ?? false,
                        inventory: {
                          ...i.userProgress?.inventory ?? {},
                          [resourceName]: {
                            owned: value,
                            needed: i.userProgress?.inventory?.[resourceName]?.needed ?? 0
                          }
                        }
                      }
                    }
                  : i
              ));
            }}
          />
        ))}
      </div>
    </div>
  );
}