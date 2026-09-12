import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://shop-co-backend-sigma.vercel.app/api/orders');
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`https://shop-co-backend-sigma.vercel.app/api/orders/${id}/status`, { status: newStatus });
      setOrders(orders.map(order => order._id === id ? res.data : order));
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-6 text-slate-200">Loading orders...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#0f172a] min-h-screen text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Order Management</h1>
        <span className="text-xs bg-emerald-500/15 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-medium">
          Total Orders: {orders.length}
        </span>
      </div>

      {/* Table Container with Horizontal Scroll for Small Screens */}
      <div className="overflow-x-auto bg-[#1e293b] rounded-2xl shadow-xl border border-slate-800">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-700/60 text-slate-400 text-xs uppercase tracking-wider bg-slate-800/40">
              <th className="py-3 sm:py-4 px-4 sm:px-6">Order ID</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Customer</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Items Count</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Total Price</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Status</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6 text-center">Actions / Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">No orders found in database.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-mono text-xs text-slate-400">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="font-semibold text-slate-200">{order.user?.name || 'Guest User'}</div>
                    <div className="text-[11px] sm:text-xs text-slate-500">{order.user?.email || 'No email'}</div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-300">
                    {order.orderItems?.length || 0} items
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 font-mono font-semibold text-emerald-400">
                    ${order.totalPrice}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <span className={`px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs rounded-full font-medium inline-flex items-center gap-1.5 ${
                      order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      order.status === 'Processing' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      order.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <Clock size={12} /> {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-center">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-[#0f172a] border border-slate-700 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
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