import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, MessageCircle, Search, MoreVertical, ChevronLeft, 
  Filter, ThumbsUp, CheckCircle, BarChart2, Plus, Users, X, Send,
  Trash2, HelpCircle
} from 'lucide-react';

// --- Types ---
interface Discussion {
  id: number;
  author: string;
  title: string;
  type: string;
  date: string;
  avatar: string;
  replies: number;
  attendees: number;
  files: number;
  description: string;
  comments?: Comment[];
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

interface Answer {
  id: number;
  author: string;
  avatar: string;
  text: string;
  date: string;
  votes: number;
  isAccepted?: boolean;
}

interface Question {
  id: number;
  author: string;
  avatar: string;
  question: string;
  details?: string;
  votes: number;
  answersCount: number;
  date: string;
  isAnswered: boolean;
  answersList?: Answer[];
}

interface Poll {
  id: number;
  author: string;
  avatar: string;
  question: string;
  totalVotes: number;
  options: { label: string; percent: number; count: number; isWinner?: boolean }[];
  date: string;
}

const Space: React.FC = () => {
  const navigate = useNavigate();
  
  // Navigation State
  const [activeTab, setActiveTab] = useState('discussions'); 
  
  // Data State
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showCreatePoll, setShowCreatePoll] = useState(false); // NEW: State for Poll Modal
  
  // Create Poll State
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  // --- MOCK DATA ---
  // (Same mock data as before...)
  const discussions: Discussion[] = [
    {
      id: 1,
      author: 'Sarah Johnson',
      title: 'Q1 Planning Meeting - Action Items',
      type: 'Meeting',
      date: 'Today 2:30 PM',
      avatar: 'https://i.pravatar.cc/100?img=1',
      replies: 12,
      attendees: 5,
      files: 3,
      description: 'Discussed Q1 roadmap and assigned action items for product development. Team agreed on timeline and deliverables.',
      comments: [
        { id: 1, author: 'Mike Ross', avatar: 'https://i.pravatar.cc/100?img=8', text: 'I will handle the API documentation update by Friday.', date: '2:45 PM' },
        { id: 2, author: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/100?img=1', text: 'Thanks Mike! Make sure to sync with the frontend team.', date: '2:50 PM' }
      ]
    },
    {
      id: 2,
      author: 'Michael Chen',
      title: 'Design System Updates & Component Library',
      type: 'BREAKOUT ROOM',
      date: 'Yesterday 4:15 PM',
      avatar: 'https://i.pravatar.cc/100?img=2',
      replies: 8,
      attendees: 3,
      files: 6,
      description: 'Breakout room discussion on design system improvements. Team shared new component designs and gathered feedback.',
      comments: [
         { id: 1, author: 'Emma Davis', avatar: 'https://i.pravatar.cc/100?img=3', text: 'Love the new color palette!', date: 'Yesterday 5:00 PM' }
      ]
    },
    {
      id: 3,
      author: 'Emma Davis',
      title: 'Best Practices for Code Review Process',
      type: 'Discussion',
      date: '2 days ago',
      avatar: 'https://i.pravatar.cc/100?img=3',
      replies: 15,
      attendees: 7,
      files: 2,
      description: 'Let\'s discuss and share best practices for our code review process. How can we improve turnaround time and feedback quality?'
    },
    {
      id: 4,
      author: 'Alex Rodriguez',
      title: 'How do we manage API versioning?',
      type: 'Question',
      date: '3 days ago',
      avatar: 'https://i.pravatar.cc/100?img=4',
      replies: 9,
      attendees: 4,
      files: 4,
      description: 'Question about best practices for API versioning in our microservices architecture. Looking for team\'s feedback and recommendations.'
    }
  ];

  const questions: Question[] = [
    {
      id: 1,
      author: 'Jane Doe',
      avatar: 'https://i.pravatar.cc/100?img=5',
      question: 'What is the standard padding for mobile cards in our new design system?',
      details: 'I am implementing the new mobile view for the dashboard and the Figma specs seem inconsistent. Is it 16px or 12px?',
      votes: 14,
      answersCount: 3,
      date: '2 hours ago',
      isAnswered: true,
      answersList: [
        { 
          id: 101, 
          author: 'Michael Chen', 
          avatar: 'https://i.pravatar.cc/100?img=2', 
          text: 'It is 16px for all mobile containers. We updated the global tokens yesterday.', 
          date: '1 hour ago', 
          votes: 8,
          isAccepted: true 
        },
        { 
          id: 102, 
          author: 'Alex Smith', 
          avatar: 'https://i.pravatar.cc/100?img=12', 
          text: 'Make sure to use the `p-4` utility class if you are using Tailwind.', 
          date: '45 mins ago', 
          votes: 2 
        }
      ]
    },
    {
      id: 2,
      author: 'John Smith',
      avatar: 'https://i.pravatar.cc/100?img=6',
      question: 'Are we deprecating the v1 authentication endpoints in the next sprint?',
      details: 'I see some deprecation warnings in the logs but I do not recall seeing a ticket for this.',
      votes: 8,
      answersCount: 0,
      date: '5 hours ago',
      isAnswered: false,
      answersList: []
    }
  ];

  const polls: Poll[] = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/100?img=1',
      question: 'When should we schedule the weekly sync?',
      totalVotes: 24,
      date: '1 day ago',
      options: [
        { label: 'Monday 9AM', percent: 15, count: 4 },
        { label: 'Monday 2PM', percent: 60, count: 14, isWinner: true },
        { label: 'Tuesday 10AM', percent: 25, count: 6 },
      ]
    },
    {
      id: 2,
      author: 'Mike Ross',
      avatar: 'https://i.pravatar.cc/100?img=8',
      question: 'Which frontend framework should we use for the new dashboard widget?',
      totalVotes: 18,
      date: '3 days ago',
      options: [
        { label: 'React', percent: 80, count: 14, isWinner: true },
        { label: 'Vue', percent: 10, count: 2 },
        { label: 'Svelte', percent: 10, count: 2 },
      ]
    }
  ];

  // --- Handlers ---

  const handleOpenDiscussion = (discussion: Discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleOpenQuestion = (question: Question) => {
    setSelectedQuestion(question);
  };

  const handleCloseModal = () => {
    setSelectedDiscussion(null);
    setSelectedQuestion(null);
    setShowCreatePoll(false);
  };

  // Poll Creator Handlers
  const handleAddOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleDeleteOption = (index: number) => {
    if (pollOptions.length > 2) {
        const newOptions = pollOptions.filter((_, i) => i !== index);
        setPollOptions(newOptions);
    }
  };

  const getBadgeColor = (type: string) => {
    if (type.includes('Meeting')) return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300';
    if (type.includes('BREAKOUT')) return 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300';
    if (type.includes('Discussion')) return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
    if (type.includes('Question')) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300';
    return 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300';
  };

  // Filter Logic
  const filteredDiscussions = discussions.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'All' || item.type.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 relative">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">S</div>
              <span className="font-semibold text-gray-800 dark:text-white">SBIT-3K</span>
            </div>
            <button className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          <button
            onClick={() => navigate('/workspace')}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Workspace</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="font-bold text-gray-800 dark:text-white text-lg">Discussion Space</span>
            </div>
            <p className="hidden md:block text-gray-400 dark:text-slate-500 text-xs">Community Guidelines: notion.site/Guidelines</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-slate-300 text-sm bg-gray-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-full">
              <Users className="w-4 h-4" />
              <span>202 Members</span>
            </div>
            <button className="p-2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 rounded-full hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tabs Bar */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 pt-2 flex items-center space-x-8 overflow-x-auto flex-shrink-0">
          {['discussions', 'questions', 'polls'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400'
                  : 'text-gray-500 dark:text-slate-400 border-transparent hover:text-gray-700 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'discussions' && 'Discussions'}
              {tab === 'questions' && 'Questions & Answers'}
              {tab === 'polls' && 'Polls'}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-slate-900">
          
          <div className="flex-1 h-full overflow-y-auto p-6">
            
            {/* --- SEARCH & FILTERS (Only for Discussions) --- */}
            {activeTab === 'discussions' && (
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search meetings, transcripts, or topics..." 
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select 
                    className="pl-10 pr-8 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none text-gray-700 dark:text-white cursor-pointer"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="Meeting">Meetings</option>
                    <option value="BREAKOUT">Breakout Rooms</option>
                    <option value="Discussion">General</option>
                  </select>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
                  <Plus className="w-4 h-4" />
                  New Discussion
                </button>
              </div>
            )}

            {/* --- TAB CONTENT: DISCUSSIONS --- */}
            {activeTab === 'discussions' && (
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    onClick={() => handleOpenDiscussion(discussion)}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <img src={discussion.avatar} alt="Avatar" className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white dark:border-slate-700 shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          <span className="font-semibold text-gray-900 dark:text-white">{discussion.author}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${getBadgeColor(discussion.type)}`}>
                            {discussion.type}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-slate-500">• {discussion.date}</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-800 dark:text-slate-100 mt-1 group-hover:text-purple-600 transition-colors">
                          {discussion.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-2 line-clamp-2">
                          {discussion.description}
                        </p>
                        <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                          <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-slate-400">
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-slate-400">
                            <Users className="w-4 h-4" />
                            <span>{discussion.attendees} attendees</span>
                          </div>
                          <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-slate-400">
                            <CheckCircle className="w-4 h-4" />
                            <span>{discussion.files} files</span>
                          </div>
                          <button className="ml-auto px-4 py-1.5 text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                            View Summary
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- TAB CONTENT: QUESTIONS & ANSWERS --- */}
            {activeTab === 'questions' && (
              <div className="space-y-4 max-w-4xl mx-auto">
                 <div className="flex justify-between items-center mb-4">
                   <h2 className="font-bold text-gray-700 dark:text-white">Recent Questions</h2>
                   <button className="text-sm text-purple-600 font-medium hover:underline">Ask a Question</button>
                 </div>
                 {questions.map((q) => (
                   <div 
                      key={q.id} 
                      onClick={() => handleOpenQuestion(q)}
                      className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 flex gap-4 cursor-pointer hover:border-purple-300 transition-all"
                   >
                      <div className="flex flex-col items-center gap-1 min-w-[60px]">
                         <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-400 hover:text-purple-600">
                           <ThumbsUp className="w-5 h-5" />
                         </button>
                         <span className="font-bold text-gray-700 dark:text-slate-200">{q.votes}</span>
                      </div>
                      <div className="flex-1">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-purple-600">{q.question}</h3>
                         <div className="flex items-center gap-3 mt-3">
                            {q.isAnswered && (
                              <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                <CheckCircle className="w-3 h-3" /> Answered
                              </span>
                            )}
                            <img src={q.avatar} className="w-5 h-5 rounded-full" />
                            <span className="text-xs text-gray-500">{q.author} • {q.date}</span>
                         </div>
                      </div>
                      <div className="flex flex-col items-end justify-center">
                         <div className="flex items-center gap-1 text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{q.answersCount}</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            )}

            {/* --- TAB CONTENT: POLLS --- */}
            {activeTab === 'polls' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {polls.map((poll) => (
                   <div key={poll.id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                           <BarChart2 className="w-5 h-5" />
                         </div>
                         <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{poll.question}</h3>
                            <p className="text-xs text-gray-500">Created by {poll.author} • {poll.date}</p>
                         </div>
                      </div>
                      <div className="space-y-3">
                         {poll.options.map((option, idx) => (
                           <div key={idx} className="relative pt-1">
                             <div className="flex justify-between items-center mb-1 text-xs">
                                <span className={`font-medium ${option.isWinner ? 'text-purple-700 dark:text-purple-400' : 'text-gray-600 dark:text-slate-300'}`}>
                                  {option.label} {option.isWinner && '🏆'}
                                </span>
                                <span className="text-gray-500">{option.percent}% ({option.count})</span>
                             </div>
                             <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100 dark:bg-slate-700">
                                <div style={{ width: `${option.percent}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${option.isWinner ? 'bg-purple-600' : 'bg-gray-400 dark:bg-slate-500'}`}></div>
                             </div>
                           </div>
                         ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
                         <span className="text-xs text-gray-500">{poll.totalVotes} total votes</span>
                         <button className="text-xs font-medium text-purple-600 hover:text-purple-700">Vote Now</button>
                      </div>
                   </div>
                 ))}
                 
                 {/* Create Poll Button (Opens Modal) */}
                 <button 
                    onClick={() => setShowCreatePoll(true)} 
                    className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors min-h-[250px]"
                 >
                    <div className="w-12 h-12 bg-purple-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3 text-purple-600">
                       <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-gray-700 dark:text-slate-300">Create New Poll</span>
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- MODAL 1: DISCUSSION DETAIL --- */}
      {selectedDiscussion && (
        <div className="absolute inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full md:w-[600px] h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                 </button>
                 <span className="font-bold text-gray-800 dark:text-white">Discussion Details</span>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-500">
                 <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
               <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                     <img src={selectedDiscussion.avatar} className="w-12 h-12 rounded-full" />
                     <div>
                        <h2 className="font-bold text-xl text-gray-900 dark:text-white">{selectedDiscussion.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                           <span className="font-medium text-gray-900 dark:text-white">{selectedDiscussion.author}</span>
                           <span>•</span>
                           <span>{selectedDiscussion.date}</span>
                        </div>
                     </div>
                  </div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase mb-4 ${getBadgeColor(selectedDiscussion.type)}`}>
                     {selectedDiscussion.type}
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
                     {selectedDiscussion.description}
                  </p>
                  <div className="flex gap-4 border-b border-gray-200 dark:border-slate-700 pb-4">
                     <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" /> Like
                     </button>
                     <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors">
                        <MessageCircle className="w-4 h-4" /> Comment
                     </button>
                  </div>
               </div>
               <div className="space-y-6">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Replies ({selectedDiscussion.comments?.length || 0})</h3>
                  {selectedDiscussion.comments && selectedDiscussion.comments.map((comment) => (
                     <div key={comment.id} className="flex gap-3">
                        <img src={comment.avatar} className="w-8 h-8 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                           <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg rounded-tl-none">
                              <div className="flex justify-between items-baseline mb-1">
                                 <span className="font-bold text-sm text-gray-900 dark:text-white">{comment.author}</span>
                                 <span className="text-xs text-gray-400">{comment.date}</span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-slate-300">{comment.text}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
               <div className="flex gap-2 items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2">
                  <input type="text" placeholder="Write a reply..." className="flex-1 bg-transparent text-sm focus:outline-none dark:text-white" />
                  <button className="p-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"><Send className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: QUESTION & ANSWER --- */}
      {selectedQuestion && (
        <div className="absolute inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full md:w-[600px] h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                 </button>
                 <span className="font-bold text-gray-800 dark:text-white">Question Details</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
               <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{selectedQuestion.question}</h2>
                  {selectedQuestion.details && (
                    <p className="text-gray-600 dark:text-slate-300 text-sm mb-4">{selectedQuestion.details}</p>
                  )}
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                     <img src={selectedQuestion.avatar} className="w-6 h-6 rounded-full" />
                     <span>Asked by <span className="font-medium text-gray-900 dark:text-white">{selectedQuestion.author}</span></span>
                     <span>•</span>
                     <span>{selectedQuestion.date}</span>
                  </div>
                  <div className="flex gap-4 mt-4">
                     <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-sm font-medium">
                        <ThumbsUp className="w-4 h-4 text-purple-600" /> {selectedQuestion.votes} Upvotes
                     </button>
                  </div>
               </div>
               <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-4 border-b pb-2 dark:border-slate-700">
                 {selectedQuestion.answersCount} Answers
               </h3>
               <div className="space-y-6">
                  {selectedQuestion.answersList && selectedQuestion.answersList.length > 0 ? (
                    selectedQuestion.answersList.map((answer) => (
                      <div key={answer.id} className={`p-4 rounded-xl border ${answer.isAccepted ? 'border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                         <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                               <img src={answer.avatar} className="w-6 h-6 rounded-full" />
                               <span className="font-bold text-sm text-gray-900 dark:text-white">{answer.author}</span>
                               <span className="text-xs text-gray-500">• {answer.date}</span>
                            </div>
                            {answer.isAccepted && (
                               <span className="flex items-center gap-1 text-xs font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                  <CheckCircle className="w-3 h-3" /> Accepted Answer
                               </span>
                            )}
                         </div>
                         <p className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed">{answer.text}</p>
                         <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                            <button className="flex items-center gap-1 hover:text-purple-600"><ThumbsUp className="w-3 h-3" /> {answer.votes} Helpful</button>
                            <button className="hover:text-purple-600">Reply</button>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-400 text-sm">No answers yet. Be the first to help!</div>
                  )}
               </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
               <div className="flex gap-2 items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2">
                  <input type="text" placeholder="Post your answer..." className="flex-1 bg-transparent text-sm focus:outline-none dark:text-white" />
                  <button className="p-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"><Send className="w-4 h-4" /></button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: CREATE POLL (NEW) --- */}
      {showCreatePoll && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                       <BarChart2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Create New Poll</h3>
                 </div>
                 <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                 {/* Question Input */}
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Question</label>
                    <input 
                       type="text" 
                       placeholder="Ask something..." 
                       className="w-full p-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                       value={pollQuestion}
                       onChange={(e) => setPollQuestion(e.target.value)}
                    />
                 </div>

                 {/* Options Inputs */}
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Options</label>
                    <div className="space-y-3">
                       {pollOptions.map((option, index) => (
                          <div key={index} className="flex gap-2 items-center">
                             <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-slate-600 flex items-center justify-center text-xs text-gray-400 font-bold">
                                {String.fromCharCode(65 + index)}
                             </div>
                             <input 
                                type="text" 
                                placeholder={`Option ${index + 1}`}
                                className="flex-1 p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none dark:text-white"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                             />
                             {pollOptions.length > 2 && (
                                <button 
                                   onClick={() => handleDeleteOption(index)}
                                   className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             )}
                          </div>
                       ))}
                    </div>
                    <button 
                       onClick={handleAddOption}
                       className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                       <Plus className="w-4 h-4" /> Add Another Option
                    </button>
                 </div>
                 
                 {/* Settings Hint */}
                 <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-700 dark:text-blue-300 text-xs">
                    <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>Polls are public by default. Everyone in this space will be able to see the results after voting.</p>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 flex justify-end gap-3">
                 <button 
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                 >
                    Cancel
                 </button>
                 <button className="px-6 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition-all transform hover:scale-105">
                    Create Poll
                 </button>
              </div>

           </div>
        </div>
      )}

    </div>
  );
};

export default Space;