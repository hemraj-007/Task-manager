'use client'
import { useState } from "react";

// Define the Task interface to specify the structure of the task
interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface TaskFormProps {
  onAdd: (newTask: Task) => void;
  task?: Task; // Optional task prop for editing
}

export default function TaskForm({ onAdd, task }: TaskFormProps) {
  const [title, setTitle] = useState(task ? task.title : ''); // Pre-fill if task exists
  const [description, setDescription] = useState(task ? task.description : ''); // Pre-fill if task exists
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(task ? task.priority : 'low'); // Pre-fill if task exists

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: task ? task.id : Date.now(), // Keep the same ID if editing
      title,
      description,
      priority,
      completed: task ? task.completed : false, // Preserve completed state if editing
    };
    onAdd(newTask);
    setTitle('');
    setDescription('');
    setPriority('low');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Task Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Priority</label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')} // Assert the value type
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}
