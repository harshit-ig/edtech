import React, { useState, useEffect } from 'react';
import { adminApi } from '../lib/api';
import { Plus, Edit2, Trash2, Save, X, HelpCircle } from 'lucide-react';

interface FAQ {
  _id: string;
  id: number;
  question: string;
  answer: string;
}

const FAQs: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Partial<FAQ>>({});

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAll('faqs');
      if (response.success) {
        setFaqs(Array.isArray(response.data) ? response.data : []);
      } else {
        setError(response.message || 'Failed to fetch FAQs');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditData(faq);
    setEditingId(faq._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingId || !editData) return;

    try {
      const response = await adminApi.update('faqs', editingId, editData);
      if (response.success) {
        fetchFAQs();
        setShowModal(false);
        setEditingId(null);
        setEditData({});
      } else {
        setError(response.message || 'Failed to update FAQ');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const response = await adminApi.delete('faqs', id);
      if (response.success) {
        fetchFAQs();
      } else {
        setError(response.message || 'Failed to delete FAQ');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete FAQ');
    }
  };

  const handleCreate = () => {
    const nextId = Math.max(...faqs.map(f => f.id), 0) + 1;
    setEditData({
      id: nextId,
      question: '',
      answer: ''
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleCreateSave = async () => {
    try {
      const response = await adminApi.create('faqs', editData);
      if (response.success) {
        fetchFAQs();
        setShowModal(false);
        setEditData({});
      } else {
        setError(response.message || 'Failed to create FAQ');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create FAQ');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-600 mt-2">Manage frequently asked questions</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* FAQs List */}
      {faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq._id} className="card">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">#{faq.id}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-12">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first FAQ</p>
            <button onClick={handleCreate} className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Add FAQ
            </button>
          </div>
        </div>
      )}

      {/* Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="card-header flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {editingId ? 'Edit FAQ' : 'Create FAQ'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="card-body space-y-4">
              <div className="form-group">
                <label className="form-label">ID</label>
                <input
                  type="number"
                  className="form-input"
                  value={editData.id || ''}
                  onChange={(e) => setEditData({ ...editData, id: Number(e.target.value) })}
                  placeholder="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Question</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.question || ''}
                  onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                  placeholder="What is your refund policy?"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Answer</label>
                <textarea
                  className="form-input"
                  rows={4}
                  value={editData.answer || ''}
                  onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                  placeholder="Provide a detailed answer to the question..."
                />
              </div>
            </div>

            <div className="card-footer flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={editingId ? handleSave : handleCreateSave}
                className="btn btn-primary"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;
