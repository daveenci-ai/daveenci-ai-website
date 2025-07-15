import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Building, MessageSquare, Phone, Mail, Filter, Download } from 'lucide-react';

interface ChatSummary {
  id: number;
  interaction_date: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  company_name: string;
  chat_summary: string;
  services_discussed: string[];
  key_pain_points: string[];
  call_to_action_offered: boolean;
  next_step: string;
  lead_qualification: 'Hot' | 'Warm' | 'Cold';
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const ChatDashboard = () => {
  const [summaries, setSummaries] = useState<ChatSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  
  // Filters
  const [filters, setFilters] = useState({
    qualification: '',
    date_from: '',
    date_to: '',
    page: 1
  });

  const fetchSummaries = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.PROD 
        ? 'https://daveenci-ai-frontend.onrender.com' 
        : 'http://localhost:3001';
      
      const params = new URLSearchParams();
      if (filters.qualification) params.append('qualification', filters.qualification);
      if (filters.date_from) params.append('date_from', filters.date_from);
      if (filters.date_to) params.append('date_to', filters.date_to);
      params.append('page', filters.page.toString());
      params.append('limit', pagination.limit.toString());
      
      const response = await fetch(`${apiUrl}/api/chat/summaries?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSummaries(data.summaries);
      setPagination(data.pagination);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chat summaries');
      console.error('Error fetching chat summaries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, [filters]);

  const getQualificationColor = (qualification: string) => {
    switch (qualification) {
      case 'Hot': return 'bg-red-100 text-red-800 border-red-300';
      case 'Warm': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Cold': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : prev.page // Reset to page 1 unless changing page
    }));
  };

  const exportToCSV = () => {
    const headers = [
      'Date',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Qualification',
      'Services',
      'Pain Points',
      'Summary',
      'Call to Action',
      'Next Step'
    ];

    const csvData = summaries.map(summary => [
      summary.interaction_date,
      summary.contact_name || '',
      summary.contact_email || '',
      summary.contact_phone || '',
      summary.company_name || '',
      summary.lead_qualification,
      summary.services_discussed.join(', '),
      summary.key_pain_points.join(', '),
      `"${summary.chat_summary.replace(/"/g, '""')}"`,
      summary.call_to_action_offered ? 'Yes' : 'No',
      summary.next_step || ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-summaries-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading && summaries.length === 0) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat Dashboard</h1>
        <p className="text-gray-600">View and manage chatbot conversations and leads</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Qualification</label>
              <Select value={filters.qualification} onValueChange={(value) => handleFilterChange('qualification', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All qualifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All qualifications</SelectItem>
                  <SelectItem value="Hot">Hot</SelectItem>
                  <SelectItem value="Warm">Warm</SelectItem>
                  <SelectItem value="Cold">Cold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From Date</label>
              <Input
                type="date"
                value={filters.date_from}
                onChange={(e) => handleFilterChange('date_from', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To Date</label>
              <Input
                type="date"
                value={filters.date_to}
                onChange={(e) => handleFilterChange('date_to', e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={exportToCSV} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Chats</p>
                <p className="text-2xl font-bold">{pagination.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hot Leads</p>
                <p className="text-2xl font-bold text-red-600">
                  {summaries.filter(s => s.lead_qualification === 'Hot').length}
                </p>
              </div>
              <User className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Call Actions</p>
                <p className="text-2xl font-bold text-green-600">
                  {summaries.filter(s => s.call_to_action_offered).length}
                </p>
              </div>
              <Phone className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Email</p>
                <p className="text-2xl font-bold text-purple-600">
                  {summaries.filter(s => s.contact_email).length}
                </p>
              </div>
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-800">Error: {error}</p>
            <Button onClick={fetchSummaries} className="mt-2" size="sm">
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Chat Summaries */}
      <div className="space-y-4">
        {summaries.map((summary) => (
          <Card key={summary.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Badge className={getQualificationColor(summary.lead_qualification)}>
                    {summary.lead_qualification}
                  </Badge>
                  {summary.call_to_action_offered && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      Call Action Offered
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(summary.created_at)}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{summary.contact_name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{summary.contact_email || 'No email'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{summary.company_name || 'No company'}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">{summary.chat_summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-1">Services Discussed</h4>
                  <div className="flex flex-wrap gap-1">
                    {summary.services_discussed.length > 0 ? (
                      summary.services_discussed.map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-1">Pain Points</h4>
                  <div className="flex flex-wrap gap-1">
                    {summary.key_pain_points.length > 0 ? (
                      summary.key_pain_points.map((point, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {point}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-400">None identified</span>
                    )}
                  </div>
                </div>
              </div>
              
              {summary.next_step && (
                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-1">Next Step</h4>
                  <p className="text-sm text-gray-700">{summary.next_step}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() => handleFilterChange('page', (pagination.page - 1).toString())}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.pages}
            onClick={() => handleFilterChange('page', (pagination.page + 1).toString())}
          >
            Next
          </Button>
        </div>
      )}

      {summaries.length === 0 && !loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chat summaries found</h3>
            <p className="text-gray-600">Chat summaries will appear here as users interact with the chatbot.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatDashboard; 