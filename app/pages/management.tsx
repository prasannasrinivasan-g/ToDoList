import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import { useTasks } from '../context/TaskContext';

export default function Management() {
  const { tasks, addTask, deleteTask, updateTask, toggleComplete } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<number | null>(null);

  const handleAddTask = () => {
    try {
      if (!newTask.trim()) return;
      addTask(newTask);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#93c5fd] text-transparent bg-clip-text">
          Manage Tasks
        </h1>
        <p className="text-gray-400">Add, edit, and organize your tasks</p>
      </div>

      <div className="bg-[#1e293b] rounded-2xl p-6 shadow-xl border border-[#334155] space-y-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="flex-1 px-4 py-3 rounded-xl bg-[#0f172a] border-[#334155] text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleAddTask}
            className="px-6 py-3 bg-[#60a5fa] text-white rounded-xl hover:bg-[#3b82f6] transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 bg-[#0f172a] p-4 rounded-xl border border-[#334155] shadow-sm transition-all hover:shadow-md hover:border-[#475569]"
            >
              <button
                onClick={() => toggleComplete(task.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${task.completed ? 'bg-[#10b981] border-[#10b981]' : 'border-[#475569]'}`}
              >
                {task.completed && <FiCheck className="text-gray-100 text-sm" />}
              </button>
              
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => updateTask(task.id, e.target.value)}
                  onBlur={() => setEditingTask(null)}
                  autoFocus
                  className="flex-1 px-2 py-1 bg-[#1e293b] border-[#334155] rounded text-gray-100"
                />
              ) : (
                <span className={`flex-1 text-gray-100 ${task.completed ? 'text-gray-400 line-through' : ''}`}>
                  {task.title}
                </span>
              )}

              <button
                onClick={() => setEditingTask(task.id)}
                className="text-gray-400 hover:text-[#60a5fa] transition-colors"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-[#ef4444] transition-colors"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              No tasks yet. Add your first task!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
