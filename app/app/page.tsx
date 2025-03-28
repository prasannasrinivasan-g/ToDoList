'use client';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 px-4 py-8 sm:py-12">
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#60a5fa] via-[#93c5fd] to-[#60a5fa] text-transparent bg-clip-text bg-size-200 animate-gradient">
          Your Tasks Overview
        </h1>
        <p className="text-gray-400 text-lg">Track and manage your daily progress</p>
      </div>
      <div className="transform transition-all duration-500 hover:scale-[1.01]">
        <TaskList />
      </div>
    </div>
  );
}
