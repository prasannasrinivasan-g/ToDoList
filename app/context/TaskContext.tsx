'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, newTitle: string) => void;
  toggleComplete: (id: number) => void;
}

const STORAGE_KEY = 'todo-tasks';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoading]);

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const newTasks = [...tasks, { id: Date.now(), title: title.trim(), completed: false }];
    setTasks(newTasks);
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: number, newTitle: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(newTasks);
  };

  const toggleComplete = (id: number) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
