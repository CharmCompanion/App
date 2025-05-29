import { useEffect, useState } from 'react';
import { getPaths } from '../firebase/paths';
import { useAuth } from '../hooks/useAuth';
import PathCard from '../components/path/PathCard';

export default function PathPlanner() {
  const { user } = useAuth();
  const [paths, setPaths] = useState<any[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getPaths(user.uid).then(setPaths);
    }
  }, [user]);

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Path Planner</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path) => (
          <PathCard key={path.id} data={path} />
        ))}
      </div>
    </div>
  );
}