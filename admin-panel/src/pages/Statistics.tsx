import React, { useState, useEffect } from 'react';
import { statsApi } from '../lib/api';
import { BarChart3, Save, Plus, Trash2, Edit3 } from 'lucide-react';

interface Statistics {
  _id: string;
  totalStudents: number;
  successRate: number;
  avgSalaryIncrease: number;
  companiesPartnered: number;
  coursesCompleted: number;
  jobPlacements: number;
  industryCategories: Array<{
    category: string;
    percentage: number;
    color: string;
  }>;
  salaryRanges: Array<{
    range: string;
    percentage: number;
    count: number;
  }>;
  locationStats: Array<{
    city: string;
    country: string;
    studentsCount: number;
    averageSalary: number;
  }>;
  yearlyGrowth: Array<{
    year: number;
    students: number;
    revenue: number;
    placements: number;
  }>;
}

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Statistics>>({});

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await statsApi.getAll();
      if (response.success) {
        setStatistics(response.data as Statistics[]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      totalStudents: 0,
      successRate: 0,
      avgSalaryIncrease: 0,
      companiesPartnered: 0,
      coursesCompleted: 0,
      jobPlacements: 0,
      industryCategories: [],
      salaryRanges: [],
      locationStats: [],
      yearlyGrowth: []
    });
  };

  const handleEdit = (stat: Statistics) => {
    setEditingId(stat._id);
    setFormData(stat);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let response;
      
      if (editingId === 'new') {
        response = await statsApi.create(formData);
      } else if (editingId) {
        response = await statsApi.update(editingId, formData);
      }

      if (response?.success) {
        await fetchStatistics();
        setEditingId(null);
        setFormData({});
      } else {
        setError(response?.message || 'Failed to save statistics');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save statistics');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this statistics entry?')) return;

    try {
      const response = await statsApi.delete(id);
      if (response.success) {
        await fetchStatistics();
      } else {
        setError(response.message || 'Failed to delete statistics');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete statistics');
    }
  };

  const addArrayItem = (field: keyof Statistics, defaultValue: any) => {
    setFormData({
      ...formData,
      [field]: [...((formData[field] as any[]) || []), defaultValue]
    });
  };

  const updateArrayItem = (field: keyof Statistics, index: number, value: any) => {
    const array = [...((formData[field] as any[]) || [])];
    array[index] = value;
    setFormData({ ...formData, [field]: array });
  };

  const removeArrayItem = (field: keyof Statistics, index: number) => {
    const array = [...((formData[field] as any[]) || [])];
    array.splice(index, 1);
    setFormData({ ...formData, [field]: array });
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
          <h1 className="text-3xl font-bold text-gray-900">Statistics Management</h1>
          <p className="text-gray-600 mt-2">Track and manage platform statistics</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Statistics
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
              {editingId === 'new' ? 'Add New Statistics' : 'Edit Statistics'}
            </h3>
          </div>
          <div className="card-body space-y-6">
            {/* Basic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Total Students</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.totalStudents || ''}
                  onChange={(e) => setFormData({ ...formData, totalStudents: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Success Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="form-input"
                  value={formData.successRate || ''}
                  onChange={(e) => setFormData({ ...formData, successRate: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Avg Salary Increase (%)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.avgSalaryIncrease || ''}
                  onChange={(e) => setFormData({ ...formData, avgSalaryIncrease: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Companies Partnered</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.companiesPartnered || ''}
                  onChange={(e) => setFormData({ ...formData, companiesPartnered: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Courses Completed</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.coursesCompleted || ''}
                  onChange={(e) => setFormData({ ...formData, coursesCompleted: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Job Placements</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.jobPlacements || ''}
                  onChange={(e) => setFormData({ ...formData, jobPlacements: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            {/* Industry Categories */}
            <div>
              <h4 className="text-md font-medium mb-3">Industry Categories</h4>
              <div className="space-y-3">
                {(formData.industryCategories || []).map((category, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      className="form-input flex-1"
                      placeholder="Category"
                      value={category.category}
                      onChange={(e) => updateArrayItem('industryCategories', index, { ...category, category: e.target.value })}
                    />
                    <input
                      type="number"
                      className="form-input w-24"
                      placeholder="Percentage"
                      min="0"
                      max="100"
                      value={category.percentage}
                      onChange={(e) => updateArrayItem('industryCategories', index, { ...category, percentage: parseFloat(e.target.value) || 0 })}
                    />
                    <input
                      type="color"
                      className="w-12 h-10 rounded border"
                      value={category.color}
                      onChange={(e) => updateArrayItem('industryCategories', index, { ...category, color: e.target.value })}
                    />
                    <button
                      onClick={() => removeArrayItem('industryCategories', index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('industryCategories', { category: '', percentage: 0, color: '#3b82f6' })}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus className="w-3 h-3" />
                  Add Category
                </button>
              </div>
            </div>

            {/* Salary Ranges */}
            <div>
              <h4 className="text-md font-medium mb-3">Salary Ranges</h4>
              <div className="space-y-3">
                {(formData.salaryRanges || []).map((range, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      className="form-input flex-1"
                      placeholder="Range (e.g., $50k-$70k)"
                      value={range.range}
                      onChange={(e) => updateArrayItem('salaryRanges', index, { ...range, range: e.target.value })}
                    />
                    <input
                      type="number"
                      className="form-input w-24"
                      placeholder="Percentage"
                      min="0"
                      max="100"
                      value={range.percentage}
                      onChange={(e) => updateArrayItem('salaryRanges', index, { ...range, percentage: parseFloat(e.target.value) || 0 })}
                    />
                    <input
                      type="number"
                      className="form-input w-24"
                      placeholder="Count"
                      value={range.count}
                      onChange={(e) => updateArrayItem('salaryRanges', index, { ...range, count: parseInt(e.target.value) || 0 })}
                    />
                    <button
                      onClick={() => removeArrayItem('salaryRanges', index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('salaryRanges', { range: '', percentage: 0, count: 0 })}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus className="w-3 h-3" />
                  Add Range
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="btn btn-primary"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Statistics'}
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

      {/* Statistics List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {statistics.map((stat) => (
          <div key={stat._id} className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Statistics Overview</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(stat)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(stat._id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Students</p>
                  <p className="font-semibold text-lg">{stat.totalStudents.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Success Rate</p>
                  <p className="font-semibold text-lg">{stat.successRate}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Avg Salary Increase</p>
                  <p className="font-semibold text-lg">{stat.avgSalaryIncrease}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Job Placements</p>
                  <p className="font-semibold text-lg">{stat.jobPlacements.toLocaleString()}</p>
                </div>
              </div>
              {stat.industryCategories.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Top Industries</p>
                  <div className="space-y-1">
                    {stat.industryCategories.slice(0, 3).map((category, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{category.category}</span>
                        <span className="font-medium">{category.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {statistics.length === 0 && !editingId && (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No statistics found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first statistics entry.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Statistics
          </button>
        </div>
      )}
    </div>
  );
};

export default Statistics;
