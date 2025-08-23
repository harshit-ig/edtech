import React, { useState, useEffect } from 'react';
import { upcomingSkillsApi } from '../lib/api';
import { Save, Plus, Trash2, Edit3, TrendingUp } from 'lucide-react';

interface UpcomingSkill {
  _id: string;
  title: string;
  description: string;
  category: 'programming' | 'design' | 'marketing' | 'business' | 'data' | 'other';
  estimatedLaunch: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  demand: 'low' | 'medium' | 'high' | 'very-high';
  prerequisites: string[];
  targetAudience: string[];
  features: string[];
  icon?: string;
  color: string;
  isHighPriority: boolean;
  marketResearch?: {
    demandScore: number;
    competitionLevel: string;
    estimatedEnrollments: number;
  };
}

const UpcomingSkills: React.FC = () => {
  const [skills, setSkills] = useState<UpcomingSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UpcomingSkill>>({});

  const categories = [
    { value: 'programming', label: 'Programming', color: '#3b82f6' },
    { value: 'design', label: 'Design', color: '#8b5cf6' },
    { value: 'marketing', label: 'Marketing', color: '#f59e0b' },
    { value: 'business', label: 'Business', color: '#10b981' },
    { value: 'data', label: 'Data Science', color: '#06b6d4' },
    { value: 'other', label: 'Other', color: '#6b7280' }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', color: '#10b981' },
    { value: 'intermediate', label: 'Intermediate', color: '#f59e0b' },
    { value: 'advanced', label: 'Advanced', color: '#ef4444' }
  ];

  const demandLevels = [
    { value: 'low', label: 'Low', color: '#6b7280' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#10b981' },
    { value: 'very-high', label: 'Very High', color: '#ef4444' }
  ];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await upcomingSkillsApi.getAll();
      if (response.success) {
        setSkills(response.data as UpcomingSkill[]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch upcoming skills');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      title: '',
      description: '',
      category: 'programming',
      estimatedLaunch: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 months from now
      difficulty: 'beginner',
      demand: 'medium',
      prerequisites: [],
      targetAudience: [],
      features: [],
      color: '#3b82f6',
      isHighPriority: false,
      marketResearch: {
        demandScore: 5,
        competitionLevel: 'medium',
        estimatedEnrollments: 100
      }
    });
  };

  const handleEdit = (skill: UpcomingSkill) => {
    setEditingId(skill._id);
    setFormData({
      ...skill,
      estimatedLaunch: skill.estimatedLaunch.split('T')[0] // Format date for input
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description || !formData.estimatedLaunch) {
      setError('Title, description, and estimated launch date are required');
      return;
    }

    try {
      setSaving(true);
      let response;
      
      if (editingId === 'new') {
        response = await upcomingSkillsApi.create(formData);
      } else if (editingId) {
        response = await upcomingSkillsApi.update(editingId, formData);
      }

      if (response?.success) {
        await fetchSkills();
        setEditingId(null);
        setFormData({});
        setError('');
      } else {
        setError(response?.message || 'Failed to save skill');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this upcoming skill?')) return;

    try {
      const response = await upcomingSkillsApi.delete(id);
      if (response.success) {
        await fetchSkills();
      } else {
        setError(response.message || 'Failed to delete skill');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete skill');
    }
  };

  const addArrayItem = (field: 'prerequisites' | 'targetAudience' | 'features', defaultValue: string = '') => {
    setFormData({
      ...formData,
      [field]: [...((formData[field] as string[]) || []), defaultValue]
    });
  };

  const updateArrayItem = (field: 'prerequisites' | 'targetAudience' | 'features', index: number, value: string) => {
    const array = [...((formData[field] as string[]) || [])];
    array[index] = value;
    setFormData({ ...formData, [field]: array });
  };

  const removeArrayItem = (field: 'prerequisites' | 'targetAudience' | 'features', index: number) => {
    const array = [...((formData[field] as string[]) || [])];
    array.splice(index, 1);
    setFormData({ ...formData, [field]: array });
  };

  const getCategoryInfo = (category: string) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const getDifficultyInfo = (difficulty: string) => {
    return difficultyLevels.find(level => level.value === difficulty) || difficultyLevels[0];
  };

  const getDemandInfo = (demand: string) => {
    return demandLevels.find(level => level.value === demand) || demandLevels[1];
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
          <h1 className="text-3xl font-bold text-gray-900">Upcoming Skills</h1>
          <p className="text-gray-600 mt-2">Plan and manage future course offerings</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Upcoming Skill
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
              {editingId === 'new' ? 'Add New Upcoming Skill' : 'Edit Upcoming Skill'}
            </h3>
          </div>
          <div className="card-body space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced React Development"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Launch Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.estimatedLaunch || ''}
                  onChange={(e) => setFormData({ ...formData, estimatedLaunch: e.target.value })}
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
                placeholder="Describe what this skill/course will cover..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={formData.category || 'programming'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as UpcomingSkill['category'] })}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select
                  className="form-input"
                  value={formData.difficulty || 'beginner'}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as UpcomingSkill['difficulty'] })}
                >
                  {difficultyLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Demand Level</label>
                <select
                  className="form-input"
                  value={formData.demand || 'medium'}
                  onChange={(e) => setFormData({ ...formData, demand: e.target.value as UpcomingSkill['demand'] })}
                >
                  {demandLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-10 h-10 rounded border"
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
            </div>

            <div className="form-group">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isHighPriority || false}
                  onChange={(e) => setFormData({ ...formData, isHighPriority: e.target.checked })}
                  className="rounded"
                />
                <span className="form-label mb-0">High Priority</span>
              </label>
            </div>

            {/* Prerequisites */}
            <div>
              <h4 className="text-md font-medium mb-3">Prerequisites</h4>
              <div className="space-y-2">
                {(formData.prerequisites || []).map((prereq, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="form-input flex-1"
                      placeholder="Prerequisite skill or knowledge"
                      value={prereq}
                      onChange={(e) => updateArrayItem('prerequisites', index, e.target.value)}
                    />
                    <button
                      onClick={() => removeArrayItem('prerequisites', index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('prerequisites')}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus className="w-3 h-3" />
                  Add Prerequisite
                </button>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <h4 className="text-md font-medium mb-3">Target Audience</h4>
              <div className="space-y-2">
                {(formData.targetAudience || []).map((audience, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="form-input flex-1"
                      placeholder="Target audience group"
                      value={audience}
                      onChange={(e) => updateArrayItem('targetAudience', index, e.target.value)}
                    />
                    <button
                      onClick={() => removeArrayItem('targetAudience', index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('targetAudience')}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus className="w-3 h-3" />
                  Add Target Audience
                </button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-md font-medium mb-3">Key Features</h4>
              <div className="space-y-2">
                {(formData.features || []).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      className="form-input flex-1"
                      placeholder="Key feature or topic"
                      value={feature}
                      onChange={(e) => updateArrayItem('features', index, e.target.value)}
                    />
                    <button
                      onClick={() => removeArrayItem('features', index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('features')}
                  className="btn btn-secondary btn-sm"
                >
                  <Plus className="w-3 h-3" />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Market Research */}
            <div>
              <h4 className="text-md font-medium mb-3">Market Research (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">Demand Score (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="form-input"
                    value={formData.marketResearch?.demandScore || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      marketResearch: { 
                        demandScore: parseInt(e.target.value) || 5,
                        competitionLevel: formData.marketResearch?.competitionLevel || 'medium',
                        estimatedEnrollments: formData.marketResearch?.estimatedEnrollments || 100
                      } 
                    })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Competition Level</label>
                  <select
                    className="form-input"
                    value={formData.marketResearch?.competitionLevel || 'medium'}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      marketResearch: { 
                        demandScore: formData.marketResearch?.demandScore || 5,
                        competitionLevel: e.target.value,
                        estimatedEnrollments: formData.marketResearch?.estimatedEnrollments || 100
                      } 
                    })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="very-high">Very High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Estimated Enrollments</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.marketResearch?.estimatedEnrollments || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      marketResearch: { 
                        demandScore: formData.marketResearch?.demandScore || 5,
                        competitionLevel: formData.marketResearch?.competitionLevel || 'medium',
                        estimatedEnrollments: parseInt(e.target.value) || 100
                      } 
                    })}
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
                {saving ? 'Saving...' : 'Save Skill'}
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

      {/* Skills List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills
          .sort((a, b) => new Date(a.estimatedLaunch).getTime() - new Date(b.estimatedLaunch).getTime())
          .map((skill) => {
            const categoryInfo = getCategoryInfo(skill.category);
            const difficultyInfo = getDifficultyInfo(skill.difficulty);
            const demandInfo = getDemandInfo(skill.demand);

            return (
              <div key={skill._id} className={`card hover:shadow-lg transition-shadow ${skill.isHighPriority ? 'border-orange-200 bg-orange-50' : ''}`}>
                <div className="card-header">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: categoryInfo.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{categoryInfo.label}</span>
                        {skill.isHighPriority && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            High Priority
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{skill.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">Launch: {formatDate(skill.estimatedLaunch)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {skill.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Difficulty:</span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: difficultyInfo.color + '20',
                          color: difficultyInfo.color
                        }}
                      >
                        {difficultyInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Demand:</span>
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: demandInfo.color + '20',
                          color: demandInfo.color
                        }}
                      >
                        {demandInfo.label}
                      </span>
                    </div>
                  </div>

                  {skill.features && skill.features.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 mb-1">Key Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {skill.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {skill.features.length > 3 && (
                          <span className="text-xs text-gray-500">+{skill.features.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {skill.marketResearch && (
                    <div className="text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Demand Score: {skill.marketResearch.demandScore}/10</span>
                        <span>Est. Enrollments: {skill.marketResearch.estimatedEnrollments}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {skills.length === 0 && !editingId && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming skills found</h3>
          <p className="text-gray-600 mb-4">Start planning your future course offerings by adding your first upcoming skill.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Add Upcoming Skill
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSkills;
