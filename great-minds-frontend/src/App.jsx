import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DoubleNavbar from './components/DoubleNavbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ApplicantPortal from './pages/ApplicantPortal';
import StaffPortal from './pages/StaffPortal';
import ContactUs from './pages/ContactUs';
import PhotoGallery from './pages/PhotoGallery';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-school-cream">
          <DoubleNavbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Website Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/gallery" element={<PhotoGallery />} />
              
              {/* Interactive Portals */}
              <Route path="/applicants" element={<ApplicantPortal />} />
              <Route path="/staff-portal" element={<StaffPortal />} />
              
              {/* URL Mapped Admin Login Endpoints */}
              <Route path="/admin-login" element={<AdminLogin />} />
              
              {/* Fully Protected Dashboard Node */}
              <Route 
                path="/admin-dashboard" 
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
