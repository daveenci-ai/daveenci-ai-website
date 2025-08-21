import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EventBanner from '@/components/EventBanner';
import ChatDashboard from '@/components/ChatDashboard';
import Login from '@/components/Login';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getApiEndpoint } from '@/utils/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check authentication on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(getApiEndpoint('/api/auth/verify'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        // Token is invalid, clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (token: string, userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch(getApiEndpoint('/api/auth/logout'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin dashboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <EventBanner />
      <div className="pt-16">
        {/* Admin Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <User className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Welcome, {user?.name || user?.email}
                </h2>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
        
        <ChatDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Admin; 