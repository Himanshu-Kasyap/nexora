const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/discussionhub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['group_discussion', 'interview'], required: true },
  scheduledTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: {
    real: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ai: [{
      id: String,
      name: String,
      role: String,
      personality: String,
      avatar: String
    }]
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'], 
    default: 'scheduled' 
  },
  roomId: { type: String, required: true, unique: true },
  shareableLink: String,
  analysis: {
    overallScore: Number,
    participantAnalyses: [{
      participantId: String,
      participantName: String,
      speakingTime: Number,
      contributionQuality: Number,
      communicationEffectiveness: Number,
      keyPoints: [String],
      improvements: [String]
    }],
    keyInsights: [String],
    recommendations: [String],
    duration: Number,
    completedAt: Date
  },
  createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  senderId: String,
  senderName: String,
  senderType: { type: String, enum: ['user', 'ai'], required: true },
  content: String,
  type: { type: String, enum: ['text', 'audio'], default: 'text' },
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Session = mongoose.model('Session', sessionSchema);
const Message = mongoose.model('Message', messageSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// User routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user (in production, hash password)
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Session routes
app.post('/api/sessions', async (req, res) => {
  try {
    const { title, description, type, scheduledTime, duration, participants } = req.body;
    
    const roomId = Math.random().toString(36).substring(2, 15);
    const shareableLink = `${process.env.CLIENT_URL}/join/${roomId}`;

    const session = new Session({
      title,
      description,
      type,
      scheduledTime: new Date(scheduledTime),
      duration,
      createdBy: req.body.userId || '507f1f77bcf86cd799439011', // Mock user ID
      participants,
      roomId,
      shareableLink
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('createdBy', 'name email')
      .populate('participants.real', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('participants.real', 'name email');
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// AI Integration endpoints
app.post('/api/ai/generate-response', async (req, res) => {
  try {
    const { prompt, participantRole, context } = req.body;
    
    // Mock AI response - in production, integrate with OpenAI API
    const responses = {
      moderator: [
        "That's an interesting perspective. What do others think about this approach?",
        "Let's explore this idea further. Can you provide a specific example?",
        "I'd like to hear different viewpoints on this topic."
      ],
      participant: [
        "I believe this approach has merit because it addresses the core issues we're discussing.",
        "From my experience, I've seen similar situations where communication was the key factor.",
        "I'd like to build on that point and add that leadership requires adaptability."
      ],
      interviewer: [
        "Can you walk me through your thought process on that decision?",
        "How would you handle a situation where team members disagree?",
        "What would you consider your greatest strength in this area?"
      ]
    };

    const roleResponses = responses[participantRole] || responses.participant;
    const response = roleResponses[Math.floor(Math.random() * roleResponses.length)];

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ai/analyze-session', async (req, res) => {
  try {
    const { sessionId, messages, participants } = req.body;
    
    // Mock analysis - in production, use AI for real analysis
    const analysis = {
      overallScore: Math.floor(Math.random() * 30) + 70,
      participantAnalyses: participants.map(p => ({
        participantId: p.id,
        participantName: p.name,
        speakingTime: Math.floor(Math.random() * 300) + 60,
        contributionQuality: Math.floor(Math.random() * 30) + 70,
        communicationEffectiveness: Math.floor(Math.random() * 30) + 70,
        keyPoints: [
          "Demonstrated strong analytical thinking",
          "Provided relevant examples",
          "Engaged well with other participants"
        ],
        improvements: [
          "Consider speaking more frequently",
          "Elaborate on key points with more detail"
        ]
      })),
      keyInsights: [
        "Good overall participation from all members",
        "Strong collaborative discussion flow",
        "Effective use of examples and case studies"
      ],
      recommendations: [
        "Continue practicing active listening",
        "Work on asking follow-up questions",
        "Focus on providing specific examples"
      ],
      duration: Math.floor(Math.random() * 600) + 1200,
      completedAt: new Date()
    };

    // Update session with analysis
    await Session.findByIdAndUpdate(sessionId, { 
      analysis, 
      status: 'completed' 
    });

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Socket.IO for real-time communication
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-session', (sessionId) => {
    socket.join(sessionId);
    socket.to(sessionId).emit('user-joined', {
      userId: socket.id,
      timestamp: new Date()
    });
  });

  socket.on('send-message', async (data) => {
    try {
      const message = new Message({
        sessionId: data.sessionId,
        senderId: data.senderId,
        senderName: data.senderName,
        senderType: data.senderType,
        content: data.content,
        type: data.type || 'text'
      });

      await message.save();

      io.to(data.sessionId).emit('new-message', {
        id: message._id,
        ...data,
        timestamp: message.timestamp
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('audio-status', (data) => {
    socket.to(data.sessionId).emit('participant-audio-status', {
      userId: socket.id,
      isAudioEnabled: data.isAudioEnabled
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});