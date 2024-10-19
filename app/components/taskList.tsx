import Link from 'next/link';

interface TaskListProps {
    tasks: any[];
    setTasks: (tasks: any[]) => void;
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const toggleComplete = (taskId: number) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <>
            {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100 cursor-pointer">
                    <td className="border px-4 py-2">
                        <Link href={`/task/${task.id}`}>
                            {task.title}
                        </Link>
                    </td>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2">{task.priority}</td>
                    <td className="border px-4 py-2">{task.completed ? 'Completed' : 'Pending'}</td>
                    <td className="border px-4 py-2">
                        <button
                            onClick={() => toggleComplete(task.id)}
                            className={`${task.completed ? 'bg-yellow-500' : 'bg-green-500'} hover:bg-green-700 text-white font-bold py-1 px-2 rounded`}
                        >
                            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                        </button>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
}
