interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const handleCompleteToggle = () => {
    onUpdate({ ...task, completed: !task.completed });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{task.title}</td>
      <td className="border px-4 py-2">{task.description}</td>
      <td className="border px-4 py-2">{task.priority}</td>
      <td className="border px-4 py-2">
        {task.completed ? 'Completed' : 'Pending'}
      </td>
      <td className="border px-4 py-2">
        <button
          onClick={handleCompleteToggle}
          className={`${task.completed ? 'bg-yellow-500' : 'bg-green-500'
            } hover:bg-green-700 text-white font-bold py-1 px-2 rounded`}
        >
          {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
