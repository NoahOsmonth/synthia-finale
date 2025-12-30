
import React, { useState } from 'react';
import { 
  MoreHorizontal, Calendar, Clock, Video, 
  AlertTriangle, Phone, CheckSquare, MessageSquare, 
  User, Bell, Search, Filter, X, Users, Check
} from 'lucide-react';

type FilterType = 'all' | 'unread' | 'mentions' | 'tasks' | 'invites';

interface NotificationItem {
  id: string;
  category: FilterType | 'tasks' | 'invites';
  type: 'meeting' | 'mention' | 'task' | 'deadline' | 'missed' | 'invite';
  unread: boolean;
  initials: React.ReactNode;
  initialsBg: string;
  name: string;
  preview: string;
  time: string;
  inviter?: string;
  teamName?: string;
}

const Notifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  // Initial Data State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      category: 'invites',
      type: 'invite',
      unread: true,
      initials: 'D',
      initialsBg: 'bg-blue-500',
      name: 'Design System Team',
      preview: 'Invitation from Sarah Chen',
      time: '2m',
      inviter: 'Sarah Chen',
      teamName: 'Design System Team'
    },
    {
      id: '2',
      category: 'tasks',
      type: 'meeting',
      unread: true,
      initials: 'NV',
      initialsBg: 'bg-violet-600',
      name: 'Neil Villanueva',
      preview: 'Meeting invitation for design review',
      time: '8:46 PM'
    },
    {
      id: '3',
      category: 'mentions',
      type: 'mention',
      unread: true,
      initials: 'AS',
      initialsBg: 'bg-emerald-500',
      name: 'Alex Smith',
      preview: '@mentioned you in a comment',
      time: '10m'
    },
    {
      id: '4',
      category: 'tasks',
      type: 'task',
      unread: false,
      initials: 'JM',
      initialsBg: 'bg-blue-500',
      name: 'Jennifer Martinez',
      preview: 'Task assigned: Backend API...',
      time: '2h'
    },
    {
      id: '5',
      category: 'tasks',
      type: 'deadline',
      unread: false,
      initials: <span className="font-bold text-xs">⚠️</span>,
      initialsBg: 'bg-red-100 text-red-600',
      name: 'Deadline Reminder',
      preview: 'Design Mockups Review due...',
      time: '1d'
    },
    {
      id: '6',
      category: 'tasks',
      type: 'missed',
      unread: false,
      initials: <Video className="w-4 h-4" />,
      initialsBg: 'bg-indigo-100 text-indigo-600',
      name: 'Missed Meeting',
      preview: 'Q4 Planning Session - You...',
      time: '1d'
    }
  ]);

  const handleNotificationClick = (id: string) => {
    setSelectedId(id);
    // Mark as read when clicked
    setNotifications(prev => {
      const updated = prev.map(item => item.id === id ? { ...item, unread: false } : item);
      updateUnreadCount(updated);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(item => ({ ...item, unread: false }));
      updateUnreadCount(updated);
      return updated;
    });
    setShowMenu(false);
  };

  const updateUnreadCount = (notifs: NotificationItem[]) => {
    const unreadCount = notifs.filter(n => n.unread).length;
    sessionStorage.setItem('unreadNotificationCount', unreadCount.toString());
    window.dispatchEvent(new Event('storage'));
  };

  // Initialize unread count on mount
  React.useEffect(() => {
    const unreadCount = notifications.filter(n => n.unread).length;
    sessionStorage.setItem('unreadNotificationCount', unreadCount.toString());
    window.dispatchEvent(new Event('storage'));
  }, []);

  // Filter Logic
  const filteredNotifications = notifications.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return item.unread;
    if (activeFilter === 'mentions') return item.category === 'mentions';
    if (activeFilter === 'tasks') return item.category === 'tasks';
    if (activeFilter === 'invites') return item.category === 'invites';
    return true;
  });

  const selectedItem = notifications.find(n => n.id === selectedId);

  // Render content based on selection type
  const renderDetailContent = () => {
    if (!selectedItem) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-full mb-6 shadow-sm border border-gray-100 dark:border-slate-700">
            <Bell className="w-12 h-12 text-gray-300 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No notification selected</h3>
          <p className="text-gray-500 dark:text-slate-400 font-medium max-w-xs">Select a notification from the list to view its details, actions, and history.</p>
        </div>
      );
    }

    switch (selectedItem.type) {
      case 'meeting':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100 dark:border-slate-700">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-violet-50 dark:bg-slate-700 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Design Review</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Invitation from <span className="font-semibold text-gray-900 dark:text-slate-200">Neil Villanueva</span></p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-violet-600 text-white rounded-lg font-bold text-sm hover:bg-violet-700 shadow-sm shadow-violet-200 dark:shadow-none transition-colors">Accept</button>
                <button className="px-6 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">Decline</button>
              </div>
            </div>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
                 <Clock className="w-5 h-5 text-gray-400" />
                 <span>Sunday, November 16, 2025 • 9:00 PM - 9:30 PM</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
                 <Video className="w-5 h-5 text-gray-400" />
                 <span>Microsoft Teams Meeting</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Agenda</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-300">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0"></span><span>Review initial wireframes</span></li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0"></span><span>Discuss navigation flow</span></li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0"></span><span>Assign next steps</span></li>
              </ul>
            </div>
          </div>
        );
      
      case 'mention':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl dark:bg-slate-700 dark:text-emerald-400">
                    <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mentioned in Comment</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">On task <span className="font-semibold">UI Design System</span></p>
                </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative dark:bg-slate-700 dark:border-slate-600">
                <div className="absolute -left-2 top-6 w-4 h-4 bg-gray-50 border-l border-t border-gray-200 transform -rotate-45 dark:bg-slate-700 dark:border-slate-600"></div>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">AS</div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Alex Smith</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">10 minutes ago</p>
                    </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed dark:text-slate-300">
                    Hey <span className="text-violet-600 font-bold cursor-pointer hover:underline dark:text-violet-400">@Peter</span>, can you take a look at the latest color palette updates? I think we need to adjust the contrast on the primary buttons.
                </p>
            </div>
            <div className="mt-6 flex gap-3">
                <input type="text" placeholder="Reply to Alex..." className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400" />
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">Reply</button>
            </div>
          </div>
        );

      case 'task':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl dark:bg-slate-700 dark:text-blue-400">
                    <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Task Assigned</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">From <span className="font-semibold">Jennifer Martinez</span></p>
                </div>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 dark:bg-slate-700 dark:border-slate-600">
                <h3 className="font-bold text-gray-900 mb-2 dark:text-white">Backend API Documentation</h3>
                <p className="text-sm text-gray-700 mb-4 dark:text-slate-300">Complete comprehensive documentation for all REST API endpoints including request/response formats.</p>
                <div className="flex gap-4 text-xs font-medium">
                    <span className="px-3 py-1 bg-white rounded-full text-blue-600 dark:bg-slate-800 dark:text-blue-400">Due: Nov 22</span>
                    <span className="px-3 py-1 bg-white rounded-full text-orange-600 dark:bg-slate-800 dark:text-orange-400">Priority: High</span>
                </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors">View Task Details</button>
          </div>
        );

      case 'deadline':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl dark:bg-slate-700 dark:text-red-400">
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Deadline Reminder</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">System Notification</p>
                </div>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 dark:bg-slate-700 dark:border-slate-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2 dark:text-white">Design Mockups Review</h3>
                <p className="text-sm text-gray-700 mb-6 dark:text-slate-300">This task needs your attention! The deadline is approaching.</p>
                <div className="grid grid-cols-1 gap-y-3 text-sm">
                    <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-slate-400">Due Date:</span><span className="font-bold text-red-600 dark:text-red-400">November 20, 11:59 PM</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-slate-400">Time Remaining:</span><span className="font-bold text-orange-600 dark:text-orange-400">~21 hours</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-slate-400">Priority:</span><span className="font-bold text-red-600 dark:text-red-400">Urgent</span></div>
                </div>
            </div>
            <button className="w-full mt-6 px-4 py-3 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20">Open Task</button>
          </div>
        );

      case 'missed':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-slate-700 dark:text-indigo-400">
                    <Phone className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Missed Meeting</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Sunday, November 17</p>
                </div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 dark:bg-slate-700 dark:border-slate-600">
                <h3 className="text-lg font-bold text-gray-900 mb-4 dark:text-white">Q4 Planning Session</h3>
                <div className="space-y-4 mb-6">
                    <div className="flex gap-3">
                        <div className="mt-0.5 text-indigo-500 dark:text-indigo-400"><Clock className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide dark:text-slate-400">Date & Time</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Sunday, November 17, 2025 • 2:00 PM - 3:00 PM</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="mt-0.5 text-indigo-500 dark:text-indigo-400"><Video className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide dark:text-slate-400">Location</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Microsoft Teams Meeting</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="text-indigo-500 dark:text-indigo-400"><User className="w-5 h-5" /></div>
                            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Attendees (4)</p>
                        </div>
                        <ul className="space-y-2 pl-7 text-sm">
                            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-[10px] font-bold">SM</span><span className="text-gray-900 font-medium dark:text-white">Sarah Mitchell</span><span className="text-xs text-gray-500 dark:text-slate-400">- Host</span></li>
                            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">JD</span><span className="text-gray-600 dark:text-slate-400">James Douglas</span></li>
                            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-bold">You</span><span className="text-gray-600 dark:text-slate-400">Peter Parker</span><span className="text-xs text-red-500 font-medium">- Did not attend</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex gap-4">
                <button className="flex-1 py-3 bg-violet-600 text-white rounded-lg font-bold text-sm hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/30">View Meeting Summary</button>
                <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">View Transcript</button>
            </div>
          </div>
        );

      case 'invite':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
            <div className="flex justify-between items-start mb-8 pb-6 border-b border-gray-100 dark:border-slate-700">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{selectedItem.teamName || 'Team Invitation'}</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Invitation from <span className="font-semibold text-gray-900 dark:text-slate-200">{selectedItem.inviter || 'Team Admin'}</span></p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-violet-600 text-white rounded-lg font-bold text-sm hover:bg-violet-700 shadow-sm shadow-violet-200 dark:shadow-none transition-colors flex items-center gap-2">
                  <Check className="w-4 h-4" /> Accept
                </button>
                <button className="px-6 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">Decline</button>
              </div>
            </div>
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
                 <Users className="w-5 h-5 text-gray-400" />
                 <span>Join a collaborative team workspace</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
                 <Bell className="w-5 h-5 text-gray-400" />
                 <span>Stay updated with team notifications and activity</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Why join this team?</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-300">
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span><span>Collaborate with team members on projects</span></li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span><span>Access shared resources and documentation</span></li>
                <li className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span><span>Participate in team meetings and discussions</span></li>
              </ul>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-white dark:bg-slate-900 overflow-hidden">
      {/* Left List */}
      <div className="w-full md:w-[320px] lg:w-[380px] bg-white dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activity</h2>
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-700 rounded-lg shadow-xl border border-gray-100 dark:border-slate-600 z-10 overflow-hidden">
                  <button onClick={markAllAsRead} className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600">Mark all as read</button>
                  <button className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-600">Notification settings</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['all', 'unread', 'mentions', 'tasks', 'invites'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as FilterType)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeFilter === filter 
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {filter === 'mentions' ? '@Mentions' : filter === 'invites' ? 'Invites' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-slate-400 text-sm">
              No notifications found.
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNotificationClick(item.id)}
                className={`w-full text-left p-4 cursor-pointer relative group border-b border-gray-50 dark:border-slate-700/50 transition-colors
                  ${selectedId === item.id 
                    ? 'bg-gray-50 dark:bg-slate-700/50' 
                    : 'hover:bg-gray-50 dark:hover:bg-slate-700/30 bg-white dark:bg-slate-800'}
                `}
              >
                {selectedId === item.id && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-violet-600"></div>
                )}
                <div className="flex justify-between items-start pl-2">
                  <div className="flex items-start space-x-3 overflow-hidden">
                    <div className={`w-10 h-10 rounded-full ${item.initialsBg} text-white flex items-center justify-center font-bold text-sm flex-shrink-0 relative`}>
                      {item.initials}
                      {item.unread && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm truncate pr-2 ${item.unread ? 'font-bold text-gray-900 dark:text-white' : 'font-semibold text-gray-700 dark:text-slate-200'}`}>
                        {item.name}
                      </p>
                      <p className={`text-xs truncate w-40 mt-0.5 ${item.unread ? 'font-medium text-gray-600 dark:text-slate-300' : 'text-gray-500 dark:text-slate-400'}`}>
                        {item.preview}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap mt-1">{item.time}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Details Panel */}
      <div className="hidden md:block flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-slate-900">
        {renderDetailContent()}
      </div>
    </div>
  );
};

export default Notifications;
