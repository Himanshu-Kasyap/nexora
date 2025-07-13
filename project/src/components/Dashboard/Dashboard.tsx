import React from 'react';
import { Calendar, Users, BarChart3, Plus, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stats = [
    { label: 'Total Sessions', value: '24', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Hours Practiced', value: '18.5', icon: Clock, color: 'bg-green-500' },
    { label: 'Average Score', value: '85%', icon: BarChart3, color: 'bg-purple-500' },
    { label: 'Completed', value: '22', icon: CheckCircle, color: 'bg-orange-500' }
  ];

  const recentSessions = [
    {
      id: '1',
      title: 'Leadership Discussion',
      type: 'Group Discussion',
      date: '2024-01-15',
      status: 'completed',
      score: 88
    },
    {
      id: '2',
      title: 'Technical Interview Prep',
      type: 'Interview',
      date: '2024-01-14',
      status: 'completed',
      score: 82
    },
    {
      id: '3',
      title: 'Team Collaboration Session',
      type: 'Group Discussion',
      date: '2024-01-16',
      status: 'scheduled',
      score: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your progress and manage your sessions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Sessions</h2>
                <Link 
                  to="/sessions"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{session.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{session.type} • {session.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {session.score && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-medium">
                            {session.score}%
                          </div>
                        )}
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {session.status === 'completed' ? 'Completed' : 'Scheduled'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link 
                  to="/sessions/create"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create New Session</span>
                </Link>
                <Link 
                  to="/sessions/join"
                  className="w-full border border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Users className="h-5 w-5" />
                  <span>Join Session</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Insights</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Strength</h3>
                  <p className="text-green-700 text-sm">Excellent communication clarity</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Improvement Area</h3>
                  <p className="text-blue-700 text-sm">Consider speaking more in group settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}