'use client';
import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext';

export default function TaskManager() {
  const { tasks, addTask, deleteTask, updateTask, toggleComplete } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<number | null>(null);

  // ...existing task management functions...

  return (
    <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl border border-[#334155] space-y-6">
      {/* Add Task Form */}
      <div className="flex gap-3">
        {/* ...existing add task input and button... */}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {/* ...existing task management list... */}
      </div>
    </div>
  );
}
