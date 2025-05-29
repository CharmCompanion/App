interface Props {
  goals: any[];
}

export default function GoalTracker({ goals }: Props) {
  return (
    <div className="space-y-4">
      {goals.map((goal, index) => (
        <div key={index} className="p-4 bg-zinc-800 border border-zinc-600 rounded">
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          <p className="text-sm text-zinc-400">{goal.description}</p>
        </div>
      ))}
    </div>
  );
}