import React, { useState, useEffect } from 'react';
import { contactDataApi } from '../lib/api';
import { Mail, Save, Plus, Trash2, Edit3, Phone, MessageSquare } from 'lucide-react';

interface ContactData {
  _id: string;
  type: 'inquiry' | 'enrollment' | 'support' | 'feedback' | 'other';
  name: string;
  email: string;
  phone?: string;
  message: string;
  course?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

const ContactData: React.FC = () => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ContactData>>({});
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const contactTypes = [
    { value: 'inquiry', label: 'General Inquiry', icon: Mail },
    { value: 'enrollment', label: 'Course Enrollment', icon: MessageSquare },
    { value: 'support', label: 'Support Request', icon: Phone },
    { value: 'feedback', label: 'Feedback', icon: MessageSquare },
    { value: 'other', label: 'Other', icon: Mail }
  ];

  const statusOptions = [
    { value: 'new', label: 'New', color: '#3b82f6' },
    { value: 'contacted', label: 'Contacted', color: '#f59e0b' },
    { value: 'converted', label: 'Converted', color: '#10b981' },
    { value: 'closed', label: 'Closed', color: '#6b7280' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: '#6b7280' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#ef4444' }
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactDataApi.getAll();
      if (response.success) {
        setContacts(response.data as ContactData[]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId('new');
    setFormData({
      type: 'inquiry',
      name: '',
      email: '',
      phone: '',
      message: '',
      course: '',
      status: 'new',
      priority: 'medium',
      tags: [],
      notes: ''
    });
  };

  const handleEdit = (contact: ContactData) => {
    setEditingId(contact._id);
    setFormData(contact);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('Name, email, and message are required');
      return;
    }

    try {
      setSaving(true);
      let response;
      
      if (editingId === 'new') {
        response = await contactDataApi.create(formData);
      } else if (editingId) {
        response = await contactDataApi.update(editingId, formData);
      }

      if (response?.success) {
        await fetchContacts();
        setEditingId(null);
        setFormData({});
        setError('');
      } else {
        setError(response?.message || 'Failed to save contact');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save contact');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await contactDataApi.delete(id);
      if (response.success) {
        await fetchContacts();
      } else {
        setError(response.message || 'Failed to delete contact');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete contact');
    }
  };

  const updateStatus = async (id: string, status: ContactData['status']) => {
    try {
      const response = await contactDataApi.update(id, { status });
      if (response.success) {
        await fetchContacts();
      }
    } catch (error) {
      setError('Failed to update status');
    }
  };

  const getStatusInfo = (status: string) => {
    return statusOptions.find(s => s.value === status) || statusOptions[0];
  };

  const getPriorityInfo = (priority: string) => {
    return priorityOptions.find(p => p.value === priority) || priorityOptions[1];
  };

  const getTypeInfo = (type: string) => {
    return contactTypes.find(t => t.value === type) || contactTypes[0];
  };

  const filteredContacts = contacts.filter(contact => {
    const statusMatch = filterStatus === 'all' || contact.status === filterStatus;
    const typeMatch = filterType === 'all' || contact.type === filterType;
    return statusMatch && typeMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
          <h1 className="text-3xl font-bold text-gray-900">Contact Data Management</h1>
          <p className="text-gray-600 mt-2">Manage inquiries, enrollments, and customer communications</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                className="form-input w-auto"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Type:</label>
              <select
                className="form-input w-auto"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                {contactTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredContacts.length} of {contacts.length} contacts
            </div>
          </div>
        </div>
      </div>

      {editingId && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">
              {editingId === 'new' ? 'Add New Contact' : 'Edit Contact'}
            </h3>
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
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone (Optional)</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Course (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.course || ''}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="Course name"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                rows={4}
                value={formData.message || ''}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Contact message..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Type</label>
                <select
                  className="form-input"
                  value={formData.type || 'inquiry'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ContactData['type'] })}
                >
                  {contactTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-input"
                  value={formData.status || 'new'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ContactData['status'] })}
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-input"
                  value={formData.priority || 'medium'}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as ContactData['priority'] })}
                >
                  {priorityOptions.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes (Optional)</label>
              <textarea
                className="form-input"
                rows={2}
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Internal notes..."
              />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="btn btn-primary"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Contact'}
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

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((contact) => {
            const statusInfo = getStatusInfo(contact.status);
            const priorityInfo = getPriorityInfo(contact.priority);
            const typeInfo = getTypeInfo(contact.type);
            const IconComponent = typeInfo.icon;

            return (
              <div key={contact._id} className="card">
                <div className="card-header">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">{typeInfo.label}</span>
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: priorityInfo.color }}
                          title={`${priorityInfo.label} priority`}
                        ></div>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{formatDate(contact.createdAt)}</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.email}</p>
                      {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        className="form-input w-auto text-sm"
                        value={contact.status}
                        onChange={(e) => updateStatus(contact._id, e.target.value as ContactData['status'])}
                        style={{ 
                          borderColor: statusInfo.color,
                          color: statusInfo.color
                        }}
                      >
                        {statusOptions.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleEdit(contact)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="text-gray-700 mb-3">{contact.message}</p>
                  
                  {contact.course && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Interested in: </span>
                      <span className="text-sm font-medium">{contact.course}</span>
                    </div>
                  )}

                  {contact.notes && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Notes:</strong> {contact.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {filteredContacts.length === 0 && !editingId && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {contacts.length === 0 ? 'No contacts found' : 'No contacts match your filters'}
          </h3>
          <p className="text-gray-600 mb-4">
            {contacts.length === 0 
              ? 'Start managing customer communications by adding your first contact.'
              : 'Try adjusting your filters to see more contacts.'
            }
          </p>
          {contacts.length === 0 && (
            <button onClick={handleCreate} className="btn btn-primary">
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactData;
