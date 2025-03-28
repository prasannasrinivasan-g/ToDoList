'use client';
import TaskManager from '@/components/TaskManager';

export default function ManagePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#93c5fd] text-transparent bg-clip-text">
          Manage Tasks
        </h1>
        <p className="text-gray-400">Add, edit, and organize your tasks</p>
      </div>
      <TaskManager />
    </div>
  );
}
