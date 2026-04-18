import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import RoomsList from '../pages/Rooms/RoomsList';
import RoomForm from '../pages/Rooms/RoomForm';
import BookingsList from '../pages/Bookings/BookingsList';
import BookingForm from '../pages/Bookings/BookingForm';
import PaymentsPage from '../pages/Payments/PaymentsPage';
import ReportsPage from '../pages/Reports/ReportsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="rooms" element={<RoomsList />} />
        <Route path="rooms/new" element={<ProtectedRoute roles={['admin', 'staff']}><RoomForm /></ProtectedRoute>} />
        <Route path="rooms/:id/edit" element={<ProtectedRoute roles={['admin', 'staff']}><RoomForm /></ProtectedRoute>} />
        <Route path="bookings" element={<BookingsList />} />
        <Route path="bookings/new" element={<BookingForm />} />
        <Route path="payments" element={<ProtectedRoute roles={['admin', 'staff']}><PaymentsPage /></ProtectedRoute>} />
        <Route path="reports" element={<ProtectedRoute roles={['admin', 'staff']}><ReportsPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
