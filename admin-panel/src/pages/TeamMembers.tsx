import React, { useState, useEffect } from 'react';
import { teamMembersApi } from '../lib/api';
import type { TeamMember } from '../types';
import { Plus, Edit, Trash2, Eye, Search, Linkedin, Twitter, Save, X } from 'lucide-react';

const TeamMembersList: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamMembersApi.getAll();
      if (response.success && response.data) {
        setTeamMembers(response.data as TeamMember[]);
      } else {
        throw new Error(response.message || 'Failed to fetch team members');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      linkedin: '',
      twitter: ''
    });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member._id);
    setFormData(member);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role || !formData.bio) {
      setError('Name, role, and bio are required');
      return;
    }

    try {
      setSaving(true);
      let response;
      
      if (editingId === 'new') {
        response = await teamMembersApi.create(formData);
      } else if (editingId) {
        response = await teamMembersApi.update(editingId, formData);
      }

      if (response?.success) {
        await fetchTeamMembers();
        setEditingId(null);
        setFormData({});
        setError('');
      } else {
        setError(response?.message || 'Failed to save team member');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      const response = await teamMembersApi.delete(id);
      if (response.success) {
        setTeamMembers(prev => prev.filter(member => member._id !== id));
      } else {
        throw new Error(response.message || 'Failed to delete team member');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete team member');
    }
  };

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your team member profiles
          </p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="card-body">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchTeamMembers}
            className="mt-2 btn btn-secondary text-xs"
          >
            Try again
          </button>
        </div>
      )}

      {/* Edit Form */}
      {editingId && (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {editingId === 'new' ? 'Add New Team Member' : 'Edit Team Member'}
              </h3>
              <button
                onClick={() => setEditingId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="card-body space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Job title or role"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                className="form-input"
                rows={3}
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief bio or description"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Profile Image URL</label>
              <input
                type="url"
                className="form-input"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">LinkedIn URL (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.linkedin || ''}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Twitter URL (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.twitter || ''}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://twitter.com/username"
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
                {saving ? 'Saving...' : 'Save Member'}
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

      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeamMembers.map((member) => (
          <div key={member._id} className="card">
            <div className="card-body text-center">
              {/* Profile Image */}
              <div className="mx-auto w-24 h-24 mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/placeholder/150/150';
                  }}
                />
              </div>

              {/* Name and Role */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-blue-600 font-medium mb-3">
                {member.role}
              </p>

              {/* Bio */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-3 mb-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-50">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEdit(member)}
                  className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTeamMembers.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">No team members found</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="stat-value">{teamMembers.length}</div>
          <div className="stat-label">Total Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {new Set(teamMembers.map(m => m.role.split(' ')[0])).size}
          </div>
          <div className="stat-label">Unique Roles</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {teamMembers.filter(m => m.linkedin && m.twitter).length}
          </div>
          <div className="stat-label">Complete Profiles</div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersList;
