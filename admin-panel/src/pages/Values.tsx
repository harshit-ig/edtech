import React, { useState, useEffect } from 'react';
import { valuesApi } from '../lib/api';
import { Heart, Save, Plus, Trash2, Edit3 } from 'lucide-react';

interface Value {
  _id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

const Values: React.FC = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Value>>({});

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      setLoading(true);
      const response = await valuesApi.getAll();
      if (response.success) {
        setValues(response.data as Value[]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch values');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      title: '',
      description: '',
      icon: '💡',
      color: '#3b82f6',
      order: values.length + 1
    });
  };

  const handleEdit = (value: Value) => {
    setEditingId(value._id);
    setFormData(value);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    try {
      setSaving(true);
      let response;
      
      if (editingId === 'new') {
        response = await valuesApi.create(formData);
      } else if (editingId) {
        response = await valuesApi.update(editingId, formData);
      }

      if (response?.success) {
        await fetchValues();
        setEditingId(null);
        setFormData({});
        setError('');
      } else {
        setError(response?.message || 'Failed to save value');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save value');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this value?')) return;

    try {
      const response = await valuesApi.delete(id);
      if (response.success) {
        await fetchValues();
      } else {
        setError(response.message || 'Failed to delete value');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete value');
    }
  };

  const moveValue = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = values.findIndex(v => v._id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= values.length) return;

    const newValues = [...values];
    [newValues[currentIndex], newValues[newIndex]] = [newValues[newIndex], newValues[currentIndex]];
    
    // Update orders
    newValues[currentIndex].order = currentIndex + 1;
    newValues[newIndex].order = newIndex + 1;

    try {
      await Promise.all([
        valuesApi.update(newValues[currentIndex]._id, { order: newValues[currentIndex].order }),
        valuesApi.update(newValues[newIndex]._id, { order: newValues[newIndex].order })
      ]);
      setValues(newValues);
    } catch (error) {
      setError('Failed to reorder values');
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
          <h1 className="text-3xl font-bold text-gray-900">Company Values</h1>
          <p className="text-gray-600 mt-2">Manage your organization's core values</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Value
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
              {editingId === 'new' ? 'Add New Value' : 'Edit Value'}
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
                  placeholder="e.g., Innovation"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Icon (Emoji)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.icon || ''}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="💡"
                  maxLength={2}
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
                placeholder="Describe this value and what it means to your organization..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-10 rounded border"
                    value={formData.color || '#3b82f6'}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-input flex-1"
                    value={formData.color || ''}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Order</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.order || ''}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="btn btn-primary"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Value'}
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

      {/* Values List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values
          .sort((a, b) => a.order - b.order)
          .map((value) => (
          <div key={value._id} className="card hover:shadow-lg transition-shadow">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{value.icon}</span>
                  <h3 className="text-lg font-medium">{value.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveValue(value._id, 'up')}
                    className="btn btn-secondary btn-sm"
                    disabled={value.order === 1}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveValue(value._id, 'down')}
                    className="btn btn-secondary btn-sm"
                    disabled={value.order === values.length}
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleEdit(value)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(value._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: value.color }}
                ></div>
                <span className="text-xs text-gray-500">Order: {value.order}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {values.length === 0 && !editingId && (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No values found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first company value.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Value
          </button>
        </div>
      )}
    </div>
  );
};

export default Values;
