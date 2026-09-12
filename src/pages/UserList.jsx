import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Calendar, UserCheck, Trash2, Shield } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users`);
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/api/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user");
      }
    }
  };

  if (loading) return <div className="p-6 text-slate-200">Loading users...</div>;

  return (
    <div className="p-6 bg-[#0f172a] min-h-screen text-slate-200">
      <h1 className="text-xl font-bold mb-6">Registered Users</h1>
      <div className="overflow-x-auto bg-[#1e293b] rounded-xl shadow-xl border border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-700/60 text-slate-400 text-xs uppercase tracking-wider bg-slate-800/40">
              <th className="py-4 px-6">#</th>
              <th className="py-4 px-6">User Details</th>
              <th className="py-4 px-6">Email Address</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Joined Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-sm">
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-400">No users found in database.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 text-slate-400 font-medium">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-500/30">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">{user.name}</div>
                        <div className="text-xs text-slate-500 font-mono">ID: {user._id.slice(-6)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-slate-400 shrink-0" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium inline-flex items-center gap-1.5 ${
                      user.role === 'admin' 
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      <Shield size={12} /> {user.role || 'customer'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={14} className="text-slate-500 shrink-0" />
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium inline-flex items-center gap-1.5 ${
                      (user.status || 'Active') === 'Active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      <UserCheck size={12} /> {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                      onClick={() => handleDelete(user._id)}
                      className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg transition-colors inline-flex items-center justify-center border border-rose-500/20" 
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}