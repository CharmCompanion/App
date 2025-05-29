import PathChecklist from './PathChecklist';

interface Props {
  data: any;
}

export default function PathCard({ data }: Props) {
  return (
    <div className="p-4 border border-blue-700 bg-zinc-900 rounded shadow">
      <h2 className="text-xl font-semibold text-white mb-2">{data.title}</h2>
      <p className="text-sm text-zinc-400 mb-4">{data.description}</p>
      <PathChecklist tasks={data.tasks} pathId={data.id} />
    </div>
  );
}