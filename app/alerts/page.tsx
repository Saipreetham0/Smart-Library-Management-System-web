'use client';

import { useEffect, useState } from 'react';
import { subscribeToNoiseAlerts, subscribeToStats } from '@/lib/firebaseService';
import { NoiseAlert, Stats } from '@/lib/types';
import { AlertTriangle, Volume2, TrendingUp, Activity } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<NoiseAlert[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalBooks: 0,
    peopleCount: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAlerts = subscribeToNoiseAlerts((data) => {
      setAlerts(data);
      setLoading(false);
    });

    const unsubStats = subscribeToStats(setStats);

    return () => {
      unsubAlerts();
      unsubStats();
    };
  }, []);

  const formatTimestamp = (timestamp: string) => {
    const ms = parseInt(timestamp);
    const date = new Date(ms);
    return date.toLocaleString();
  };

  const getAlertLevel = (level: number) => {
    if (level > 1000) return { text: 'Very High', color: 'text-red-600', bg: 'bg-red-100' };
    if (level > 700) return { text: 'High', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (level > 500) return { text: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading alerts...</p>
        </div>
      </div>
    );
  }

  const avgNoiseLevel = alerts.length > 0
    ? Math.round(alerts.reduce((sum, alert) => sum + alert.level, 0) / alerts.length)
    : 0;

  const recentAlerts = alerts.slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alerts & Monitoring</h1>
        <p className="mt-2 text-gray-600">Monitor noise levels and library environment</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Alerts</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{alerts.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-50 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Noise Level</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{avgNoiseLevel}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-50 text-orange-600">
              <Volume2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Occupancy</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats.peopleCount}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Alerts</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{recentAlerts.length}</p>
              <p className="mt-1 text-sm text-gray-500">Last 10</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-50 text-purple-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Noise Level Chart Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Noise Level Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Low (0-500)</p>
              <p className="text-xs text-gray-500">Acceptable</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Medium (501-700)</p>
              <p className="text-xs text-gray-500">Moderate</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">High (701-1000)</p>
              <p className="text-xs text-gray-500">Alert triggered</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Very High (1000+)</p>
              <p className="text-xs text-gray-500">Urgent attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Noise Alerts</h2>
        </div>
        <div className="p-6">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No alerts recorded</p>
              <p className="text-sm text-gray-400 mt-1">Alerts will appear here when noise levels exceed the threshold</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => {
                const level = getAlertLevel(alert.level);
                return (
                  <div
                    key={alert.timestamp + index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${level.bg}`}>
                        <Volume2 className={`w-6 h-6 ${level.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Noise Level: <span className={`font-bold ${level.color}`}>{alert.level}</span>
                        </p>
                        <p className="text-sm text-gray-500">{formatTimestamp(alert.timestamp)}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${level.bg} ${level.color}`}>
                        {level.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* All Alerts Table */}
      {alerts.length > 10 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Alerts History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Noise Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alerts.map((alert, index) => {
                  const level = getAlertLevel(alert.level);
                  return (
                    <tr key={alert.timestamp + index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTimestamp(alert.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {alert.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${level.bg} ${level.color}`}>
                          {level.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
