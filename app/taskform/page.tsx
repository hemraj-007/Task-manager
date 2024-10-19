'use client';
import { useState, useEffect } from 'react';
import TaskForm from '../components/taskForm';
import TaskList from '../components/taskList';
import Modal from '../components/model';

export default function Home() {
    // Default tasks to be shown initially if local storage is empty
    const defaultTasks = [
        { id: 1, title: 'Sample Task 1', description: 'Task description', priority: 'high', completed: false },
        { id: 2, title: 'Sample Task 2', description: 'Another task description', priority: 'medium', completed: false },
        { id: 3, title: 'Complete React Project', description: 'Finish React project with all features.', priority: 'high', completed: false }
    ];

    // State to manage tasks and modal visibility
    const [tasks, setTasks] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load tasks from local storage or set default tasks if local storage is empty
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks)); // Load saved tasks from local storage
        } else {
            setTasks(defaultTasks); // If no tasks in local storage, use default tasks
        }
    }, []);

    // Update local storage whenever tasks change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
        }
    }, [tasks]);

    // Add new task to the task list
    const addTask = (newTask: any) => {
        setTasks([...tasks, newTask]);
        setIsModalOpen(false); // Close modal after task creation
    };

    return (
        <div className="container mx-auto p-4">
            {/* Button to open the modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Create Task
            </button>

            {/* Modal for creating a task */}
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <TaskForm onAdd={addTask} />
                </Modal>
            )}

            {/* Table for displaying tasks */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Priority</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TaskList tasks={tasks} setTasks={setTasks} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
