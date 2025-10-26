import React from 'react';
import { Transaction } from '@/lib/types';
import { ArrowDownCircle, ArrowUpCircle, BookOpen, BookCheck } from 'lucide-react';

interface RecentActivityProps {
  transactions: Transaction[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ transactions }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'CHECK_IN':
        return <ArrowDownCircle className="w-5 h-5 text-green-600" />;
      case 'CHECK_OUT':
        return <ArrowUpCircle className="w-5 h-5 text-red-600" />;
      case 'BORROW':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'RETURN':
        return <BookCheck className="w-5 h-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'CHECK_IN':
        return 'Checked In';
      case 'CHECK_OUT':
        return 'Checked Out';
      case 'BORROW':
        return 'Borrowed Book';
      case 'RETURN':
        return 'Returned Book';
      default:
        return type;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'CHECK_IN':
        return 'bg-green-50';
      case 'CHECK_OUT':
        return 'bg-red-50';
      case 'BORROW':
        return 'bg-blue-50';
      case 'RETURN':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-start p-4 rounded-lg ${getBgColor(transaction.type)}`}
              >
                <div className="flex-shrink-0">
                  {getIcon(transaction.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {getTypeLabel(transaction.type)}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {transaction.studentName} ({transaction.studentId})
                  </p>
                  {transaction.bookTitle && (
                    <p className="text-sm text-gray-500 mt-1">
                      Book: {transaction.bookTitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
