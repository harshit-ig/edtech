import React, { useState, useEffect } from 'react';
import { companyInfoApi } from '../lib/api';
import { Save, Plus, Trash2 } from 'lucide-react';

interface CompanyInfo {
  _id: string;
  whatsappNumber: string;
  supportEmail: string;
  heroRoles: string[];
  carouselRoles: string[];
  marketingStats: Array<{
    number: string;
    label: string;
  }>;
  whatsappQuickMessages: string[];
  pricingFaq: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
  courseBenefitsComparison: Array<{
    feature: string;
    description: string;
    us: boolean | string;
    others: boolean | string;
  }>;
}

const CompanyInfo: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      setLoading(true);
      const response = await companyInfoApi.getAll();
      if (response.success && response.data && Array.isArray(response.data) && response.data.length > 0) {
        setCompanyInfo(response.data[0] as CompanyInfo);
      } else {
        // Create empty company info if none exists
        setCompanyInfo({
          _id: '',
          whatsappNumber: '',
          supportEmail: '',
          heroRoles: [],
          carouselRoles: [],
          marketingStats: [],
          whatsappQuickMessages: [],
          pricingFaq: [],
          courseBenefitsComparison: []
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch company info');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!companyInfo) return;

    try {
      setSaving(true);
      let response;
      
      if (companyInfo._id) {
        response = await companyInfoApi.update(companyInfo._id, companyInfo);
      } else {
        response = await companyInfoApi.create(companyInfo);
      }

      if (response.success) {
        if (!companyInfo._id && response.data && typeof response.data === 'object' && '_id' in response.data) {
          setCompanyInfo({ ...companyInfo, _id: (response.data as CompanyInfo)._id });
        }
        alert('Company info saved successfully!');
      } else {
        setError(response.message || 'Failed to save company info');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save company info');
    } finally {
      setSaving(false);
    }
  };

  const addArrayItem = (field: keyof CompanyInfo, defaultValue: any) => {
    if (!companyInfo) return;
    setCompanyInfo({
      ...companyInfo,
      [field]: [...(companyInfo[field] as any[]), defaultValue]
    });
  };

  const updateArrayItem = (field: keyof CompanyInfo, index: number, value: any) => {
    if (!companyInfo) return;
    const array = [...(companyInfo[field] as any[])];
    array[index] = value;
    setCompanyInfo({ ...companyInfo, [field]: array });
  };

  const removeArrayItem = (field: keyof CompanyInfo, index: number) => {
    if (!companyInfo) return;
    const array = [...(companyInfo[field] as any[])];
    array.splice(index, 1);
    setCompanyInfo({ ...companyInfo, [field]: array });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  if (!companyInfo) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Company Information</h1>
          <p className="text-gray-600 mt-2">Manage company settings and content</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="btn btn-primary"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">Basic Information</h3>
          </div>
          <div className="card-body space-y-4">
            <div className="form-group">
              <label className="form-label">WhatsApp Number</label>
              <input
                type="text"
                className="form-input"
                value={companyInfo.whatsappNumber}
                onChange={(e) => setCompanyInfo({ ...companyInfo, whatsappNumber: e.target.value })}
                placeholder="+1234567890"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Support Email</label>
              <input
                type="email"
                className="form-input"
                value={companyInfo.supportEmail}
                onChange={(e) => setCompanyInfo({ ...companyInfo, supportEmail: e.target.value })}
                placeholder="support@company.com"
              />
            </div>
          </div>
        </div>

        {/* Marketing Stats */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium">Marketing Statistics</h3>
          </div>
          <div className="card-body space-y-4">
            {companyInfo.marketingStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Number"
                  value={stat.number}
                  onChange={(e) => updateArrayItem('marketingStats', index, { ...stat, number: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) => updateArrayItem('marketingStats', index, { ...stat, label: e.target.value })}
                />
                <button
                  onClick={() => removeArrayItem('marketingStats', index)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('marketingStats', { number: '', label: '' })}
              className="btn btn-secondary btn-sm"
            >
              <Plus className="w-3 h-3" />
              Add Stat
            </button>
          </div>
        </div>
      </div>

      {/* Hero Roles */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">Hero Roles</h3>
        </div>
        <div className="card-body">
          <div className="space-y-2">
            {companyInfo.heroRoles.map((role, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Role title"
                  value={role}
                  onChange={(e) => updateArrayItem('heroRoles', index, e.target.value)}
                />
                <button
                  onClick={() => removeArrayItem('heroRoles', index)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('heroRoles', '')}
              className="btn btn-secondary btn-sm"
            >
              <Plus className="w-3 h-3" />
              Add Role
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Roles */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">Carousel Roles</h3>
        </div>
        <div className="card-body">
          <div className="space-y-2">
            {companyInfo.carouselRoles.map((role, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Role title"
                  value={role}
                  onChange={(e) => updateArrayItem('carouselRoles', index, e.target.value)}
                />
                <button
                  onClick={() => removeArrayItem('carouselRoles', index)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('carouselRoles', '')}
              className="btn btn-secondary btn-sm"
            >
              <Plus className="w-3 h-3" />
              Add Role
            </button>
          </div>
        </div>
      </div>

      {/* WhatsApp Quick Messages */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-medium">WhatsApp Quick Messages</h3>
        </div>
        <div className="card-body">
          <div className="space-y-2">
            {companyInfo.whatsappQuickMessages.map((message, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  className="form-input flex-1"
                  placeholder="Quick message"
                  value={message}
                  onChange={(e) => updateArrayItem('whatsappQuickMessages', index, e.target.value)}
                />
                <button
                  onClick={() => removeArrayItem('whatsappQuickMessages', index)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('whatsappQuickMessages', '')}
              className="btn btn-secondary btn-sm"
            >
              <Plus className="w-3 h-3" />
              Add Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
