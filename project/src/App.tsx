import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Hero from './components/LandingPage/Hero';
import Features from './components/LandingPage/Features';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import CreateSession from './components/Sessions/CreateSession';
import SessionRoom from './components/Sessions/SessionRoom';

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}

function App() {
  // Mock user state - in real app this would come from auth context
  const user = null; // Set to user object when authenticated

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sessions/create" element={<CreateSession />} />
          <Route path="/sessions/:id" element={<SessionRoom />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;