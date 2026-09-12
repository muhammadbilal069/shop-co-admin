import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden">
      
      {/* Mobile Top Header with Hamburger Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1e293b] border-b border-slate-800 flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2 text-white font-bold tracking-wide">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span> ShopCo Admin
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl border border-slate-700"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Drawer: Responsive handler */}
      <div className={`
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Main Content Render */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-16 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
}