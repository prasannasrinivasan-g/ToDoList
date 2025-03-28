'use client';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#93c5fd] text-transparent bg-clip-text">
          Your Tasks Overview
        </h1>
        <p className="text-gray-400">View and track your tasks</p>
      </div>
      <TaskList />
    </div>
  );
}
