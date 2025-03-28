'use client';
import { useState } from 'react';
import { FiSearch, FiCheck } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext';

export default function TaskList() {
  const { tasks, toggleComplete } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });

  return (
    <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl border border-[#334155]">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* ...existing search input and filter select... */}
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-4 bg-[#0f172a] p-4 rounded-xl border border-[#334155] transition-all duration-200 hover:border-[#60a5fa] hover:shadow-lg group"
            >
              <button
                onClick={() => toggleComplete(task.id)}
                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors duration-200
                  ${task.completed ? 'bg-[#60a5fa] border-[#60a5fa]' : 'border-[#334155]'}`}
              >
                {task.completed && <FiCheck className="text-white text-sm" />}
              </button>
              <span className={`flex-1 text-gray-100 transition-all duration-200 ${task.completed ? 'text-gray-500 line-through' : 'group-hover:text-[#60a5fa]'}`}>
                {task.title}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}
