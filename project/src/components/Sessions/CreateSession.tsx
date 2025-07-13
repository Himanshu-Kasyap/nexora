import React, { useState } from 'react';
import { Calendar, Clock, Users, Bot, ArrowRight } from 'lucide-react';

export default function CreateSession() {
  const [sessionData, setSessionData] = useState({
    title: '',
    description: '',
    type: 'group_discussion' as 'group_discussion' | 'interview',
    scheduledTime: '',
    duration: 30,
    participants: {
      realCount: 2,
      aiCount: 2
    }
  });

  const aiPersonalities = [
    { id: '1', name: 'Alex Chen', role: 'moderator', personality: 'Structured and analytical' },
    { id: '2', name: 'Sarah Miller', role: 'participant', personality: 'Creative and outspoken' },
    { id: '3', name: 'James Wilson', role: 'interviewer', personality: 'Experienced and professional' },
    { id: '4', name: 'Maya Patel', role: 'participant', personality: 'Thoughtful and collaborative' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating session:', sessionData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Session</h1>
            <p className="text-gray-600">Set up your group discussion or interview simulation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Session Details</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Title
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionData.title}
                    onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Leadership Discussion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <select
                    value={sessionData.type}
                    onChange={(e) => setSessionData({ ...sessionData, type: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="group_discussion">Group Discussion</option>
                    <option value="interview">Interview Simulation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={sessionData.description}
                  onChange={(e) => setSessionData({ ...sessionData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the session topic and objectives..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Scheduled Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={sessionData.scheduledTime}
                    onChange={(e) => setSessionData({ ...sessionData, scheduledTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    value={sessionData.duration}
                    onChange={(e) => setSessionData({ ...sessionData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Participant Configuration */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Participants</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Real Participants</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Number of slots</label>
                      <input
                        type="number"
                        min="0"
                        max="8"
                        value={sessionData.participants.realCount}
                        onChange={(e) => setSessionData({
                          ...sessionData,
                          participants: { ...sessionData.participants, realCount: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-sm text-gray-600">Real users will join via shareable link</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-2 mb-4">
                    <Bot className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">AI Participants</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Number of AI bots</label>
                      <input
                        type="number"
                        min="0"
                        max="4"
                        value={sessionData.participants.aiCount}
                        onChange={(e) => setSessionData({
                          ...sessionData,
                          participants: { ...sessionData.participants, aiCount: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-sm text-gray-600">AI participants with diverse personalities</p>
                  </div>
                </div>
              </div>

              {sessionData.participants.aiCount > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-medium text-gray-900 mb-4">AI Participants Preview</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {aiPersonalities.slice(0, sessionData.participants.aiCount).map((ai) => (
                      <div key={ai.id} className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <Bot className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{ai.name}</h5>
                            <p className="text-sm text-gray-600">{ai.role} • {ai.personality}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>Create Session</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}