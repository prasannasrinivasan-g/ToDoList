import Link from 'next/link';
import { FiHome, FiList, FiZap } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-[#1e293b] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] opacity-75 rounded-xl group-hover:opacity-100 transition-all duration-300" />
                <FiZap className="w-5 h-5 text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Taskify<span className="text-[#60a5fa]">.</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/" 
              className="flex items-center gap-2 text-gray-300 hover:text-[#60a5fa] transition-all duration-200 hover:scale-105"
            >
              <FiHome className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
            <Link href="/management" 
              className="flex items-center gap-2 text-gray-300 hover:text-[#60a5fa] transition-all duration-200 hover:scale-105"
            >
              <FiList className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Manage Tasks</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
