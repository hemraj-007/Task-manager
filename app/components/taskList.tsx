'use client';
import { useState } from 'react';
import Link from 'next/link';
import Modal from './model';
import TaskForm from './taskForm';
import { useRouter } from 'next/navigation';

interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const router = useRouter();

    // Delete task
    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    // Toggle task completion status
    const toggleComplete = (taskId: number) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    // Open modal to edit task
    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setIsEditModalOpen(true);
    };

    // Update the task after editing
    const handleUpdateTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        setIsEditModalOpen(false);
    };

    // Handle row click to navigate to the task details page
    const handleRowClick = (taskId: number) => {
        router.push(`/task/${taskId}`);
    };

    // Function to get chip color based on priority
    const getPriorityChipStyles = (priority: string) => {
        if (priority === 'high') return 'bg-red-500 text-white';
        if (priority === 'medium') return 'bg-yellow-500 text-black';
        return 'bg-green-500 text-white';
    };

    return (
        <>
            {tasks.map((task) => (
                <tr
                    key={task.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(task.id)} // Row click handler
                >
                    <td className="border px-4 py-2">
                        <Link href={`/task/${task.id}`} className="hover:underline">
                            {task.title}
                        </Link>
                    </td>
                    <td className="border px-4 py-2">{task.description}</td>
                    <td className="border px-4 py-2">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityChipStyles(task.priority)}`}
                        >
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                    </td>
                    <td className="border px-4 py-2">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}
                        >
                            {task.completed ? 'Completed' : 'Pending'}
                        </span>
                    </td>
                    <td className="border px-4 py-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();  // Prevent row click when toggling task
                                toggleComplete(task.id);
                            }}
                            className={`${task.completed ? 'bg-yellow-500' : 'bg-green-500'
                                } hover:bg-green-700 text-white font-bold py-1 px-2 rounded`}
                        >
                            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();  // Prevent row click when deleting task
                                deleteTask(task.id);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                        >
                            Delete
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();  // Prevent row click when editing task
                                handleEditTask(task);
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
                        >
                            Edit
                        </button>
                    </td>
                </tr>
            ))}

            {/* Modal for editing the task */}
            {isEditModalOpen && taskToEdit && (
                <Modal onClose={() => setIsEditModalOpen(false)}>
                    <TaskForm
                        task={taskToEdit} // Pass the task to edit to the form
                        onAdd={handleUpdateTask} // Handle updating the task
                    />
                </Modal>
            )}
        </>
    );
}
