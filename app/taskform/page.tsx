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
        { id: 3, title: 'Complete React Project', description: 'Finish React project with all features.', priority: 'high', completed: false },
        { id: 4, title: 'Write Documentation', description: 'Complete the project documentation.', priority: 'low', completed: false },
    ];

    // State to manage tasks, modal visibility, original tasks, and sorting state
    const [tasks, setTasks] = useState<any[]>([]);
    const [originalTasks, setOriginalTasks] = useState<any[]>([]); // Store original task order
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load tasks from local storage or set default tasks if local storage is empty
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            setTasks(parsedTasks); // Load saved tasks from local storage
            setOriginalTasks(parsedTasks); // Save the original order of tasks
        } else {
            setTasks(defaultTasks); // If no tasks in local storage, use default tasks
            setOriginalTasks(defaultTasks); // Save the default task order
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
        setOriginalTasks([...tasks, newTask]); // Update original task list
        setIsModalOpen(false); // Close modal after task creation
    };

    // Sort tasks by priority when the button is clicked
    const handleSortTasks = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
            const priorityOrder: { [key: string]: number } = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        setTasks(sortedTasks);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Button to open the modal */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4"
            >
                Create Task
            </button>

            {/* Button to sort tasks by priority */}
            <button
                onClick={handleSortTasks}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4"
            >
                Sort by Priority
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
