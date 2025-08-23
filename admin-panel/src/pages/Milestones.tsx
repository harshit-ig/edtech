import React, { useState, useEffect } from 'react';
import { milestonesApi } from '../lib/api';
import { Calendar, Save, Plus, Trash2, Edit3 } from 'lucide-react';

interface Milestone {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: 'launch' | 'growth' | 'achievement' | 'partnership' | 'product' | 'other';
  isHighlight: boolean;
  image?: string;
  metrics?: {
    users?: number;
    revenue?: string;
    milestone?: string;
  };
}

const Milestones: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Milestone>>({});

  const categories = [
    { value: 'launch', label: 'Product Launch', color: '#3b82f6' },
    { value: 'growth', label: 'Growth', color: '#10b981' },
    { value: 'achievement', label: 'Achievement', color: '#f59e0b' },
    { value: 'partnership', label: 'Partnership', color: '#8b5cf6' },
    { value: 'product', label: 'Product Update', color: '#06b6d4' },
    { value: 'other', label: 'Other', color: '#6b7280' }
  ];

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      setLoading(true);
      const response = await milestonesApi.getAll();
      if (response.success) {
        setMilestones(response.data as Milestone[]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch milestones');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: 'achievement',
      isHighlight: false,
      metrics: {}
    });
  };

  const handleEdit = (milestone: Milestone) => {
    setEditingId(milestone._id);
    setFormData({
      ...milestone,
      date: milestone.date.split('T')[0] // Format date for input
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.date) {
      setError('Title, description, and date are required');
      return;
    }

    try {
      setSaving(true);
      let response;
      
      if (editingId === 'new') {
        response = await milestonesApi.create(formData);
      } else if (editingId) {
        response = await milestonesApi.update(editingId, formData);
      }

      if (response?.success) {
        await fetchMilestones();
        setEditingId(null);
        setFormData({});
        setError('');
      } else {
        setError(response?.message || 'Failed to save milestone');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save milestone');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this milestone?')) return;

    try {
      const response = await milestonesApi.delete(id);
      if (response.success) {
        await fetchMilestones();
      } else {
        setError(response.message || 'Failed to delete milestone');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete milestone');
    }
  };

  const getCategoryInfo = (category: string) => {
    return categories.find(cat => cat.value === category) || categories[categories.length - 1];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Company Milestones</h1>
          <p className="text-gray-600 mt-2">Track your company's journey and achievements</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Milestone
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {editingId && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">
              {editingId === 'new' ? 'Add New Milestone' : 'Edit Milestone'}
            </h3>
          </div>
          <div className="card-body space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Reached 10K Users"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe this milestone and its significance..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={formData.category || 'achievement'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Milestone['category'] })}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Image URL (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isHighlight || false}
                  onChange={(e) => setFormData({ ...formData, isHighlight: e.target.checked })}
                  className="rounded"
                />
                <span className="form-label mb-0">Highlight this milestone</span>
              </label>
            </div>

            <div>
              <h4 className="text-md font-medium mb-3">Metrics (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Users Count</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.metrics?.users || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { 
                        ...formData.metrics, 
                        users: parseInt(e.target.value) || undefined 
                      } 
                    })}
                    placeholder="10000"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Revenue</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metrics?.revenue || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { 
                        ...formData.metrics, 
                        revenue: e.target.value 
                      } 
                    })}
                    placeholder="$1M ARR"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Custom Metric</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.metrics?.milestone || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      metrics: { 
                        ...formData.metrics, 
                        milestone: e.target.value 
                      } 
                    })}
                    placeholder="50+ partners"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="btn btn-primary"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Milestone'}
              </button>
              <button 
                onClick={() => setEditingId(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestones Timeline */}
      <div className="space-y-6">
        {milestones
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((milestone) => {
            const categoryInfo = getCategoryInfo(milestone.category);
            return (
              <div key={milestone._id} className={`card ${milestone.isHighlight ? 'border-blue-200 bg-blue-50' : ''}`}>
                <div className="card-header">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoryInfo.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{categoryInfo.label}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{formatDate(milestone.date)}</span>
                        {milestone.isHighlight && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Highlight
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{milestone.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(milestone)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(milestone._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="text-gray-600 mb-4">{milestone.description}</p>
                  
                  {milestone.metrics && (milestone.metrics.users || milestone.metrics.revenue || milestone.metrics.milestone) && (
                    <div className="flex items-center gap-6 text-sm">
                      {milestone.metrics.users && (
                        <div>
                          <span className="text-gray-600">Users: </span>
                          <span className="font-medium">{milestone.metrics.users.toLocaleString()}</span>
                        </div>
                      )}
                      {milestone.metrics.revenue && (
                        <div>
                          <span className="text-gray-600">Revenue: </span>
                          <span className="font-medium">{milestone.metrics.revenue}</span>
                        </div>
                      )}
                      {milestone.metrics.milestone && (
                        <div>
                          <span className="text-gray-600">Metric: </span>
                          <span className="font-medium">{milestone.metrics.milestone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {milestone.image && (
                    <div className="mt-4">
                      <img
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {milestones.length === 0 && !editingId && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones found</h3>
          <p className="text-gray-600 mb-4">Start documenting your company's journey by adding your first milestone.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>
      )}
    </div>
  );
};

export default Milestones;
