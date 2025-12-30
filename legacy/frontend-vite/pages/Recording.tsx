import React, { useState } from 'react';
import { Pause, Square, Volume2, MessageSquare, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Recording: React.FC = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="p-6 md:p-8 overflow-y-auto bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/meetings')}
            className="flex items-center gap-2 mb-6 text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Meetings
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            
            {/* Left Column: Recording Visualizer (2/3 width) */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Recording Visualizer */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:border dark:border-slate-700 p-8 flex flex-col items-center justify-center relative overflow-hidden h-full">
                
                {/* Recording Icon Container with Pulse Ring */}
                <div className="relative flex items-center justify-center">
                  {/* Pulse Ring Background */}
                  <div className="absolute w-32 h-32 bg-violet-100 dark:bg-violet-900/30 rounded-full animate-pulse pointer-events-none"></div>
                  
                  {/* Recording Icon */}
                  <div className="relative z-10 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full p-6 shadow-lg">
                    <div className="w-12 h-12 text-white flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Meeting Title */}
                <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">Weekly Design Sync</h2>
                <p className="text-gray-500 dark:text-slate-400">
                  {isRecording ? 'Recording in progress...' : 'Paused'}
                </p>
                
                {/* Controls */}
                <div className="flex items-center space-x-4 mt-8">
                  <button 
                    onClick={() => setIsRecording(!isRecording)}
                    className="p-4 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Pause className="w-6 h-6" />
                  </button>
                  
                  <button className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg transition-colors">
                    <Square className="w-8 h-8 fill-white" />
                  </button>
                  
                  <button className="p-4 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Transcription (1/3 width) */}
            <div className="lg:col-span-1 flex flex-col">
              {/* Live Transcription */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md dark:border dark:border-slate-700 p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-slate-700">
                  <h3 className="font-semibold text-gray-800 dark:text-white flex items-center">
                    <MessageSquare className="w-5 h-5 text-violet-500 mr-2" />
                    Live Transcription
                  </h3>
                  <span className="text-xs text-gray-400 dark:text-slate-500 uppercase font-bold tracking-wider">Auto-scrolling</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {/* Transcription Entry 1 */}
                  <div className="flex gap-3">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Peter Parker" className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mb-1">
                        Peter Parker 
                        <span className="ml-2 font-normal opacity-70">10:00 AM</span>
                      </p>
                      <p className="text-sm text-gray-700 dark:text-slate-300">
                        Alright, let's get started. Thanks everyone for joining. Today we need to finalize the Q4 roadmap.
                      </p>
                    </div>
                  </div>

                  {/* Transcription Entry 2 */}
                  <div className="flex gap-3">
                    <img src="https://i.pravatar.cc/100?img=5" alt="Sarah Chen" className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mb-1">
                        Sarah Chen 
                        <span className="ml-2 font-normal opacity-70">10:01 AM</span>
                      </p>
                      <p className="text-sm text-gray-700 dark:text-slate-300">
                        I have the user research data ready to present. It strongly suggests we focus on mobile improvements first.
                      </p>
                    </div>
                  </div>

                  {/* Transcription Entry 3 - Typing */}
                  <div className="flex gap-3 opacity-50">
                    <img src="https://i.pravatar.cc/100?img=3" alt="Mike Ross" className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mb-1">
                        Mike Ross 
                        <span className="ml-2 font-normal opacity-70">10:02 AM</span>
                      </p>
                      <p className="text-sm text-gray-700 dark:text-slate-300">
                        That aligns with the tech team's capacity as well...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recording;
