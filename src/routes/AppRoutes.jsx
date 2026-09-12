import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHome from '../components/DashboardHome';
import UserList from '../pages/UserList';
import ProductList from '../pages/ProductList';
import OrderList from '../pages/OrderList';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin" element={<DashboardHome />} />
      <Route path="/admin/users" element={<UserList />} />
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/orders" element={<OrderList />} />
      <Route path="/admin/products" element={<div className="p-8 text-slate-200">Product Management (Coming Soon)</div>} />
      <Route path="/admin/orders" element={<div className="p-8 text-slate-200">Order Management (Coming Soon)</div>} />
    </Routes>
  );
}