import React from 'react';
import '../styles/nightwave.css';
import rewards from '../data/rewards.json';

interface Props {
  rank: number;
}

export const RankRewardsBar: React.FC<Props> = ({ rank }) => {
  return (
    <div className="rank-reward-bar reward-bar">
      {rewards.map((reward) => (
        <div
          key={`rank-${reward.rank}`}
          className={`reward ${reward.rank <= rank ? 'unlocked' : ''}`}
        >
          <img src={`/assets/nightwave/Rewards/${reward.icon}`} alt={reward.name} />
          <span className="tier-num">{reward.rank}</span>
        </div>
      ))}
    </div>
  );
};
