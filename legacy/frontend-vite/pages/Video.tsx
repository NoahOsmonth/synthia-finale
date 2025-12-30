import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import synthiaLogo from "@/assets/synthia-logo.png";

const Video: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [showPermissionDenied, setShowPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioOption, setAudioOption] = useState('dont-use-audio');
  const [isJoining, setIsJoining] = useState(false);
  const [backgroundBlurEnabled, setBackgroundBlurEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const micBarsRef = useRef<HTMLDivElement[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Update time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      };
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      };

      const dateStr = now.toLocaleDateString('en-US', dateOptions);
      const timeStr = now.toLocaleTimeString('en-US', timeOptions);
      const timeElement = document.getElementById('current-time');
      if (timeElement) {
        timeElement.textContent = `${dateStr} • ${timeStr}`;
      }
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize media
  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLoading(false);
        initAudioVisualizer(stream);
      } catch (err) {
        console.error('Error accessing media devices:', err);
        setShowPermissionDenied(true);
        setIsLoading(false);
      }
    };

    initMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const initAudioVisualizer = (stream: MediaStream) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      const microphone = audioContext.createMediaStreamSource(stream);
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = () => {
        if (isMicMuted) {
          micBarsRef.current.forEach((bar) => {
            bar.style.height = '4px';
          });
          return;
        }

        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;
        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += array[i];
        }
        const average = values / length;

        micBarsRef.current.forEach((bar, index) => {
          const height = Math.max(4, (average / 2) * (Math.random() * (index + 1)));
          bar.style.height = `${Math.min(height, 16)}px`;
        });
      };
    } catch (err) {
      console.error('Error initializing audio visualizer:', err);
    }
  };

  const toggleMic = () => {
    if (!localStream) return;
    const audioTracks = localStream.getAudioTracks();
    if (audioTracks.length > 0) {
      setIsMicMuted(!isMicMuted);
      audioTracks[0].enabled = isMicMuted;
    }
  };

  const toggleCamera = () => {
    if (!localStream) return;
    const videoTracks = localStream.getVideoTracks();
    if (videoTracks.length > 0) {
      setIsCameraOff(!isCameraOff);
      videoTracks[0].enabled = isCameraOff;
    }
  };

  const handleJoinNow = async () => {
    setIsJoining(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate('/meeting-room');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white dark:bg-slate-900 text-gray-800 dark:text-white">
      {/* Header */}
      <header className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 h-16 flex items-center justify-between px-6 z-10">
        <div className="flex items-center space-x-2">
          <img src={synthiaLogo} alt="Synthia" className="h-12 w-12" />
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">Synthia</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-gray-600 dark:text-slate-400">System Operational</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Video Preview & Controls */}
          <div className="lg:col-span-8 w-full flex flex-col space-y-6">
            {/* Meeting Info */}
            <div className="text-center lg:text-left space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Weekly Design Sync</h1>
              <p id="current-time" className="text-gray-500 dark:text-slate-400 font-medium text-sm"></p>
            </div>

            {/* Video Box */}
            <div className="video-container group relative bg-black rounded-lg overflow-hidden aspect-video">
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-800 z-20">
                  <div className="w-10 h-10 mb-4 border-4 border-gray-300 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin"></div>
                  <p className="text-gray-500 dark:text-slate-400 font-medium">Initializing devices...</p>
                </div>
              )}

              {/* Permission Denied State */}
              {showPermissionDenied && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-800 z-30">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Camera access denied</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm mt-2 max-w-xs text-center">
                    Please allow camera and microphone access in your browser settings to join the meeting.
                  </p>
                </div>
              )}

              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]"
              ></video>

              {/* Background Blur Overlay */}
              {backgroundBlurEnabled && !isCameraOff && !isLoading && !showPermissionDenied && (
                <>
                  {/* Blur effect layer */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    filter: 'blur(15px)',
                    zIndex: 5
                  }}>
                    <video
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform scale-x-[-1]"
                    >
                      <source src="" />
                    </video>
                  </div>
                  {/* Spotlight mask - sharp center, blurred edges */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.5) 100%)',
                    zIndex: 6
                  }}></div>
                </>
              )}

              {/* Camera Off State */}
              {isCameraOff && !isLoading && !showPermissionDenied && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-slate-800 flex flex-col items-center justify-center z-10">
                  <div className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-4 border-white dark:border-slate-700 shadow-sm flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">PP</span>
                  </div>
                  <p className="text-gray-500 dark:text-slate-400 font-medium bg-white dark:bg-slate-700 px-4 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-slate-600 text-sm">
                    Camera is off
                  </p>
                </div>
              )}

              {/* Mic Visualizer - Always visible */}
              {!isLoading && !showPermissionDenied && (
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center space-x-1.5 z-20" title="Mic Level">
                  <svg className={`w-4 h-4 ${isMicMuted ? 'text-red-400' : 'text-green-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMicMuted ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                    )}
                  </svg>
                  {!isMicMuted && (
                    <div className="flex items-end space-x-0.5 h-4">
                      <div
                        ref={(el) => {
                          if (el) micBarsRef.current[0] = el;
                        }}
                        className="mic-bar w-1 bg-green-400 rounded-full h-1"
                        style={{ height: '4px' }}
                      ></div>
                      <div
                        ref={(el) => {
                          if (el) micBarsRef.current[1] = el;
                        }}
                        className="mic-bar w-1 bg-green-400 rounded-full h-1.5"
                        style={{ height: '6px' }}
                      ></div>
                      <div
                        ref={(el) => {
                          if (el) micBarsRef.current[2] = el;
                        }}
                        className="mic-bar w-1 bg-green-400 rounded-full h-1"
                        style={{ height: '4px' }}
                      ></div>
                    </div>
                  )}
                  {isMicMuted && (
                    <span className="text-xs font-medium text-red-400">Muted</span>
                  )}
                </div>
              )}
            </div>

            {/* Controls Bar */}
            {!isLoading && !showPermissionDenied && (
              <div className="flex items-center justify-center space-x-6">
                {/* Mic Toggle */}
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={toggleMic}
                    className={`w-14 h-14 rounded-full bg-white dark:bg-slate-700 border flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isMicMuted
                        ? 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10'
                        : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                    }`}
                  >
                    {isMicMuted ? (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                      </svg>
                    )}
                  </button>
                  <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
                    {isMicMuted ? 'Mic Off' : 'Mic On'}
                  </span>
                </div>

                {/* Camera Toggle */}
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={toggleCamera}
                    className={`w-14 h-14 rounded-full bg-white dark:bg-slate-700 border flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isCameraOff
                        ? 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10'
                        : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600'
                    }`}
                  >
                    {isCameraOff ? (
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    )}
                  </button>
                  <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
                    {isCameraOff ? 'Cam Off' : 'Cam On'}
                  </span>
                </div>

                {/* Background Filter */}
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => setBackgroundBlurEnabled(!backgroundBlurEnabled)}
                    className={`w-14 h-14 rounded-full border shadow-sm flex items-center justify-center text-gray-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative ${
                      backgroundBlurEnabled
                        ? 'bg-blue-600 border-blue-700 text-white dark:bg-blue-600 dark:border-blue-700'
                        : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {backgroundBlurEnabled && (
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                      </span>
                    )}
                  </button>
                  <span className="text-xs font-medium text-gray-500 dark:text-slate-400">
                    {backgroundBlurEnabled ? 'Blur On' : 'Background'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Audio Options & Join */}
          <div className="lg:col-span-4 w-full h-full flex flex-col justify-center">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Audio Connection</h2>

              <div className="space-y-3">
                {/* Option 1: Computer Audio */}
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="audio-option"
                    value="computer-audio"
                    checked={audioOption === 'computer-audio'}
                    onChange={(e) => setAudioOption(e.target.value)}
                    className="hidden"
                  />
                  <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-4 flex items-center transition-all duration-200 group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                        audioOption === 'computer-audio'
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-slate-500'
                      }`}
                    >
                      {audioOption === 'computer-audio' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="block font-semibold text-gray-800 dark:text-white text-sm">Computer Audio</span>
                      <span className="block text-xs text-gray-500 dark:text-slate-400 mt-0.5">Use your mic and speakers</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                </label>
            

                {/* Option 3: Don't use audio */}
                <label className="cursor-pointer group">
                  <input
                    type="radio"
                    name="audio-option"
                    value="dont-use-audio"
                    checked={audioOption === 'dont-use-audio'}
                    onChange={(e) => setAudioOption(e.target.value)}
                    className="hidden"
                  />
                  <div className="border border-gray-200 dark:border-slate-600 rounded-xl p-4 flex items-center transition-all duration-200 group-hover:border-blue-500/50 dark:group-hover:border-blue-400/50">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                        audioOption === 'dont-use-audio'
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-slate-500'
                      }`}
                    >
                      {audioOption === 'dont-use-audio' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="block font-semibold text-gray-800 dark:text-white text-sm">Don't use audio</span>
                      <span className="block text-xs text-gray-500 dark:text-slate-400 mt-0.5">Join without audio</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>
                    </svg>
                  </div>
                </label>
              </div>

              {/* Footer Buttons */}
              <div className="mt-8 flex items-center justify-end space-x-3 pt-6 border-t border-gray-100 dark:border-slate-700">
                <button
                  onClick={() => navigate(-1)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-white font-semibold text-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoinNow}
                  disabled={isJoining}
                  className="flex-1 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 dark:hover:bg-blue-700 hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isJoining ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Join now</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Video;
