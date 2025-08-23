import React, { useState, useEffect } from 'react';
import { adminApi } from '../lib/api';
import { Plus, Edit2, Trash2, Save, X, Users, Star } from 'lucide-react';

interface Mentor {
  _id: string;
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  accent: 'blue' | 'orange' | 'green';
}

const Mentors: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Partial<Mentor>>({});

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAll('mentors');
      if (response.success) {
        setMentors(Array.isArray(response.data) ? response.data : []);
      } else {
        setError(response.message || 'Failed to fetch mentors');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch mentors');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mentor: Mentor) => {
    setEditData(mentor);
    setEditingId(mentor._id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!editingId || !editData) return;

    try {
      const response = await adminApi.update('mentors', editingId, editData);
      if (response.success) {
        fetchMentors();
        setShowModal(false);
        setEditingId(null);
        setEditData({});
      } else {
        setError(response.message || 'Failed to update mentor');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update mentor');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this mentor?')) return;

    try {
      const response = await adminApi.delete('mentors', id);
      if (response.success) {
        fetchMentors();
      } else {
        setError(response.message || 'Failed to delete mentor');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete mentor');
    }
  };

  const handleCreate = () => {
    setEditData({
      id: '',
      name: '',
      role: '',
      company: '',
      image: '',
      accent: 'blue'
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleCreateSave = async () => {
    try {
      const response = await adminApi.create('mentors', editData);
      if (response.success) {
        fetchMentors();
        setShowModal(false);
        setEditData({});
      } else {
        setError(response.message || 'Failed to create mentor');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create mentor');
    }
  };

  const getAccentColor = (accent: string) => {
    switch (accent) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
          <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
          <p className="text-gray-600 mt-2">Manage course mentors and instructors</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Mentor
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Mentors Grid */}
      {mentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor._id} className={`card border-2 ${getAccentColor(mentor.accent)}`}>
              <div className="card-body text-center">
                <div className="relative mx-auto w-20 h-20 mb-4">
                  {mentor.image ? (
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getAccentColor(mentor.accent)}`}>
                    <Star className="w-3 h-3" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{mentor.role}</p>
                <p className="text-sm font-medium text-gray-700 mb-4">{mentor.company}</p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(mentor)}
                    className="btn btn-secondary btn-sm flex-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mentor._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first mentor</p>
            <button onClick={handleCreate} className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Add Mentor
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
                {editingId ? 'Edit Mentor' : 'Add Mentor'}
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
                <label className="form-label">Mentor ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.id || ''}
                  onChange={(e) => setEditData({ ...editData, id: e.target.value })}
                  placeholder="mentor-unique-id"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Role/Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editData.role || ''}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    placeholder="Senior Developer"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editData.company || ''}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    placeholder="Google"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  className="form-input"
                  value={editData.image || ''}
                  onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Accent Color</label>
                <select
                  className="form-input"
                  value={editData.accent || 'blue'}
                  onChange={(e) => setEditData({ ...editData, accent: e.target.value as any })}
                >
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                  <option value="green">Green</option>
                </select>
              </div>

              {editData.image && (
                <div className="form-group">
                  <label className="form-label">Preview</label>
                  <div className="flex justify-center">
                    <img
                      src={editData.image}
                      alt="Preview"
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
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

export default Mentors;
