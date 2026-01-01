import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Cabs from './pages/Cabs';
import MyBookings from './pages/MyBookings';
// Admin pages (hidden routes)
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetail />} />
        <Route path="/cabs" element={<Cabs />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Admin Routes (Hidden - No links from main UI) */}
        <Route path="/admin-portal" element={<AdminLogin />} />
        <Route path="/admin-portal/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
