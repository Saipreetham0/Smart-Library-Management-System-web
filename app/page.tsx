'use client';

import { BookOpen, Users, Activity, UserCheck, Clock } from 'lucide-react';
import StatCard from '@/components/StatCard';
import RecentActivity from '@/components/RecentActivity';
import { useStats, useStudents, useBooks, useTransactions } from '@/hooks';

export default function Home() {
  const { stats, loading } = useStats();
  const { students } = useStudents();
  const { books } = useBooks();
  const { transactions } = useTransactions();

  const availableBooks = books.filter(b => b.isAvailable).length;
  const borrowedBooks = books.filter(b => !b.isAvailable).length;
  const checkedInStudents = students.filter(s => s.isCheckedIn).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Real-time library management and monitoring</p>
        {stats.lastSync && (
          <p className="mt-1 text-sm text-gray-500">Last sync: {stats.lastSync}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users className="w-6 h-6" />}
          subtitle={`${checkedInStudents} checked in`}
          color="blue"
        />
        <StatCard
          title="Total Books"
          value={stats.totalBooks}
          icon={<BookOpen className="w-6 h-6" />}
          subtitle={`${availableBooks} available`}
          color="green"
        />
        <StatCard
          title="People in Library"
          value={stats.peopleCount}
          icon={<UserCheck className="w-6 h-6" />}
          subtitle="Current occupancy"
          color="purple"
        />
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions}
          icon={<Activity className="w-6 h-6" />}
          subtitle="All time"
          color="orange"
        />
      </div>

      {/* Book Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available Books</p>
                  <p className="text-2xl font-bold text-gray-900">{availableBooks}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {stats.totalBooks > 0 ? Math.round((availableBooks / stats.totalBooks) * 100) : 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Borrowed Books</p>
                  <p className="text-2xl font-bold text-gray-900">{borrowedBooks}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {stats.totalBooks > 0 ? Math.round((borrowedBooks / stats.totalBooks) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Checked In</p>
                  <p className="text-2xl font-bold text-gray-900">{checkedInStudents}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {stats.totalStudents > 0 ? Math.round((checkedInStudents / stats.totalStudents) * 100) : 0}%
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Checked Out</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents - checkedInStudents}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {stats.totalStudents > 0 ? Math.round(((stats.totalStudents - checkedInStudents) / stats.totalStudents) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity transactions={transactions.slice(0, 10)} />
    </div>
  );
}
