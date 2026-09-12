import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Package, ShoppingCart } from 'lucide-react';

export default function Sidebar({ onClose }) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <aside className="w-64 bg-[#1e293b] border-r border-slate-800 h-full p-4 flex flex-col">
      <div className="text-xl font-bold text-white mb-8 px-2 tracking-wide hidden md:flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500"></span> ShopCo Admin
      </div>
      <nav className="space-y-1 mt-12 md:mt-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}