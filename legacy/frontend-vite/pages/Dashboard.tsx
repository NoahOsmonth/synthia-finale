import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Users, Video, ArrowRight, X, AlertCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  status: string;
  workspace: string;
  dueDate: string;
  priority: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showBriefing, setShowBriefing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasks: Task[] = [
    {
      id: 1,
      title: "UI Design",
      status: "In Progress",
      workspace: "Capstone 101",
      dueDate: "11/20/2025",
      priority: "High Priority",
      description: "Draft the initial wireframes for the new dashboard layout, focusing on the widget grid system and responsive behavior for mobile devices. Incorporate the new Violet brand color scheme."
    },
    {
      id: 2,
      title: "Database Schema",
      status: "Completed",
      workspace: "Capstone 101",
      dueDate: "11/15/2025",
      priority: "High Priority",
      description: "Analyze requirements for the new 'Projects' feature and update the ERD. Create migration scripts to add the 'workspaces' table and establish foreign key constraints."
    },
    {
      id: 3,
      title: "API Integration",
      status: "Pending",
      workspace: "Internal Tools",
      dueDate: "11/25/2025",
      priority: "Medium",
      description: "Integrate the third-party calendar API to sync user events. Implement OAuth2 authentication flow and handle token refreshing mechanism."
    }
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showBriefing || selectedTask) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showBriefing, selectedTask]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBriefing(false);
        setSelectedTask(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Completed': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    if (priority.includes('High')) return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300';
    if (priority.includes('Medium')) return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="p-6 md:p-8 bg-gray-100 dark:bg-slate-900 min-h-full">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2 dark:text-slate-400">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
                <button 
                  aria-label="View all tasks"
                  onClick={() => navigate('/tasks')} 
                  className="p-2 hover:bg-gray-100 rounded dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400"
                >
                  <CheckSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2 dark:text-slate-400">Active Workspaces</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
                </div>
                <button 
                  aria-label="View active workspaces"
                  onClick={() => navigate('/collaboration')} 
                  className="p-2 hover:bg-gray-100 rounded dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400"
                >
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2 dark:text-slate-400">Meetings Today</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
                </div>
                <button 
                  aria-label="View today's meetings"
                  onClick={() => navigate('/meetings')} 
                  className="p-2 hover:bg-gray-100 rounded dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400"
                >
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Alert Box */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 dark:text-slate-300">PRE MEETING HEADS-UP</h3>
            <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Tomorrow, 10:00 AM !</p>
                <p className="text-sm text-gray-600 mt-1 dark:text-slate-400">Strategic Planning and Policy Alignment Meeting - Q4 2025</p>
              </div>
              <button 
                id="btn-view-briefing" 
                onClick={() => setShowBriefing(true)}
                className="px-4 py-2 bg-violet-600 text-white rounded-lg font-medium text-sm hover:bg-violet-700 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                <span>View Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Task List Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Task List Overview</h3>
              <button onClick={() => navigate('/tasks')} className="text-violet-600 font-medium hover:text-violet-700 text-sm">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider">Task Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider">Workspace</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider">Due Date</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 dark:text-slate-400 uppercase text-xs tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 text-gray-800 font-medium dark:text-white">{task.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-slate-400 whitespace-nowrap">{task.workspace}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-slate-400 whitespace-nowrap">{task.dueDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedTask(task)}
                          className="px-4 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-md hover:bg-violet-700 transition-colors shadow-sm"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Calendar Widget - COMPACT VERSION */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <button 
                aria-label="Previous month"
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-400 hover:text-gray-600 dark:text-slate-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <h3 className="text-sm font-bold text-gray-800 dark:text-white">December 2025</h3>
              <button 
                aria-label="Next month"
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-400 hover:text-gray-600 dark:text-slate-400 transition-colors"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
            
            <div className="grid grid-cols-7 text-center mb-1">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <div key={d} className="text-[10px] font-medium text-gray-400 dark:text-slate-500 py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs">
              {/* Prev Month */}
              <div className="py-1.5 text-gray-300 dark:text-slate-600">30</div>
              
              {/* Days 1-3 */}
              <div className="py-1.5 text-gray-700 dark:text-slate-300 font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg">1</div>
              <div className="py-1.5 text-gray-700 dark:text-slate-300 font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg">2</div>
              <div className="py-1.5 text-gray-700 dark:text-slate-300 font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg">3</div>
              
              {/* Selected Day 4 */}
              <div className="relative">
                  <div className="absolute inset-0 bg-violet-600 rounded-md shadow-sm shadow-violet-200 dark:shadow-none"></div>
                  <div className="relative py-1.5 text-white font-bold cursor-pointer">4</div>
              </div>

              {/* Days 5-31 */}
              {[...Array(27)].map((_, i) => (
                 <div key={i + 5} className="py-1.5 text-gray-700 dark:text-slate-300 font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg">{i + 5}</div>
              ))}
              
              {/* Next Month */}
              <div className="py-1.5 text-gray-300 dark:text-slate-600">1</div>
              <div className="py-1.5 text-gray-300 dark:text-slate-600">2</div>
              <div className="py-1.5 text-gray-300 dark:text-slate-600">3</div>
            </div>
          </div>

          {/* Schedule Widget - COMPACTED */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 dark:bg-slate-800 dark:border-slate-700">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-white">Schedule</h3>
              <p className="text-[10px] text-gray-500 mt-1 dark:text-slate-400">Today - November 18, 2025</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="flex gap-3 pb-2 border-b border-gray-100 last:border-0 dark:border-slate-700">
                <div className="w-10 flex-shrink-0 pt-0.5">
                  <p className="text-xs font-bold text-violet-600 dark:text-violet-400">9:00</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800 dark:text-white">Monthly Meeting</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 dark:text-slate-400">Capstone 101 Workspace</p>
                </div>
              </div>
              <div className="flex gap-3 pb-2 border-b border-gray-100 last:border-0 dark:border-slate-700">
                <div className="w-10 flex-shrink-0 pt-0.5">
                  <p className="text-xs font-bold text-violet-600 dark:text-violet-400">10:00</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800 dark:text-white">Design Sync</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 dark:text-slate-400">Internal Tools</p>
                </div>
              </div>
            </div>
          </div>

          {/* Missed Meetings Widget - COMPACTED */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4 dark:bg-slate-800 dark:border-red-900/50 relative overflow-hidden">
            {/* Red Accent Strip */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
            
            <div className="mb-3 pl-2 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
                   Missed Meetings
                </h3>
                <p className="text-[10px] text-red-500 mt-0.5 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3"/> Action Required
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 pl-2">
                <div className="flex flex-col gap-2 pb-2 border-b border-gray-100 last:border-0 dark:border-slate-700">
                   <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-white">Project Alpha Sync</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 dark:text-slate-400">Yesterday, 2:00 PM</p>
                      </div>
                   </div>
                   <button onClick={() => navigate('/meeting-summary')} className="text-[10px] w-full bg-red-50 text-red-600 py-1 rounded border border-red-100 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 transition-colors font-medium">
                       View Summary
                   </button>
                </div>

                <div className="flex flex-col gap-2 pb-2 border-b border-gray-100 last:border-0 dark:border-slate-700">
                   <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-white">Client Onboarding</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 dark:text-slate-400">Nov 16, 11:00 AM</p>
                      </div>
                   </div>
                   <button onClick={() => navigate('/meeting-summary')} className="text-[10px] w-full bg-red-50 text-red-600 py-1 rounded border border-red-100 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 transition-colors font-medium">
                       View Summary
                   </button>
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* Briefing Modal - FIXED */}
      {showBriefing && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
            onClick={() => setShowBriefing(false)}
          ></div>

          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-3xl dark:bg-slate-800 border border-transparent dark:border-slate-700">
                
                {/* REMOVED: Absolute full-height purple accent strip */}

                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pl-8 dark:bg-slate-800">
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                             {/* ADDED: Small purple accent pill next to title */}
                             <span className="w-1.5 h-6 bg-violet-600 rounded-full flex-shrink-0"></span>
                             <h3 className="text-lg font-bold leading-6 text-gray-900 dark:text-white" id="modal-title">Planning for the Synergy 2025</h3>
                        </div>
                        <button 
                            type="button" 
                            className="rounded-md bg-white dark:bg-slate-800 text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={() => setShowBriefing(false)}
                        >
                            <span className="sr-only">Close</span>
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-start gap-10 mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                        {/* Date */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg text-gray-500 dark:text-slate-400 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">DATE & TIME</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Oct 7, 10:00 AM <span className="text-gray-400 font-normal">(60m)</span></p>
                            </div>
                        </div>
                        {/* Owner */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg text-gray-500 dark:text-slate-400 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">OWNER</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Hastiel</p>
                            </div>
                        </div>
                         {/* Tags */}
                         <div className="flex items-start gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg text-gray-500 dark:text-slate-400 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l5 5a2 2 0 0 0 2.828 0l7-7a2 2 0 0 0 0-2.828l-5-5z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">TAGS</p>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-slate-700 px-2 py-1 text-xs font-bold text-gray-600 dark:text-slate-300 ring-1 ring-inset ring-gray-500/10 uppercase">STRATEGIC</span>
                                    <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-slate-700 px-2 py-1 text-xs font-bold text-gray-600 dark:text-slate-300 ring-1 ring-inset ring-gray-500/10 uppercase">ALIGNMENT</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Agenda */}
                    <div className="mb-6 pb-6 border-b border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-1.5 bg-gray-50 dark:bg-slate-700 rounded-md text-gray-500 dark:text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 13h5"/><path d="M12 17h5"/><path d="M9 13h.01"/><path d="M9 17h.01"/></svg>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Agenda for the meeting:</h4>
                        </div>
                        <ul className="list-disc pl-12 space-y-2 text-sm text-gray-600 dark:text-slate-300 marker:text-gray-400">
                            <li>Review of last quarter's performance indicators</li>
                            <li>Presentation of new policy directives from the control office</li>
                            <li>Budget reallocation for planning activities</li>
                            <li>Open forum for recommendations and process improvement</li>
                            <li>Discussion on inter-departmental coordination for Q4</li>
                        </ul>
                    </div>

                    {/* Attendees */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-1.5 bg-gray-50 dark:bg-slate-700 rounded-md text-gray-500 dark:text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Attendees</h4>
                        </div>
                        
                        <div className="pl-10 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">AC</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Althea Cain</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">NV</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Neil Villanueva</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600 dark:bg-green-900/30 dark:text-green-300">AA</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Anne Abedi</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="task-modal-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
            onClick={() => setSelectedTask(null)}
          ></div>

          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg dark:bg-slate-800 border border-transparent dark:border-slate-700">
                
                {/* Modal Header */}
                <div className="bg-white p-6 border-b border-gray-100 dark:bg-slate-800 dark:border-slate-700 flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-violet-600 rounded-full flex-shrink-0"></span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight" id="task-modal-title">{selectedTask.title}</h2>
                    </div>
                    <button 
                        aria-label="Close task details"
                        onClick={() => setSelectedTask(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6 bg-white dark:bg-slate-800">
                    {/* Status, Priority, Due Date Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2 dark:text-slate-400">STATUS</p>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                                {selectedTask.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2 dark:text-slate-400">PRIORITY</p>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                                {selectedTask.priority}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase mb-2 dark:text-slate-400">DUE DATE</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{selectedTask.dueDate}</p>
                        </div>
                    </div>

                    {/* Workspace */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2 dark:text-slate-400">WORKSPACE</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">{selectedTask.workspace}</p>
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2 dark:text-slate-400">DESCRIPTION</p>
                        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg dark:bg-slate-700/50 dark:text-slate-300 leading-relaxed">
                            {selectedTask.description}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;