'use client'
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TaskDetail() {
    const { id } = useParams(); // Get the task ID from the URL
    const [task, setTask] = useState<any>(null);
    const router = useRouter(); // To handle navigation

    useEffect(() => {
        if (id) {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                const tasks = JSON.parse(savedTasks);
                const foundTask = tasks.find((task: any) => task.id === Number(id));
                setTask(foundTask);
            }
        }
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Back Button */}
            <button
                onClick={() => router.push('/taskform')} // Redirect to /taskform
                className="mb-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
            >
                ← Back to Task Form
            </button>

            <h1 className="text-2xl font-bold mb-4">Task Details</h1>
            <div className="bg-white shadow p-6 rounded-lg">
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}</p>
            </div>
        </div>
    );
}
