'use client';
import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiCalendar, FiStar } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext';

export default function TaskManager() {
  const { tasks, addTask, deleteTask, updateTask, toggleComplete } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<number | null>(null);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask(newTask);
    setNewTask('');
  };

  return (
    <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-2xl shadow-2xl border border-[#334155] overflow-hidden">
      {/* Task Input Section */}
      <div className="p-6 bg-[#1e293b]/50 border-b border-[#334155]">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[#60a5fa]">Add New Task</h2>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                className="w-full pl-5 pr-4 py-4 rounded-xl bg-[#0f172a]/70 border-2 border-[#334155] text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all duration-200"
              />
              <FiCalendar className="absolute right-4 top-4 text-gray-500" />
            </div>
            <button
              onClick={handleAddTask}
              className="px-8 py-4 bg-[#60a5fa] text-white rounded-xl hover:bg-[#3b82f6] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
            >
              <FiPlus className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Task List Section */}
      <div className="p-6">
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={task.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="group flex items-center gap-4 bg-[#1e293b]/50 p-5 rounded-xl border-2 border-[#334155] transition-all duration-300 hover:border-[#60a5fa] hover:shadow-lg animate-slide-in relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa]/0 to-[#60a5fa]/0 group-hover:from-[#60a5fa]/5 group-hover:to-transparent transition-all duration-500" />
                
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="relative z-10 transform transition-transform duration-300 group-hover:scale-110"
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors duration-300
                    ${task.completed ? 'bg-[#60a5fa] border-[#60a5fa]' : 'border-[#475569] group-hover:border-[#60a5fa]'}`}
                  >
                    {task.completed && <FiCheck className="text-white text-sm" />}
                  </div>
                </button>

                {editingTask === task.id ? (
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                    onBlur={() => setEditingTask(null)}
                    autoFocus
                    className="flex-1 px-4 py-2 bg-[#0f172a]/70 border-2 border-[#60a5fa] rounded-lg text-gray-100 focus:ring-2 focus:ring-[#60a5fa] transition-all duration-200"
                  />
                ) : (
                  <div className="flex-1 flex items-center gap-3">
                    <span className={`text-lg transition-all duration-300 ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-100'
                    }`}>
                      {task.title}
                    </span>
                    {!task.completed && (
                      <FiStar className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                )}

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => setEditingTask(task.id)}
                    className="p-2 text-gray-400 hover:text-[#60a5fa] transition-colors duration-300 hover:scale-110 transform"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300 hover:scale-110 transform"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4 bg-[#1e293b]/30 rounded-xl border-2 border-dashed border-[#334155]">
              <FiPlus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No tasks yet</p>
              <p className="text-gray-500 text-sm">Add your first task using the form above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
