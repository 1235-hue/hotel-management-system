import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { ReportData } from '../../types';
import { BedDouble, CalendarCheck, DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reports').then(res => setData(res.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" /></div>;

  const stats = [
    { label: 'Total Rooms', value: data?.rooms.total || 0, icon: BedDouble, color: 'bg-blue-500' },
    { label: 'Available Rooms', value: data?.rooms.available || 0, icon: BedDouble, color: 'bg-green-500' },
    { label: 'Active Bookings', value: data?.bookings.confirmed || 0, icon: CalendarCheck, color: 'bg-amber-500' },
    { label: 'Today\'s Bookings', value: data?.todayBookings || 0, icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Total Revenue', value: `$${(data?.revenue.total || 0).toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Total Users', value: data?.totalUsers || 0, icon: Users, color: 'bg-indigo-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-hotel-dark mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-hotel-dark">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {data && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Room Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-600">Available</span><span className="font-medium text-green-600">{data.rooms.available}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Booked</span><span className="font-medium text-amber-600">{data.rooms.booked}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Maintenance</span><span className="font-medium text-red-600">{data.rooms.maintenance}</span></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
            <div className="space-y-3">
              <div className="flex justify-between"><span className="text-gray-600">Paid</span><span className="font-medium text-green-600">${data.revenue.paid.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Pending</span><span className="font-medium text-amber-600">${data.revenue.pending.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
