import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Trash2, Plus, X, Edit3 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    category: '',
    description: '',
    isNewArrival: false,
    isTopSelling: false,
    image: null
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentProductId(null);
    setFormData({
      name: '',
      price: '',
      oldPrice: '',
      category: '',
      description: '',
      isNewArrival: false,
      isTopSelling: false,
      image: null
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setIsEditing(true);
    setCurrentProductId(product._id);
    setFormData({
      name: product.name || '',
      price: product.price || '',
      oldPrice: product.oldPrice || '',
      category: product.category || '',
      description: product.description || '',
      isNewArrival: product.isNewArrival || false,
      isTopSelling: product.isTopSelling || false,
      image: null // New image is optional during edit
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('oldPrice', formData.oldPrice);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('isNewArrival', formData.isNewArrival);
      data.append('isTopSelling', formData.isTopSelling);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (isEditing) {
        const res = await axios.put(`${API_URL}/api/products/${currentProductId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setProducts(products.map(p => p._id === currentProductId ? res.data : p));
        alert("Product updated successfully!");
      } else {
        const res = await axios.post(`${API_URL}/api/products`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setProducts([res.data, ...products]);
        alert("Product added successfully!");
      }

      setIsModalOpen(false);
      setFormData({
        name: '',
        price: '',
        oldPrice: '',
        category: '',
        description: '',
        isNewArrival: false,
        isTopSelling: false,
        image: null
      });
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product. Check console for details.");
    }
  };

  if (loading) return <div className="p-6 text-slate-200">Loading products...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#0f172a] min-h-screen text-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Product Management</h1>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs bg-purple-500/15 text-purple-400 px-3 py-1.5 rounded-lg border border-purple-500/20 font-medium">
            Total Products: {products.length}
          </span>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus size={16} /> Add New Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-[#1e293b] rounded-2xl shadow-xl border border-slate-800">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-700/60 text-slate-400 text-xs uppercase tracking-wider bg-slate-800/40">
              <th className="py-3 sm:py-4 px-4 sm:px-6">#</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Product Details</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Category</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Price</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6">Tags</th>
              <th className="py-3 sm:py-4 px-4 sm:px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">No products found in database.</td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-400 font-medium">
                    {(index + 1).toString().padStart(2, '0')}
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      {product.image ? (
                        <img 
                          src={product.image.startsWith('http') || product.image.startsWith('data:') ? product.image : `${API_URL}/${product.image}`}
                          alt={product.name} 
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover border border-slate-700 shrink-0" 
                        />
                      ) : (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm shrink-0 border border-purple-500/30">
                          <Package size={16} />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-slate-200">{product.name}</div>
                        <div className="text-[10px] sm:text-xs text-slate-500 font-mono">ID: {product._id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-slate-300">
                    <span className="px-2.5 py-1 text-[11px] sm:text-xs rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {product.category || 'General'}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-emerald-400">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-[11px] sm:text-xs text-slate-500 line-through">${product.oldPrice}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="flex flex-wrap gap-1.5">
                      {product.isNewArrival && (
                        <span className="px-2 py-0.5 text-[10px] rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">New</span>
                      )}
                      {product.isTopSelling && (
                        <span className="px-2 py-0.5 text-[10px] rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">Top Selling</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenEditModal(product)}
                        className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 rounded-lg transition-colors inline-flex items-center justify-center border border-blue-500/20"
                        title="Edit Product"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg transition-colors inline-flex items-center justify-center border border-rose-500/20" 
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-[#1e293b] border border-slate-800 rounded-2xl w-full max-w-xl p-4 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800">
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Gradient Graphic T-shirt"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    name="price" 
                    required
                    value={formData.price} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    placeholder="145"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Old Price ($) [Optional]</label>
                  <input 
                    type="number" 
                    name="oldPrice" 
                    value={formData.oldPrice} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    placeholder="180"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <input 
                  type="text" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. T-shirts, Casual"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                <textarea 
                  name="description" 
                  rows="3"
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="Product description..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Product Image</label>
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-3 sm:p-4 text-center bg-[#0f172a] hover:border-blue-500 transition-colors">
                  <input 
                    type="file" 
                    name="image" 
                    onChange={handleFileChange} 
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300">
                  <input 
                    type="checkbox" 
                    name="isNewArrival" 
                    checked={formData.isNewArrival} 
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded bg-[#0f172a] border-slate-700 text-blue-600 focus:ring-0"
                  />
                  New Arrival
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-300">
                  <input 
                    type="checkbox" 
                    name="isTopSelling" 
                    checked={formData.isTopSelling} 
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded bg-[#0f172a] border-slate-700 text-blue-600 focus:ring-0"
                  />
                  Top Selling
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                >
                  {isEditing ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}