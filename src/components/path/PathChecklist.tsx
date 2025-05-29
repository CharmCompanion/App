import { useState } from 'react';
import { updateTaskStatus } from '../../firebase/paths';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  tasks: any[];
  pathId: string;
}

export default function PathChecklist({ tasks, pathId }: Props) {
  const { user } = useAuth();
  const [taskList, setTaskList] = useState(tasks);

  const toggleTask = async (index: number) => {
    const updated = [...taskList];
    updated[index].complete = !updated[index].complete;
    setTaskList(updated);
    if (user?.uid) {
      await updateTaskStatus(user.uid, pathId, index, updated[index].complete);
    }
  };

  return (
    <ul className="space-y-2">
      {taskList.map((task, i) => (
        <li
          key={i}
          className={`flex items-center justify-between p-2 rounded ${
            task.complete ? 'bg-green-700' : 'bg-zinc-800'
          }`}
        >
          <span>{task.label}</span>
          <button
            className="text-sm text-white border border-white rounded px-2 py-1"
            onClick={() => toggleTask(i)}
          >
            {task.complete ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
}