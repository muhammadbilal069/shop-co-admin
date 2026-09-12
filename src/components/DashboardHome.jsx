import React from 'react';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function DashboardHome() {
  const stats = [
    { title: 'Total Users', value: '1,245', icon: Users, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { title: 'Total Products', value: '342', icon: Package, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { title: 'Total Orders', value: '580', icon: ShoppingCart, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Total Revenue', value: '$45,200', icon: DollarSign, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  ];

  // Dummy chart data (Months and bar heights)
  const chartData = [
    { month: 'Jan', height: 'h-24', sales: '$3.2k' },
    { month: 'Feb', height: 'h-36', sales: '$5.1k' },
    { month: 'Mar', height: 'h-28', sales: '$4.0k' },
    { month: 'Apr', height: 'h-48', sales: '$7.8k' },
    { month: 'May', height: 'h-40', sales: '$6.2k' },
    { month: 'Jun', height: 'h-56', sales: '$9.4k' },
    { month: 'Jul', height: 'h-52', sales: '$8.5k' },
  ];

  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-medium">
          <TrendingUp size={14} /> +18.2% this month
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 rounded-2xl border border-slate-800 bg-[#1e293b] shadow-xl flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-100 mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl border ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dummy Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Sales Growth Overview</h3>
              <p className="text-xs text-slate-400">Monthly revenue performance metrics</p>
            </div>
            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">2026 Stats</span>
          </div>

          {/* Visual CSS Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 px-2 border-b border-slate-800">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                {/* Tooltip on hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-xs text-slate-200 px-2 py-1 rounded border border-slate-700 pointer-events-none">
                  {item.sales}
                </div>
                <div className={`w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg ${item.height} transition-all duration-300 group-hover:from-blue-500 group-hover:to-indigo-400 shadow-lg shadow-blue-500/10`}></div>
                <span className="text-xs text-slate-400 font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Activity / Recent status */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">System Status</h3>
            <p className="text-xs text-slate-400 mb-6">Real-time backend synchronization</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="text-sm text-slate-300">Database Connection</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="text-sm text-slate-300">API Gateway</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">Active (5000)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="text-sm text-slate-300">Auth Middleware</span>
                <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-medium">Secure</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>ShopCo Admin v1.0</span>
            <span className="text-blue-400 flex items-center gap-1 cursor-pointer hover:underline">Details <ArrowUpRight size={12} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}