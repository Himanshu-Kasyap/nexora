import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Users, Clock, MessageSquare, Settings } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  type: 'user' | 'ai';
  isActive: boolean;
  isSpeaking: boolean;
}

export default function SessionRoom() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [participants] = useState<Participant[]>([
    { id: '1', name: 'You', type: 'user', isActive: true, isSpeaking: false },
    { id: '2', name: 'Alice Johnson', type: 'user', isActive: true, isSpeaking: false },
    { id: '3', name: 'Alex Chen (AI)', type: 'ai', isActive: true, isSpeaking: true },
    { id: '4', name: 'Maya Patel (AI)', type: 'ai', isActive: true, isSpeaking: false }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Leadership Discussion Session</h1>
            <p className="text-gray-400 text-sm">Group Discussion • 4 participants</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(sessionTime)}</span>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Participants Grid */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 gap-6 h-full">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center relative ${
                    participant.isSpeaking ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-semibold mb-4 ${
                    participant.type === 'ai' 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                      : 'bg-gradient-to-r from-blue-500 to-green-500'
                  }`}>
                    {participant.name.charAt(0)}
                  </div>
                  <h3 className="font-medium text-lg mb-2">{participant.name}</h3>
                  <div className="flex items-center space-x-2">
                    {participant.isActive ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                    <span className="text-sm text-gray-400">
                      {participant.isActive ? 'Active' : 'Away'}
                    </span>
                  </div>
                  {participant.isSpeaking && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">Speaking</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={`p-4 rounded-full transition-colors ${
                  isAudioEnabled 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isAudioEnabled ? (
                  <Mic className="h-6 w-6" />
                ) : (
                  <MicOff className="h-6 w-6" />
                )}
              </button>

              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors">
                End Session
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Participants List */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5" />
              <h2 className="font-semibold">Participants ({participants.length})</h2>
            </div>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    participant.type === 'ai' 
                      ? 'bg-purple-600' 
                      : 'bg-blue-600'
                  }`}>
                    {participant.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{participant.name}</p>
                    <p className="text-xs text-gray-400">
                      {participant.type === 'ai' ? 'AI Participant' : 'User'}
                    </p>
                  </div>
                  {participant.isSpeaking && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <h2 className="font-semibold">Session Chat</h2>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Alex Chen (AI)</p>
                  <p className="text-sm">Welcome everyone! Let's start by discussing the key qualities of effective leadership.</p>
                </div>
                <div className="bg-blue-600 p-3 rounded-lg ml-8">
                  <p className="text-xs text-blue-200 mb-1">You</p>
                  <p className="text-sm">I think communication is one of the most important aspects of leadership.</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}