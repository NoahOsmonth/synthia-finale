import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, FileText, CheckSquare, Mic, 
  MessageSquare, Users, LayoutGrid, Upload, 
  Download, Play, MoreVertical, File, Clock, Search
} from 'lucide-react';

const MeetingSummaryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('summary');

  // Mock data for the view
  const meetingData = {
    title: "Capstone Project Proposal Defense",
    date: "November 18, 2025",
    time: "10:00 AM - 11:30 AM",
    duration: "1h 30m",
    organizer: "Klariz Habla",
    attendees: 12,
  };

  const tabs = [
    { id: 'summary', label: 'Summary & Reports', icon: FileText },
    { id: 'actions', label: 'Action Items', icon: CheckSquare },
    { id: 'transcript', label: 'Recording & Transcript', icon: Mic },
    { id: 'files', label: 'Shared Files', icon: File },
    { id: 'attendance', label: 'Attendance', icon: Users },
    { id: 'chat', label: 'Chat History', icon: MessageSquare },
    { id: 'breakout', label: 'Breakout Rooms', icon: LayoutGrid },
  ];

  return (
    <div className="p-6 md:p-8 bg-gray-50 dark:bg-slate-900 min-h-full">
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/meeting-history')}
          className="flex items-center text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{meetingData.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {meetingData.date} • {meetingData.time}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {meetingData.attendees} Attendees</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm flex items-center gap-2">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors shadow-sm flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload Formal Report
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700 mb-6 overflow-x-auto">
        <nav className="flex space-x-6 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors
                ${activeTab === tab.id 
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'}
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 min-h-[400px]">
        
        {/* === SUMMARY & REPORTS TAB === */}
        {activeTab === 'summary' && (
          <div className="space-y-8">
            {/* AI Summary */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span> Meeting Highlights
              </h3>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                <p>
                  The capstone proposal defense focused on the feasibility of the "Synthia" collaboration platform. 
                  Key discussions revolved around the tech stack selection, specifically the integration of real-time 
                  communication features using WebRTC. The panel provided feedback on the scope of the project, 
                  suggesting a phased rollout for the mobile application version.
                </p>
                <ul className="mt-4 list-disc pl-5 space-y-1">
                  <li>Approved the core module architecture.</li>
                  <li>Requested a detailed database schema revision by next Friday.</li>
                  <li>Highlighted potential security risks in the authentication flow.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100 dark:border-slate-700" />

            {/* Formal Report Upload Section */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span> Formal Documentation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Existing Report */}
                <div className="border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0 text-red-600 dark:text-red-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">Final_Proposal_v2.pdf</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Uploaded by Klariz Habla • 2.4 MB</p>
                    <div className="flex gap-3 mt-3">
                      <button className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline">View</button>
                      <button className="text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 hover:underline">Download</button>
                    </div>
                  </div>
                </div>

                {/* Upload New */}
                <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3 group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors">
                    <Upload className="w-5 h-5 text-gray-500 dark:text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-slate-200">Upload Formal Report</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Drag & drop or click to browse</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* === ACTION ITEMS TAB === */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Tasks</h3>
              <button className="text-sm text-violet-600 font-medium hover:underline">+ Add Item</button>
            </div>
            {[
              { id: 1, text: "Revise Entity Relationship Diagram (ERD)", owner: "Klariz Habla", due: "Nov 25", status: "In Progress" },
              { id: 2, text: "Setup CI/CD Pipeline for staging", owner: "Dev Team", due: "Nov 22", status: "Pending" },
              { id: 3, text: "Draft user acceptance testing script", owner: "QA Lead", due: "Nov 28", status: "Pending" },
            ].map(item => (
              <div key={item.id} className="flex items-center p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-violet-600 rounded border-gray-300 focus:ring-violet-500" />
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.text}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Assigned to: {item.owner} • Due: {item.due}</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* === RECORDING & TRANSCRIPT TAB === */}
        {activeTab === 'transcript' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
            {/* Player */}
            <div className="lg:col-span-2 flex flex-col bg-black rounded-lg overflow-hidden relative group">
              <div className="flex-1 flex items-center justify-center bg-gray-900">
                {/* Fake waveform viz */}
                <div className="flex items-center justify-center gap-1 h-32 w-full px-12 opacity-50">
                   {[...Array(40)].map((_, i) => (
                     <div key={i} className="w-1.5 bg-violet-500 rounded-full" style={{ height: `${Math.random() * 100}%`}}></div>
                   ))}
                </div>
              </div>
              {/* Controls */}
              <div className="bg-gray-800 p-4 flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </button>
                <div className="flex-1">
                  <div className="h-1 bg-gray-600 rounded-full w-full relative">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-violet-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>14:20</span>
                    <span>45:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className="border-l border-gray-200 dark:border-slate-700 pl-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Transcript</h4>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><Search className="w-4 h-4 text-gray-500" /></button>
                  <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><Download className="w-4 h-4 text-gray-500" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {[
                  { time: "00:05", speaker: "Klariz Habla", text: "Okay, let's start the defense. The floor is yours." },
                  { time: "00:12", speaker: "You", text: "Thank you. Today we present Synthia, an all-in-one collaboration workspace." },
                  { time: "02:45", speaker: "Panelist A", text: "Can you elaborate on the security measures for the file sharing module?" },
                  { time: "03:10", speaker: "You", text: "Yes, we implement end-to-end encryption for all transferred assets..." },
                ].map((line, idx) => (
                  <div key={idx} className="group hover:bg-gray-50 dark:hover:bg-slate-700/50 p-2 rounded transition-colors cursor-pointer">
                    <p className="text-xs font-bold text-violet-600 dark:text-violet-400 mb-1">{line.speaker} <span className="text-gray-400 font-normal ml-2">{line.time}</span></p>
                    <p className="text-sm text-gray-700 dark:text-slate-300">{line.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === SHARED FILES TAB === */}
        {activeTab === 'files' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Files Shared in Meeting</h3>
            <div className="space-y-2">
              {[
                { name: "System_Architecture_v1.png", size: "1.2 MB", type: "Image" },
                { name: "Budget_Proposal.xlsx", size: "450 KB", type: "Sheet" },
                { name: "Frontend_Mockups.fig", size: "12 MB", type: "Figma" },
              ].map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded flex items-center justify-center">
                      <File className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><MoreVertical className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ATTENDANCE TAB === */}
        {activeTab === 'attendance' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Total Attendees</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Avg Duration</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">42m</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-500 dark:text-slate-400 uppercase font-bold">Start Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">10:02 AM</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-300 rounded-l-lg">Name</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-300">Join Time</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-300">Leave Time</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 dark:text-slate-300 rounded-r-lg">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {[
                    { name: "Klariz Habla", join: "10:00 AM", leave: "11:30 AM", dur: "1h 30m" },
                    { name: "Peter Parker", join: "10:02 AM", leave: "11:30 AM", dur: "1h 28m" },
                    { name: "Sarah Chen", join: "10:05 AM", leave: "11:15 AM", dur: "1h 10m" },
                  ].map((p, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{p.name}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-400">{p.join}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-400">{p.leave}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-slate-400">{p.dur}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === CHAT HISTORY TAB === */}
        {activeTab === 'chat' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 flex-shrink-0">KH</div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900 dark:text-white">Klariz Habla</span>
                  <span className="text-xs text-gray-500">10:15 AM</span>
                </div>
                <div className="mt-1 bg-gray-50 dark:bg-slate-700 p-3 rounded-r-xl rounded-bl-xl text-gray-800 dark:text-slate-200 text-sm">
                  Welcome everyone. Please verify if you can access the shared drive folder.
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">PP</div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900 dark:text-white">Peter Parker</span>
                  <span className="text-xs text-gray-500">10:16 AM</span>
                </div>
                <div className="mt-1 bg-gray-50 dark:bg-slate-700 p-3 rounded-r-xl rounded-bl-xl text-gray-800 dark:text-slate-200 text-sm">
                  Access confirmed. I see the requirements doc.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === BREAKOUT ROOMS TAB === */}
        {activeTab === 'breakout' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Breakout Sessions (10:45 AM - 11:15 AM)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Room 1: Backend", participants: ["Peter Parker", "Dev Team A", "Dev Team B"] },
                { name: "Room 2: Frontend", participants: ["Sarah Chen", "Designer A", "Designer B"] },
                { name: "Room 3: QA", participants: ["QA Lead", "Tester A"] },
              ].map((room, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{room.name}</h4>
                    <span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-gray-600 dark:text-slate-300">30 mins</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {room.participants.map((p, i) => (
                      <span key={i} className="px-2 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-xs rounded-full font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MeetingSummaryDetail;