// src/api/warframeClient.ts

export const BASE_URL = 'https://api.warframestat.us/pc';

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

// ---------- Public Methods ----------

// Global state
export const getWorldState = () => fetchFromAPI<any>('worldstate');

// Alerts
export const getAlerts = () => fetchFromAPI<any>('alerts');

// Nightwave
export const getNightwave = () => fetchFromAPI<any>('nightwave');

// Sorties
export const getSorties = () => fetchFromAPI<any>('sortie');

// Fissures
export const getFissures = () => fetchFromAPI<any>('fissures');

// Events
export const getEvents = () => fetchFromAPI<any>('events');

// News
export const getNews = () => fetchFromAPI<any>('news');

// Invasions
export const getInvasions = () => fetchFromAPI<any>('invasions');

// Void Trader (Baro)
export const getVoidTrader = () => fetchFromAPI<any>('voidTrader');

// Arbitration
export const getArbitration = () => fetchFromAPI<any>('arbitration');

// Daily Deals
export const getDailyDeals = () => fetchFromAPI<any>('dailyDeals');

// Earth Cycle
export const getEarthCycle = () => fetchFromAPI<any>('earthCycle');

// Cetus Cycle
export const getCetusCycle = () => fetchFromAPI<any>('cetusCycle');

// Fortuna Cycle
export const getVallisCycle = () => fetchFromAPI<any>('vallisCycle');

// Cambion Cycle (Deimos)
export const getCambionCycle = () => fetchFromAPI<any>('cambionCycle');

// Steel Path Missions
export const getSteelPath = () => fetchFromAPI<any>('steelPath');

// Syndicate Missions
export const getSyndicateMissions = () => fetchFromAPI<any>('syndicateMissions');

