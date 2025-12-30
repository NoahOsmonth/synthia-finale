import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, Clock, Users, Plus, Video, X, 
  MapPin, ChevronDown, Building, Repeat, Paperclip, AlignLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Meetings: React.FC = () => {
  const navigate = useNavigate();

  // --- STATE FOR MODAL & FORM ---
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [attendeeInput, setAttendeeInput] = useState('');
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [isOnlineMeeting, setIsOnlineMeeting] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock Workspaces Data (Same as Calendar)
  const workspaces = [
    { id: 'ws1', name: 'Capstone 101', memberCount: 5 },
    { id: 'ws2', name: 'Internal Tools', memberCount: 12 },
    { id: 'ws3', name: 'Client Projects', memberCount: 8 },
    { id: 'ws4', name: 'Marketing Team', memberCount: 4 },
  ];

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowWorkspaceDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddWorkspace = (workspaceName: string) => {
    const newEntry = `[Workspace: ${workspaceName}]`;
    setAttendeeInput(prev => prev ? `${prev}, ${newEntry}` : newEntry);
    setShowWorkspaceDropdown(false);
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-slate-900 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Meetings</h2>
          <p className="text-gray-500 dark:text-slate-400">Plan meetings, check schedules, and stay connected.</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* 1. Schedule Meeting - NOW CLICKABLE */}
        <button 
          onClick={() => setShowNewEventModal(true)} 
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-left dark:bg-slate-800 dark:border dark:border-slate-700"
        >
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="p-4 bg-gray-100 text-gray-600 rounded-full mb-4 dark:bg-slate-700 dark:text-slate-300">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 dark:text-white">Schedule Meeting</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">Pick a date and notify your team.</p>
          </div>
        </button>

        {/* 2. Record Meeting */}
        <button 
          onClick={() => navigate('/recording')}
          className="bg-white p-6 rounded-2xl shadow-md border-2 border-red-100 hover:shadow-lg transition-all hover:border-red-300 dark:bg-slate-800 dark:border-red-900"
        >
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="p-4 bg-red-100 text-red-600 rounded-full mb-4 animate-pulse dark:bg-red-900/30 dark:text-red-400">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 dark:text-white">Record Meeting</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">Start live transcription & recording.</p>
          </div>
        </button>

        {/* 3. Meeting History */}
        <button 
          onClick={() => navigate('/meeting-history')}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-left dark:bg-slate-800 dark:border dark:border-slate-700"
        >
          <div className="flex flex-col items-center justify-center text-center h-full">
            <div className="p-4 bg-gray-100 text-gray-600 rounded-full mb-4 dark:bg-slate-700 dark:text-slate-300">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 dark:text-white">Meeting History</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">Access past recordings and notes.</p>
          </div>
        </button>

      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md dark:bg-slate-800 dark:border dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">Upcoming Meetings</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm font-medium text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
                <th className="py-3 px-4">Meeting</th>
                <th className="py-3 px-4">Team</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-semibold text-gray-800 dark:text-white block">Design Review</span>
                  <span className="text-xs text-gray-500 dark:text-slate-400">ShopEase Dashboard</span>
                </td>
                <td className="py-4 px-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">Kobam Design</span></td>
                <td className="py-4 px-4 text-gray-700 dark:text-slate-300">Feb 20, 2025</td>
                <td className="py-4 px-4 text-gray-700 dark:text-slate-300">09:00 AM</td>
                <td className="py-4 px-4">
                  <button onClick={() => navigate('/meeting-room')} className="px-3 py-1 bg-violet-600 text-white text-xs rounded hover:bg-violet-700">Join</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-semibold text-gray-800 dark:text-white block">Weekly Sync</span>
                  <span className="text-xs text-gray-500 dark:text-slate-400">General Updates</span>
                </td>
                <td className="py-4 px-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">Internal</span></td>
                <td className="py-4 px-4 text-gray-700 dark:text-slate-300">Feb 21, 2025</td>
                <td className="py-4 px-4 text-gray-700 dark:text-slate-300">02:00 PM</td>
                <td className="py-4 px-4">
                  <button onClick={() => navigate('/meeting-room')} className="px-3 py-1 bg-violet-600 text-white text-xs rounded hover:bg-violet-700">Join</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- NEW EVENT MODAL (Copied from Calendar) --- */}
      {showNewEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
            onClick={() => setShowNewEventModal(false)}
          ></div>

          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-xl bg-white dark:bg-slate-800 text-left shadow-2xl transition-all w-full max-w-xl border border-gray-100 dark:border-slate-700">
                
                <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Set a Scheduled Meeting</h3>
                </div>

                <div className="p-6 space-y-5">
                    {/* Event Details */}
                    <div>
                        <label htmlFor="event-title" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Add title <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            id="event-title" 
                            placeholder="Add event title here" 
                            className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                            required
                        />
                    </div>

                    {/* Attendees with Workspace Dropdown */}
                    <div ref={dropdownRef}>
                        <label htmlFor="attendees" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Add required attendees</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                id="attendees" 
                                value={attendeeInput}
                                onChange={(e) => setAttendeeInput(e.target.value)}
                                placeholder="Enter attendees or select workspace..." 
                                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                            />
                            <Users className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                            
                            <button 
                                type="button"
                                onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
                                className="absolute right-2 top-1.5 p-1 text-gray-400 hover:text-violet-600 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md transition-colors"
                                title="Add from Workspace"
                            >
                                <ChevronDown className={`w-4 h-4 transition-transform ${showWorkspaceDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showWorkspaceDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 overflow-hidden">
                                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700">
                                        SELECT WORKSPACE TO INVITE
                                    </div>
                                    <ul className="py-1">
                                        {workspaces.map((ws) => (
                                            <li key={ws.id}>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleAddWorkspace(ws.name)}
                                                    className="w-full text-left px-4 py-2 hover:bg-violet-50 dark:hover:bg-slate-700/50 flex items-center justify-between group transition-colors"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Building className="w-4 h-4 text-gray-400 group-hover:text-violet-600 dark:text-slate-500 dark:group-hover:text-violet-400" />
                                                        <span className="text-sm text-gray-700 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-white font-medium">
                                                            {ws.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-gray-400 group-hover:text-violet-500">
                                                        {ws.memberCount} members
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                        <label htmlFor="event-date" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Date</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                id="event-date" 
                                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-4 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="start-time" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Start Time</label>
                            <div className="relative">
                                <input 
                                    type="time" 
                                    id="start-time" 
                                    defaultValue="12:00"
                                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="end-time" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">End Time</label>
                            <div className="relative">
                                <input 
                                    type="time" 
                                    id="end-time" 
                                    defaultValue="13:00"
                                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location & Options */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Add Location</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    id="location" 
                                    placeholder="Enter location" 
                                    className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                                />
                                <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 cursor-pointer hover:text-violet-600 dark:hover:text-violet-400">
                                <Repeat className="w-4 h-4" />
                                <span>Does not repeat</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">Online Meeting</span>
                                <button
                                    type="button"
                                    onClick={() => setIsOnlineMeeting(!isOnlineMeeting)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${isOnlineMeeting ? 'bg-violet-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOnlineMeeting ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Attachment */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Upload Attachment</label>
                        <label className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-colors group">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                                <Paperclip className="w-4 h-4" />
                                <span className="text-sm font-medium">Click to upload or drag and drop</span>
                            </div>
                            <input type="file" className="hidden" />
                        </label>
                    </div>

                    {/* Agenda */}
                    <div>
                        <label htmlFor="agenda-item" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Agenda</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                id="agenda-item" 
                                placeholder="Add agenda item" 
                                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                            />
                            <AlignLeft className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/30 flex justify-end gap-3 border-t border-gray-100 dark:border-slate-700">
                    <button 
                        onClick={() => setShowNewEventModal(false)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors shadow-md shadow-violet-200 dark:shadow-none">
                        Confirm
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;