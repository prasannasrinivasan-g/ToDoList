import { useState } from 'react';
import { FiSearch, FiCheck } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Homepage() {
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
    <main className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#93c5fd] text-transparent bg-clip-text">
          Your Tasks
        </h1>
        <p className="text-gray-400">Stay organized and productive</p>
      </div>

      <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl border border-[#334155]">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0f172a] border-[#334155] text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all duration-200"
            />
            <FiSearch className="absolute left-3 top-3.5 text-gray-500" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-3 rounded-xl bg-[#0f172a] border-[#334155] text-gray-100 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-200"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

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
            <div className="text-center py-12 px-4">
              <p className="text-gray-400 text-lg mb-2">
                {searchQuery ? 'No matching tasks found' : 'Your task list is empty'}
              </p>
              <p className="text-gray-500 text-sm">
                {searchQuery ? 'Try adjusting your search' : 'Add tasks in the management section'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
