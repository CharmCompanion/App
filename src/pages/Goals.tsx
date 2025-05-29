import { useEffect, useState } from 'react';
import { getGoals } from '../firebase/goals';
import { useAuth } from '../hooks/useAuth';
import GoalTracker from '../components/goals/GoalTracker';

export default function GoalsPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getGoals(user.uid).then(setGoals);
    }
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">My Goals</h1>
      <GoalTracker goals={goals} />
    </div>
  );
}