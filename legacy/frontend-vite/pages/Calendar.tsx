import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Plus, 
  Calendar as CalendarIcon, Clock, MapPin, Video, 
  Users, X, MoreVertical, Paperclip, Repeat, AlignLeft 
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'team' | 'work' | 'personal' | 'client';
  date: string; // YYYY-MM-DD
  start: string;
  end: string;
  location: string;
  description: string;
  attendees: { name: string; avatar?: string }[];
  tags: string[];
}

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'week' | 'month' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Get date from URL parameter
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  // Listen for header button click
  useEffect(() => {
    const handleNewEvent = () => setShowNewEventModal(true);
    window.addEventListener('open-new-event-modal', handleNewEvent);
    return () => window.removeEventListener('open-new-event-modal', handleNewEvent);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent || showNewEventModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent, showNewEventModal]);

  // Mock Data for December 2025
  const events: Event[] = [
    {
      id: '1',
      title: 'Monthly Team Standup',
      type: 'team',
      date: '2025-12-15', // Monday
      start: '09:00',
      end: '10:00',
      location: 'Conference Room A',
      description: 'Monthly sync to discuss project progress, roadblocks, and upcoming milestones. All team members required to attend.',
      attendees: [
        { name: 'John Doe' },
        { name: 'Sarah Smith' },
        { name: 'Mike Johnson' },
        { name: 'Emily Davis' }
      ],
      tags: ['TEAM']
    },
    {
      id: '2',
      title: 'Client Presentation',
      type: 'client',
      date: '2025-12-04',
      start: '14:00',
      end: '15:30',
      location: 'Zoom Meeting',
      description: 'Final design review with the client.',
      attendees: [{ name: 'Alice' }, { name: 'Bob' }],
      tags: ['CLIENT']
    },
    {
      id: '3',
      title: 'Sprint Planning',
      type: 'work',
      date: '2025-12-29',
      start: '10:00',
      end: '11:00',
      location: 'Huddle Room',
      description: 'Planning tasks for Sprint 24.',
      attendees: [],
      tags: ['WORK']
    },
    {
      id: '4',
      title: 'Deep Work',
      type: 'personal',
      date: '2025-12-10',
      start: '08:00',
      end: '12:00',
      location: 'Home Office',
      description: 'Focus time for coding.',
      attendees: [],
      tags: ['FOCUS']
    },
      {
      id: '5',
      title: 'Holiday Party',
      type: 'team',
      date: '2025-12-19',
      start: '18:00',
      end: '22:00',
      location: 'Downtown Hall',
      description: 'Annual company holiday gathering.',
      attendees: [],
      tags: ['SOCIAL']
    }
  ];

  // Colors based on event type
  const getEventStyles = (type: string) => {
    switch (type) {
      case 'team': return 'bg-pink-500 text-white border-pink-600';
      case 'client': return 'bg-emerald-500 text-white border-emerald-600';
      case 'work': return 'bg-blue-500 text-white border-blue-600';
      case 'personal': return 'bg-violet-500 text-white border-violet-600';
      default: return 'bg-gray-500 text-white border-gray-600';
    }
  };

  const getBadgeStyles = (type: string) => {
      switch (type) {
      case 'team': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300';
      case 'client': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'work': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'personal': return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // December 2025 Logic
  const daysInMonth = 31;
  const calendarDays = [];
  // Padding for Nov 30 (Sunday)
  calendarDays.push({ day: 30, currentMonth: false, date: '2025-11-30' });
  
  // December Days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `2025-12-${i.toString().padStart(2, '0')}`;
    calendarDays.push({ day: i, currentMonth: true, date: dateStr });
  }

  // Padding for end of grid (to make 35 or 42 cells)
  const remainingCells = 35 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
      const dateStr = `2026-01-${i.toString().padStart(2, '0')}`;
      calendarDays.push({ day: i, currentMonth: false, date: dateStr });
  }

  return (
    <div className="flex h-full bg-white dark:bg-slate-900 overflow-hidden relative">
      {/* Left Sidebar for Calendar (Mini) */}
      <div className="w-64 p-6 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col overflow-y-auto">
        <div className="mb-8 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-white">December 2025</h3>
            <div className="flex space-x-1">
              <button aria-label="Previous Month" className="text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800"><ChevronLeft className="w-4 h-4" /></button>
              <button aria-label="Next Month" className="text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          {/* Mini Grid */}
          <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
            {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-gray-400 font-medium">{d}</div>)}
            {/* Simple rendering for mini calendar visualization */}
            <div className="text-gray-300">30</div>
            {Array.from({ length: 31 }).map((_, i) => (
              <div key={i} className={`p-1 w-6 h-6 mx-auto flex items-center justify-center rounded-full ${i + 1 === 15 ? 'bg-violet-600 text-white' : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer'}`}>
                {i + 1}
              </div>
            ))}
            <div className="text-gray-300">1</div>
            <div className="text-gray-300">2</div>
            <div className="text-gray-300">3</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">My Calendars</h4>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-violet-600 focus:ring-violet-500 h-4 w-4" />
                <span className="ml-3 text-sm text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Personal</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-500 focus:ring-blue-500 h-4 w-4" />
                <span className="ml-3 text-sm text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Work</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-pink-500 focus:ring-pink-500 h-4 w-4" />
                <span className="ml-3 text-sm text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Family</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calendar View */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">December 2025</h2>
            <div className="flex bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
              {['Week', 'Month', 'Day'].map((v) => (
                <button 
                  key={v}
                  onClick={() => setView(v.toLowerCase() as any)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${view === v.toLowerCase() ? 'bg-white dark:bg-slate-600 shadow-sm text-gray-800 dark:text-white' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {view === 'month' && (
            <div className="h-full min-h-[600px] grid grid-cols-7 grid-rows-[auto_1fr] border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
              {/* Header Row */}
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <div key={day} className="p-3 border-b border-r border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide last:border-r-0">
                  {day}
                </div>
              ))}
              
              {/* Days Grid */}
              <div className="col-span-7 grid grid-cols-7 auto-rows-fr">
                {calendarDays.map((dayObj, i) => {
                   const dayEvents = events.filter(e => e.date === dayObj.date);
                   const isToday = dayObj.date === '2025-12-15'; // Simulate today for visual interest
                   
                   return (
                    <div 
                      key={i} 
                      className={`
                        min-h-[120px] p-2 border-b border-r border-gray-200 dark:border-slate-700 relative group transition-colors
                        ${dayObj.currentMonth ? 'bg-white dark:bg-slate-900' : 'bg-gray-50 dark:bg-slate-800/30'}
                        ${(i + 1) % 7 === 0 ? 'border-r-0' : ''} 
                        hover:bg-gray-50 dark:hover:bg-slate-800/80
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`
                            text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                            ${isToday ? 'bg-violet-600 text-white' : dayObj.currentMonth ? 'text-gray-700 dark:text-slate-300' : 'text-gray-400 dark:text-slate-600'}
                        `}>
                          {dayObj.day}
                        </span>
                        {/* Add Event Button visible on hover */}
                        <button 
                          aria-label="Add new event"
                          onClick={(e) => { e.stopPropagation(); setShowNewEventModal(true); }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded text-gray-500 transition-opacity"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {dayEvents.map(event => (
                          <div 
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`
                              px-2 py-1 rounded text-xs font-medium cursor-pointer truncate shadow-sm hover:opacity-90 transition-opacity border-l-2
                              ${getEventStyles(event.type)}
                            `}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {view !== 'month' && (
            <div className="flex h-full items-center justify-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
              <div className="text-center">
                 <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-slate-600" />
                 <p>Detailed {view} view coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIEW EVENT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          ></div>

          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-xl bg-white dark:bg-slate-800 text-left shadow-2xl transition-all sm:w-full sm:max-w-lg border border-gray-100 dark:border-slate-700">
                
                {/* Modal Header */}
                <div className="px-6 py-4 flex justify-between items-start pt-6">
                    <div>
                        <h3 className="text-xl font-bold leading-6 text-gray-900 dark:text-white pr-8">{selectedEvent.title}</h3>
                        <div className="mt-2">
                             <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ring-opacity-10 uppercase ${getBadgeStyles(selectedEvent.type)}`}>
                                {selectedEvent.tags[0]}
                             </span>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        aria-label="Close modal"
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none transition-colors"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="px-6 py-2 space-y-4">
                    
                    <div className="space-y-3 mt-2">
                        <div className="flex items-start gap-3 text-sm">
                            <CalendarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                            <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-gray-700 dark:text-slate-300">{selectedEvent.start} - {selectedEvent.end}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                                <p className="text-gray-700 dark:text-slate-300">Venue: {selectedEvent.location}</p>
                            </div>
                        </div>
                        {selectedEvent.type === 'team' && (
                             <div className="flex items-start gap-3 text-sm">
                                <Video className="w-5 h-5 text-violet-600 mt-0.5" />
                                <div>
                                    <button 
                                      onClick={() => navigate('/video')}
                                      className="font-bold text-violet-600 hover:text-violet-700 hover:underline transition-colors"
                                    >
                                      Join via SYNTHIA
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                             <Users className="w-4 h-4 text-gray-500" />
                             <h4 className="text-sm font-bold text-gray-900 dark:text-white">Attendees:</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedEvent.attendees.length > 0 ? (
                                selectedEvent.attendees.map((attendee, idx) => (
                                    <span key={idx} className="inline-flex items-center rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-800 dark:text-slate-200">
                                        {attendee.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-gray-500 italic">No attendees added</span>
                            )}
                        </div>
                    </div>

                    <div className="pt-2">
                         <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Description</h4>
                         <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                             {selectedEvent.description}
                         </p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 dark:bg-slate-700/30 px-6 py-4 flex flex-row-reverse gap-3 border-t border-gray-100 dark:border-slate-700 mt-6">
                    <button 
                         className="flex-1 sm:flex-none bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                         onClick={() => {/* Edit Logic */}}
                    >
                        Edit Event
                    </button>
                    {selectedEvent.type === 'team' && (
                         <button 
                           onClick={() => navigate('/video')}
                           className="flex-1 sm:flex-none bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-200 dark:shadow-none"
                         >
                             <Video className="w-4 h-4" /> Join via SYNTHIA
                         </button>
                    )}
                </div>

            </div>
          </div>
        </div>
      )}

      {/* NEW EVENT MODAL */}
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

                    {/* Attendees */}
                    <div>
                        <label htmlFor="attendees" className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">Add required attendees</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                id="attendees" 
                                placeholder="Enter attendees here" 
                                className="w-full bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white transition-colors"
                            />
                            <Users className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                    </div>

                    {/* Date & Time */}
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

                    {/* Location & Repeat */}
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
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 cursor-pointer w-fit hover:text-violet-600 dark:hover:text-violet-400">
                            <Repeat className="w-4 h-4" />
                            <span>Does not repeat</span>
                        </div>
                    </div>

                    {/* Attachment (Moved here) */}
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

export default Calendar;