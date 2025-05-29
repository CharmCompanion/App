import React from 'react';
import '../styles/nightwave.css';
import prestige from '../data/prestige.json';

interface Props {
  prestigeLevel: number;
}

export const PrestigeBar: React.FC<Props> = ({ prestigeLevel }) => {
  return (
    <div className="prestige-bar reward-bar">
      {prestige.map((reward) => (
        <div
          key={`prestige-${reward.rank}`}
          className={`reward ${reward.rank <= prestigeLevel ? 'unlocked' : ''}`}
        >
          <img src={`/assets/nightwave/Rewards/${reward.icon}`} alt={reward.name} />
          <span className="tier-num">{reward.rank}</span>
        </div>
      ))}
    </div>
  );
};
