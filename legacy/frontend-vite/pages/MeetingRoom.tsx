import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, MoreVertical, Share, Hand, Smile, FileText, Monitor, LogOut, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MeetingRoom: React.FC = () => {
  const navigate = useNavigate();
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [time, setTime] = useState('00:11');
  const [activePanel, setActivePanel] = useState<'notes' | 'chat' | 'people' | null>('notes');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showCamMenu, setShowCamMenu] = useState(false);
  const [showMicMenu, setShowMicMenu] = useState(false);
  const [showReactMenu, setShowReactMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const togglePanel = (panel: 'notes' | 'chat' | 'people') => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const triggerReaction = (emoji: string) => {
    showToastMessage(emoji);
    setShowReactMenu(false);
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden font-sans">
      {/* Top Bar */}
      <header className="h-16 bg-[#1F1F1F] border-b border-gray-700 flex items-center justify-between px-4 z-20">
        <div className="flex items-center space-x-3 w-1/4">
          <div className="w-8 h-8 rounded-full border-2 border-gray-500 flex items-center justify-center">
            <div className="w-5 h-5 bg-transparent border-2 border-gray-400 rounded-full animate-pulse"></div>
          </div>
          <span className="font-medium text-gray-300">{time}</span>
        </div>

        {/* Center Controls */}
        <div className="flex items-center justify-center space-x-1 flex-1 relative">
          <button
            onClick={() => togglePanel('chat')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activePanel === 'chat' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title="Chat"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Chat</span>
          </button>

          <button
            onClick={() => togglePanel('people')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activePanel === 'people' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title="People"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">People</span>
          </button>

          <button
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              isHandRaised ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title="Raise hand"
          >
            <Hand className="w-5 h-5" />
            <span className="text-xs">{isHandRaised ? 'Lower' : 'Raise'}</span>
          </button>

          <button
            onClick={() => setShowReactMenu(!showReactMenu)}
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-colors relative"
            title="React"
          >
            <Smile className="w-5 h-5" />
            <span className="text-xs">React</span>

            {showReactMenu && (
              <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-[#2D2D2D] rounded-lg border border-gray-600 p-2 flex gap-2 shadow-xl">
                <button onClick={() => triggerReaction('👍')} className="text-2xl hover:scale-125 transition-transform">
                  👍
                </button>
                <button onClick={() => triggerReaction('🎉')} className="text-2xl hover:scale-125 transition-transform">
                  🎉
                </button>
                <button onClick={() => triggerReaction('😊')} className="text-2xl hover:scale-125 transition-transform">
                  😊
                </button>
                <button onClick={() => triggerReaction('❗')} className="text-2xl hover:scale-125 transition-transform">
                  ❗
                </button>
              </div>
            )}
          </button>

          <button
            onClick={() => togglePanel('notes')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activePanel === 'notes' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
            title="Notes"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Notes</span>
          </button>

          <div className="h-8 w-px bg-gray-600 mx-2"></div>

          {/* Camera Button */}
          <div className="relative">
            <button
              onClick={() => setShowCamMenu(!showCamMenu)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isCameraOff ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
              title="Camera"
            >
              {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              <span className="text-xs">Camera</span>
            </button>
            {showCamMenu && (
              <div className="absolute top-14 left-0 bg-[#2D2D2D] border border-gray-600 rounded-lg p-3 w-64 shadow-xl z-30">
                <p className="text-xs text-gray-400 mb-2 font-semibold">Camera</p>
                <div className="bg-gray-800 rounded p-2 text-sm border border-gray-600 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Integrated Webcam
                </div>
                <p className="text-xs text-gray-400 mb-2 font-semibold">Backgrounds</p>
                <div className="flex gap-2">
                  <button className="w-10 h-10 bg-gray-700 rounded border-2 border-purple-500 flex items-center justify-center text-xs text-white">
                    None
                  </button>
                  <button className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-xs text-white hover:bg-gray-600">
                    Blur
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mic Button */}
          <div className="relative">
            <button
              onClick={() => setShowMicMenu(!showMicMenu)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isMicMuted ? 'text-red-400' : 'text-gray-400 hover:text-white'
              }`}
              title="Microphone"
            >
              {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span className="text-xs">Mic</span>
            </button>
            {showMicMenu && (
              <div className="absolute top-14 left-0 bg-[#2D2D2D] border border-gray-600 rounded-lg p-4 w-72 shadow-xl z-30">
                <p className="text-xs text-gray-400 mb-2 font-semibold">Microphone</p>
                <div className="bg-gray-800 rounded p-2 text-sm border border-gray-600 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Microphone (Realtek Audio)
                </div>
                <div className="flex space-x-1 mb-4 h-2">
                  <div className="w-1 bg-green-500 h-full"></div>
                  <div className="w-1 bg-green-500 h-full"></div>
                  <div className="w-1 bg-green-500 h-full"></div>
                  <div className="w-1 bg-gray-600 h-full"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">Noise suppression</span>
                  <div className="w-8 h-4 bg-purple-600 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          <button className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-colors">
            <Monitor className="w-5 h-5" />
            <span className="text-xs">Share</span>
          </button>
        </div>

        {/* Right: Leave */}
        <div className="w-1/4 flex justify-end">
          <button
            onClick={() => navigate('/Meeting-History')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Leave</span>
          </button>
        </div>
      </header>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-gray-900/90 text-sm text-gray-100 px-4 py-2 rounded-full shadow-lg border border-gray-700">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Stage */}
        <div className="flex-1 bg-black flex flex-col items-center justify-center relative">
          <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl font-bold mb-4">
            KH
          </div>
          <h2 className="text-xl font-semibold text-white">Waiting for others to join...</h2>
        </div>

        {/* Side Panels */}
        {activePanel && (
          <div className="w-80 bg-[#1F1F1F] border-l border-gray-700 flex flex-col">
            {/* Panel Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white capitalize">
                {activePanel === 'notes' && 'Notes'}
                {activePanel === 'chat' && 'Meeting Chat'}
                {activePanel === 'people' && 'Participants'}
              </h3>
              <button
                onClick={() => setActivePanel(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notes Panel */}
            {activePanel === 'notes' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                  <h4 className="font-bold mb-2 text-sm text-white">Meeting Notes</h4>
                  <textarea
                    className="w-full bg-[#111827] border border-gray-700 rounded-lg text-sm text-gray-100 p-3 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                    rows={6}
                    placeholder="Type your notes here..."
                  ></textarea>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-sm text-white">Agenda</h4>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <div className="w-4 h-4 rounded-full border border-gray-500"></div>
                    <span>Topic, @name, time allotted</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-sm text-white">Follow-up tasks</h4>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm cursor-pointer hover:text-white">
                    <span>+ Add task</span>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Panel */}
            {activePanel === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span>Klariz Habla was invited to the meeting.</span>
                  </div>
                  <div className="text-center text-xs text-gray-500 my-2">Today</div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span>5:00 PM Meeting started</span>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-700">
                  <div className="bg-[#2D2D2D] rounded p-2 border border-gray-600">
                    <input
                      type="text"
                      placeholder="Type a message"
                      className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-500 mb-2"
                    />
                    <div className="flex justify-between items-center text-gray-400 text-sm">
                      <div className="flex space-x-2">
                        <button className="hover:text-white">A</button>
                        <button className="hover:text-white">😊</button>
                        <button className="hover:text-white">📎</button>
                      </div>
                      <button className="hover:text-white">→</button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* People Panel */}
            {activePanel === 'people' && (
              <div className="flex-1 overflow-y-auto p-3">
                <div className="bg-[#2D2D2D] border border-gray-600 rounded flex items-center px-3 py-1.5 mb-3">
                  <input
                    type="text"
                    placeholder="Type a name"
                    className="bg-transparent w-full text-sm outline-none text-white placeholder-gray-400"
                  />
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-400 font-semibold mb-1 cursor-pointer">
                    <span>In this meeting (1)</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 hover:bg-gray-800 rounded px-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        KH
                      </div>
                      <span className="text-sm font-medium text-white">Klariz Habla</span>
                    </div>
                    <div className="text-gray-400">
                      <Mic className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-400 font-semibold mb-1 cursor-pointer">
                    <span>Others invited (1)</span>
                  </div>
                  <div className="flex items-center space-x-3 py-1.5 hover:bg-gray-800 rounded px-1 opacity-60">
                    <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-xs">
                      NV
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Neil Bryan Villanueva</p>
                      <p className="text-xs text-gray-500">Organizer</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingRoom;