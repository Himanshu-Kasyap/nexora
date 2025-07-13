import React from 'react';
import { Calendar, Share2, Mic, FileText, Clock, Users2 } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Flexible Scheduling',
    description: 'Schedule sessions at your convenience with an intuitive calendar interface.'
  },
  {
    icon: Users2,
    title: 'Mixed Participants',
    description: 'Choose any combination of AI participants and real users for diverse experiences.'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share session links with participants for seamless joining and collaboration.'
  },
  {
    icon: Mic,
    title: 'Audio Communication',
    description: 'High-quality audio support for natural conversation flow and practice.'
  },
  {
    icon: FileText,
    title: 'Performance Reports',
    description: 'Detailed AI-generated analysis of your participation and communication skills.'
  },
  {
    icon: Clock,
    title: 'Real-time Sessions',
    description: 'Live sessions with instant feedback and interactive discussion moderation.'
  }
];

export default function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools and features designed to help you master group discussions and interview skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}