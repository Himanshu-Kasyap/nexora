export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface AIParticipant {
  id: string;
  name: string;
  role: 'interviewer' | 'participant' | 'moderator';
  personality: string;
  avatar: string;
}

export interface Session {
  _id: string;
  title: string;
  description: string;
  type: 'group_discussion' | 'interview';
  scheduledTime: string;
  duration: number; // in minutes
  createdBy: User;
  participants: {
    real: User[];
    ai: AIParticipant[];
  };
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  roomId: string;
  shareableLink: string;
  createdAt: string;
  analysis?: SessionAnalysis;
}

export interface SessionAnalysis {
  overallScore: number;
  participantAnalyses: ParticipantAnalysis[];
  keyInsights: string[];
  recommendations: string[];
  duration: number;
  completedAt: string;
}

export interface ParticipantAnalysis {
  participantId: string;
  participantName: string;
  speakingTime: number;
  contributionQuality: number;
  communicationEffectiveness: number;
  keyPoints: string[];
  improvements: string[];
}

export interface Message {
  id: string;
  sessionId: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'ai';
  content: string;
  timestamp: string;
  type: 'text' | 'audio';
}