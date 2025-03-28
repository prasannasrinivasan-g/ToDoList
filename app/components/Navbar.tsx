import Link from 'next/link';
import { FiHome, FiList, FiSettings } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-[#1e293b] border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-[#60a5fa] font-semibold text-lg">
              <FiList className="w-6 h-6" />
              <span className="bg-gradient-to-r from-[#60a5fa] to-[#93c5fd] text-transparent bg-clip-text">TodoApp</span>
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
