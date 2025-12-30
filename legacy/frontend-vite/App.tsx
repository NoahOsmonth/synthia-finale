import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Meetings from './pages/Meetings';
import Workspace from './pages/Workspace';
import MeetingRoom from './pages/MeetingRoom';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import MeetingHistory from './pages/MeetingHistory';
import MeetingSummary from './pages/MeetingSummary';
import MeetingSummaryDetail from './pages/MeetingSummaryDetail';
import Space from './pages/Space';
import Video from './pages/Video';
import Recording from './pages/Recording';
import Settings from './pages/Settings';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  // Landing page has its own layout (no sidebar/header)
  // Meeting Room has its own layout (no sidebar/header)
  // Workspace has its own sidebar structure
  // Space has its own sidebar structure
  // Video has its own layout (no sidebar/header)
  // Login has its own layout (no sidebar/header)
  // Recording has no sidebar but has header
  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const isMeetingRoom = location.pathname === '/meeting-room';
  const isWorkspace = location.pathname.startsWith('/workspace');
  const isSpace = location.pathname.startsWith('/space');
  const isVideo = location.pathname === '/video';
  const isRecording = location.pathname === '/recording';

  if (isLanding || isMeetingRoom || isVideo || isLogin || isRecording) {
    return <>{children}</>;
  }

  if (isWorkspace || isSpace) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-900">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header title=""/>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

const getPageTitle = (path: string): string => {
  if (path.startsWith('/meeting-summary/')) return 'Meeting Details';
  switch (path) {
    case '/': return 'Dashboard';
    case '/calendar': return 'Calendar';
    case '/meetings': return 'Meetings';
    case '/notifications': return 'Notifications';
    case '/profile': return 'Profile';
    case '/meeting-history': return 'Meeting History';
    case '/meeting-summary': return 'Meeting Summary';
    default: return 'Synthia';
  }
};

const App: React.FC = () => {
  // Initialize dark mode based on system preference or local storage
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/space" element={<Space />} />
          <Route path="/video" element={<Video />} />
          <Route path="/recording" element={<Recording />} />
          <Route path="/meeting-room" element={<MeetingRoom />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meeting-history" element={<MeetingHistory />} />
          <Route path="/meeting-summary" element={<MeetingSummary />} />
          <Route path="/meeting-summary/:id" element={<MeetingSummaryDetail />} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;