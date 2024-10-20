'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

export default function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                const tasks: Task[] = JSON.parse(savedTasks);
                const foundTask = tasks.find((task) => task.id === Number(id));
                setTask(foundTask || null);
            }
        }
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    // Function to get chip color based on priority
    const getPriorityChipStyles = (priority: string) => {
        if (priority === 'high') return 'bg-red-500 text-white';
        if (priority === 'medium') return 'bg-yellow-500 text-black';
        return 'bg-green-500 text-white'; // For low priority
    };

    return (
        <div className="container mx-auto p-4">
            {/* Back Button */}
            <button
                onClick={() => router.push('/taskform')}
                className="mb-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
                ← Back to Task Form
            </button>

            <h1 className="text-2xl font-bold mb-4">Task Details</h1>
            <div className="bg-white shadow p-6 rounded-lg">
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>

                {/* Priority Display with Chips */}
                <p><strong>Priority:</strong>
                    <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${getPriorityChipStyles(task.priority)}`}
                    >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                </p>

                <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
            </div>
        </div>
    );
}
