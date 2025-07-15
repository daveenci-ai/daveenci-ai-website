import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ChatDashboard from '@/components/ChatDashboard';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-16"> {/* Account for navigation height */}
        <ChatDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default Admin; 