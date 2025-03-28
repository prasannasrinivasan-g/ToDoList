'use client';
import { useState, useMemo } from 'react';
import { FiSearch, FiCheck, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext';

export default function TaskList() {
  const { tasks, toggleComplete } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const { filteredTasks, stats } = useMemo(() => {
    const filtered = tasks
      .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
      });

    const stats = {
      total: filtered.length,
      completed: filtered.filter(t => t.completed).length,
      pending: filtered.filter(t => !t.completed).length
    };

    return { filteredTasks: filtered, stats };
  }, [tasks, searchQuery, filter]);

  return (
    <div className="bg-[#1e293b]/80 backdrop-blur-lg rounded-2xl shadow-xl border border-[#334155]">
      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 p-6 border-b border-[#334155]">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#60a5fa]">{stats.total}</p>
          <p className="text-gray-400 text-sm">Total Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
          <p className="text-gray-400 text-sm">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
          <p className="text-gray-400 text-sm">Pending</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-6 border-b border-[#334155]">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0f172a]/70 border-[#334155] text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all duration-200"
            />
            <FiSearch className="absolute left-4 top-4 text-gray-500 text-lg" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-6 py-3.5 rounded-xl bg-[#0f172a]/70 border-[#334155] text-gray-100 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-200 cursor-pointer hover:bg-[#1e293b]/50"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="group flex items-center gap-4 bg-[#0f172a]/70 p-5 rounded-xl border border-[#334155] transition-all duration-300 hover:border-[#60a5fa] hover:shadow-lg animate-slide-in"
              >
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="relative group-hover:scale-110 transition-all duration-300"
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center
                    ${task.completed ? 'bg-[#60a5fa] border-[#60a5fa]' : 'border-[#334155]'}`}>
                    {task.completed && <FiCheck className="text-white text-sm" />}
                  </div>
                  <div className="absolute inset-0 bg-[#60a5fa] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
                
                <div className="flex-1 flex flex-col">
                  <span className={`text-lg transition-all duration-300 ${
                    task.completed ? 'text-gray-500 line-through' : 'group-hover:text-[#60a5fa]'
                  }`}>
                    {task.title}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    {task.completed ? 
                      <><FiCheckCircle className="text-green-500" /> Completed</> : 
                      <><FiClock className="text-yellow-500" /> Pending</>
                    }
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4 animate-fade-in">
              <p className="text-gray-400 text-xl mb-3">
                {searchQuery ? 'No matching tasks found' : 'Your task list is empty'}
              </p>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search' : 'Start by adding tasks in the management section'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
