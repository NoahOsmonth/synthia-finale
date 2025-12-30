import React, { useState } from 'react';
import { 
  Hash, Search, Plus, MessageSquare, ChevronDown, Smile, 
  Paperclip, Video, Phone, Settings, Bell, ChevronLeft, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Workspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState('general');

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 overflow-hidden">
      {/* Workspace Sidebar */}
      <aside className="w-64 bg-gray-50 dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col">
        <div className="p-3 border-b border-gray-200 dark:border-slate-700">
          <div onClick={() => navigate('/collaboration')} className="flex items-center justify-between p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center text-xs font-bold text-white">S</div>
              <span className="font-bold text-gray-800 dark:text-white truncate">SBIT-3K</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>

      

        <div className="p-3 flex-1 overflow-y-auto">

          <div 
            onClick={() => navigate('/workspace')}
            className="flex items-center space-x-2 px-4 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors pb-2"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500"/>
            <span className="text-sm font-medium text-gray-800 dark:text-slate-200">Back to Workspace</span>
          </div>

          <div 
            onClick={() => navigate('/space')}
            className="flex items-center space-x-2 px-4 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors pb-2"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm font-medium text-gray-800 dark:text-slate-200">Space</span>
          </div>

          <div className="mb-6 pt-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Channels</span>
              <Plus className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
            {['general', 'announcements', 'projects', 'random'].map(channel => (
              <div 
                key={channel}
                onClick={() => setActiveChannel(channel)}
                className={`flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer ${activeChannel === channel ? 'bg-gray-200 dark:bg-slate-700' : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'}`}
              >
                <Hash className="w-4 h-4 text-gray-500" />
                <span className={`text-sm ${activeChannel === channel ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-300'}`}>{channel}</span>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">Direct Messages</span>
              <Plus className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
            <div className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-slate-300">Alex Smith</span>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700/50">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-600 dark:text-slate-300">Jane Doe</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900">
         <header className="h-16 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex flex-col">
             <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                <Hash className="w-5 h-5 text-gray-400" />
                <h1 className="text-lg font-bold capitalize">{activeChannel}</h1>
             </div>
             <p className="text-xs text-gray-500 pl-7">General discussion for SBIT-3K projects</p>
          </div>

          <div className="flex items-center gap-4">
             {/* New Video Call Button */}
             <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
                 <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md text-gray-500 hover:text-violet-600 transition-all shadow-sm" title="Start Voice Call">
                    <Phone className="w-4 h-4" />
                 </button>
                 <div className="w-px h-4 bg-gray-300 dark:bg-slate-700"></div>
                 <button 
                    onClick={() => navigate('/video')} 
                    className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md text-gray-500 hover:text-violet-600 transition-all shadow-sm"
                    title="Start Video Call"
                 >
                    <Video className="w-4 h-4" />
                 </button>
             </div>

             <div className="h-6 w-px bg-gray-200 dark:bg-slate-700"></div>

             <div className="flex items-center gap-3">
                 <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" src="https://i.pravatar.cc/150?u=a" alt="" />
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" src="https://i.pravatar.cc/150?u=b" alt="" />
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-gray-500">+3</div>
                 </div>
                 <button className="text-gray-400 hover:text-gray-600"><Bell className="w-5 h-5" /></button>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
           {/* Date Divider */}
           <div className="flex items-center justify-center relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-slate-800"></div></div>
              <div className="relative bg-white dark:bg-slate-900 px-4 text-xs font-medium text-gray-400 uppercase">Today, Nov 18</div>
           </div>

           {/* Message 1 */}
           <div className="flex gap-4 group">
              <div className="flex-shrink-0 mt-1">
                 <img className="w-10 h-10 rounded-lg" src="https://i.pravatar.cc/150?u=a" alt="Alex" />
              </div>
              <div className="flex-1">
                 <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Alex Smith</span>
                    <span className="text-[10px] text-gray-400">12:30 PM</span>
                 </div>
                 <div className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-3 rounded-r-xl rounded-bl-xl inline-block max-w-[80%]">
                    Has anyone reviewed the latest design specs for the dashboard? I pushed the updates to Figma.
                 </div>
              </div>
           </div>

           {/* Message 2 (Self) */}
           <div className="flex gap-4 flex-row-reverse group">
              <div className="flex-shrink-0 mt-1">
                 <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold">PP</div>
              </div>
              <div className="flex-1 text-right">
                 <div className="flex items-baseline gap-2 mb-1 justify-end">
                    <span className="text-[10px] text-gray-400">12:32 PM</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Peter Parker</span>
                 </div>
                 <div className="text-sm text-white leading-relaxed bg-violet-600 p-3 rounded-l-xl rounded-br-xl inline-block max-w-[80%] text-left shadow-md shadow-violet-200 dark:shadow-none">
                    Yes! I left some comments on the layout. Looks great overall, just fixed some spacing issues. <span className="underline decoration-violet-300 cursor-pointer">@Alex Smith</span>
                 </div>
              </div>
           </div>

           {/* Message 3 */}
           <div className="flex gap-4 group">
              <div className="flex-shrink-0 mt-1">
                 <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold">JD</div>
              </div>
              <div className="flex-1">
                 <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Jane Doe</span>
                    <span className="text-[10px] text-gray-400">12:45 PM</span>
                 </div>
                 <div className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-800/50 p-3 rounded-r-xl rounded-bl-xl inline-block max-w-[80%]">
                    I'll check the Figma file after my meeting. Also, are we still on for the 2 PM sync?
                 </div>
                 {/* Reaction */}
                 <div className="flex mt-1">
                    <span className="bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-full text-xs cursor-pointer hover:bg-gray-200">👍 2</span>
                 </div>
              </div>
           </div>

        </div>

        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
          <div className="border border-gray-300 dark:border-slate-600 rounded-lg p-2 bg-white dark:bg-slate-800">
            <input 
              type="text" 
              placeholder={`Message #${activeChannel}`} 
              className="w-full bg-transparent outline-none text-gray-700 dark:text-white placeholder-gray-400 mb-2"
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 text-gray-400">
                <Plus className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                <div className="w-px h-5 bg-gray-300 dark:bg-slate-600"></div>
                <Smile className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                <Paperclip className="w-5 h-5 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
              </div>
              <button className="bg-violet-600 text-white p-1.5 rounded hover:bg-violet-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;