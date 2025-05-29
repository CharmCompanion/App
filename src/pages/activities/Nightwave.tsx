import React, { useEffect, useState } from 'react';
import { getNightwaveData } from '../../api/warframeClient';
import { ProcessedAct } from '../../types/nightwave';
import RankRewardsBar from '../../components/Nightwave/RankRewardsBar';
import PrestigeBar from '../../components/Nightwave/PrestigeBar';
import MissedActsTab from '../../components/Nightwave/MissedActsTab';
import '../../styles/nightwave.css';

const Nightwave = () => {
  const [acts, setActs] = useState<ProcessedAct[]>([]);
  const [missedActs, setMissedActs] = useState<ProcessedAct[]>([]);
  const [rank, setRank] = useState<number>(0);
  const [prestige, setPrestige] = useState<number>(0);
  const [view, setView] = useState<'current' | 'missed'>('current');

  useEffect(() => {
    const fetchNightwave = async () => {
      const data = await getNightwaveData();

      if (data) {
        const allActs = [...data.activeChallenges, ...data.possibleChallenges];
        const now = new Date();

        const processedActs: ProcessedAct[] = allActs.map((act) => ({
          id: act.id,
          title: act.title,
          description: act.desc,
          type: act.isElite ? 'elite' : act.isDaily ? 'daily' : 'weekly',
          xp: act.reputation,
          icon: act.icon,
          completed: false,
          expiry: new Date(act.expiry),
          isActive: act.active
        }));

        setActs(processedActs.filter((a) => a.isActive && a.expiry > now));
        setMissedActs(processedActs.filter((a) => !a.isActive && a.expiry < now));

        // Placeholder logic
        setRank(Math.floor(data.params.totalStanding / 10000));
        setPrestige(data.params.prestige || 0);
      }
    };

    fetchNightwave();
  }, []);

  return (
    <div className="nightwave-container">
      <h2>Nora’s Mix Vol. {9}</h2>
      <p>{rank * 10000} / 300,000 XP</p>

      {rank < 30 ? (
        <RankRewardsBar rank={rank} />
      ) : (
        <PrestigeBar prestigeLevel={prestige} />
      )}

      <div className="nightwave-tabs">
        <button
          className={view === 'current' ? 'active' : ''}
          onClick={() => setView('current')}
        >
          Current Acts ({acts.length})
        </button>
        <button
          className={view === 'missed' ? 'active' : ''}
          onClick={() => setView('missed')}
        >
          Recoverable Acts ({missedActs.length})
        </button>
      </div>

      <div className="acts-list">
        {(view === 'current' ? acts : missedActs).map((act) => (
          <div key={act.id} className="act-card">
            <img src={act.icon} alt={act.title} className="act-icon" />
            <div className="act-content">
              <h4>{act.title}</h4>
              <p>{act.description}</p>
              <p className="type">{act.type.toUpperCase()}</p>
              <span className="xp">{act.xp.toLocaleString()} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nightwave;
