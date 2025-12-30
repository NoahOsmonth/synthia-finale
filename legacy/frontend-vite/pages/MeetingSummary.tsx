import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Upload, List, LayoutGrid, 
  FileText, ArrowUp, ArrowDown, ExternalLink, Clock, 
  Star, Layers, Users, Folder, MoreHorizontal, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// We keep the data right here to avoid creating new files
const initialFiles = [
  { 
    id: 1, 
    name: 'Capstone Project Proposal Defense', 
    subtext: "Meeting Summary • 45m duration", 
    modified: '10m ago', 
    owner: 'Klariz Habla', 
    activity: 'You recently opened this', 
    isShared: true,
    isFavorite: false,
    activityIcon: true,
    workspace: 'Capstone 101'
  },
  { 
    id: 2, 
    name: 'SIA 101 - Requirements Analysis', 
    subtext: "Transcript & Action Items", 
    modified: '2h ago', 
    owner: 'Klariz Habla', 
    activity: 'You edited this file', 
    isShared: true,
    isFavorite: true,
    activityIcon: true,
    workspace: 'Capstone 101'
  },
  { 
    id: 3, 
    name: 'UI/UX Design Review - Sprint 4', 
    subtext: "Recording & Notes", 
    modified: 'Yesterday', 
    owner: 'Peter Parker', 
    activity: 'Shared with team', 
    isShared: true,
    isFavorite: false,
    activityIcon: true,
    workspace: 'Internal Tools'
  },
  { 
    id: 4, 
    name: 'Database Schema Finalization', 
    subtext: "Technical Documentation", 
    modified: 'Nov 15, 2025', 
    owner: 'Klariz Habla', 
    activity: '', 
    isShared: false,
    isFavorite: false,
    activityIcon: false,
    workspace: 'Capstone 101'
  },
  { 
    id: 5, 
    name: 'Weekly Team Sync', 
    subtext: "Meeting Recap", 
    modified: 'Nov 10, 2025', 
    owner: 'Sarah Chen', 
    activity: '', 
    isShared: true,
    isFavorite: true,
    activityIcon: false,
    workspace: 'Internal Tools'
  },
  { 
    id: 6, 
    name: 'Client Kickoff - Project Alpha', 
    subtext: "Presentation & Feedback", 
    modified: 'Oct 28, 2025', 
    owner: 'Klariz Habla', 
    activity: '', 
    isShared: true,
    isFavorite: false,
    activityIcon: false,
    workspace: 'Client Projects'
  },
];

const MeetingSummary: React.FC = () => {
  const navigate = useNavigate();
  
  const [view, setView] = useState<'list' | 'grid'>('list');
  // Replaced 'Shared' with 'Workspace'
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // NEW: State to track which workspace folder is open
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);

  // Logic to calculate unique workspaces and counts
  const workspaces = useMemo(() => {
    const uniqueNames = Array.from(new Set(initialFiles.map(f => f.workspace)));
    return uniqueNames.map(name => ({
      name,
      fileCount: initialFiles.filter(f => f.workspace === name).length
    }));
  }, []);

  const filteredFiles = useMemo(() => {
    let data = initialFiles;

    // Filter Logic
    if (activeFilter === 'Workspace' && selectedWorkspace) {
        // If we are inside a workspace folder, only show those files
        data = data.filter(f => f.workspace === selectedWorkspace);
    } else if (activeFilter === 'Recently opened') {
        data = data.filter(f => f.modified.includes('ago') || f.modified === 'Yesterday');
    } else if (activeFilter === 'Favorites') {
        data = data.filter(f => f.isFavorite);
    }
    
    // Search Logic
    if (searchQuery) {
      data = data.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return data.sort((a, b) => {
      if (sortOrder === 'asc') return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  }, [activeFilter, searchQuery, sortOrder, selectedWorkspace]);

  const toggleSort = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  const handleItemClick = (id: number) => { navigate(`/meeting-summary/${id}`); };

  // Handle clicking a filter button
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setSelectedWorkspace(null); // Reset workspace selection when changing top filters
    setSearchQuery('');
  };

  // Handle entering a workspace folder
  const openWorkspace = (workspaceName: string) => {
      setSelectedWorkspace(workspaceName);
  };

  return (
    <div className="p-6 md:p-8 bg-gray-100 dark:bg-slate-900 min-h-full font-sans text-gray-900 dark:text-white">
      
      {/* Dynamic Header */}
      <div className="mb-8">
        {selectedWorkspace ? (
            <div className="flex items-center gap-3">
                 <button onClick={() => setSelectedWorkspace(null)} className="mr-2 p-1 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                     <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-slate-300" />
                 </button>
                 <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedWorkspace}</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Viewing files in workspace</p>
                 </div>
            </div>
        ) : (
            <>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Meeting Summary</h2>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Access documentation, transcripts, and records from past sessions.</p>
            </>
        )}
      </div>

      {/* Header Filters - Hide these when inside a specific workspace to avoid confusion */}
      {!selectedWorkspace && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {['All', 'Recently opened', 'Workspace', 'Favorites'].map((filter) => (
              <button 
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                    activeFilter === filter 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {filter === 'All' && <Layers className="w-4 h-4" />}
                {filter === 'Recently opened' && <Clock className="w-4 h-4" />}
                {filter === 'Workspace' && <Folder className="w-4 h-4" />}
                {filter === 'Favorites' && <Star className="w-4 h-4" />}
                {filter}
              </button>
            ))}
          </div>
      )}

      {/* --- CONTENT AREA --- */}

      {/* 1. WORKSPACE FOLDER VIEW (Only show if 'Workspace' filter is active AND no workspace is selected yet) */}
      {activeFilter === 'Workspace' && !selectedWorkspace ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workspaces.map((ws) => (
            <div 
              key={ws.name}
              onClick={() => openWorkspace(ws.name)}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-all cursor-pointer group flex flex-col items-center text-center"
            >
              <div className="p-4 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-600 dark:text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                <Folder className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{ws.name}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">{ws.fileCount} {ws.fileCount === 1 ? 'file' : 'files'}</p>
            </div>
          ))}
        </div>
      ) : (
        /* 2. FILE LIST/GRID VIEW (Standard view for All, Favorites, OR inside a specific Workspace) */
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search summaries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors shadow-sm dark:text-white"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
             <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <button className="flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm font-medium">
                <Upload className="w-4 h-4" /> Upload
              </button>
              <div className="h-5 w-px bg-gray-300 dark:bg-slate-700 mx-1"></div>
              <div className="flex items-center gap-1">
                  <button onClick={() => setView('list')} className={`p-1.5 rounded transition-colors ${view === 'list' ? 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800'}`}><List className="w-5 h-5" /></button>
                  <button onClick={() => setView('grid')} className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/30' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800'}`}><LayoutGrid className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          {view === 'list' ? (
             <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-500 dark:text-slate-400 bg-gray-50/50 dark:bg-slate-800">
                      <th className="py-3 px-6 w-[40%] cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" onClick={toggleSort}>
                        Meeting Name {sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 inline"/> : <ArrowDown className="w-3 h-3 inline"/>}
                      </th>
                      <th className="py-3 px-6 w-[20%]">Date Modified</th>
                      <th className="py-3 px-6 w-[20%]">Owner</th>
                      <th className="py-3 px-6 w-[20%]">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <tr key={file.id} onClick={() => handleItemClick(file.id)} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                        <td className="py-3 px-6 flex items-center gap-4">
                           <div className="relative w-8 h-10 bg-white border border-blue-200 rounded-sm flex items-center justify-center flex-shrink-0">
                                <div className="absolute top-0 right-0 border-t-[8px] border-r-[8px] border-t-gray-100 border-r-white transform rotate-90"></div>
                                <FileText className="w-5 h-5 text-blue-600 z-10" />
                                <div className="absolute bottom-1 right-1 text-[6px] font-bold text-blue-600">DOC</div>
                           </div>
                           <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{file.subtext}</p>
                           </div>
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-600 dark:text-slate-300">{file.modified}</td>
                        <td className="py-3 px-6 text-sm text-gray-600 dark:text-slate-300">{file.owner}</td>
                        <td className="py-3 px-6">{file.activity && <span className="text-xs bg-gray-100 dark:bg-slate-700 dark:text-slate-300 px-2 py-1 rounded-full flex items-center gap-1 w-fit"><ExternalLink className="w-3 h-3"/> {file.activity}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map((file) => (
                <div key={file.id} onClick={() => handleItemClick(file.id)} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md cursor-pointer transition-all">
                  <div className="flex justify-between items-start mb-4">
                     <div className="relative w-10 h-12 bg-white border border-blue-200 rounded-sm shadow-sm flex items-center justify-center">
                        <div className="absolute top-0 right-0 border-t-[10px] border-r-[10px] border-t-gray-100 border-r-white transform rotate-90"></div>
                        <FileText className="w-6 h-6 text-blue-600 z-10" />
                     </div>
                     <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{file.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 mb-4">{file.subtext}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 pt-4 border-t border-gray-100 dark:border-slate-700">
                     <span>{file.modified}</span>
                     <span>{file.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredFiles.length === 0 && (
             <div className="p-12 text-center text-gray-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 mt-4">
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-700 mb-4"><Search className="w-6 h-6 text-gray-400" /></div>
               <h3 className="text-lg font-medium text-gray-900 dark:text-white">No files found</h3>
               <p className="mt-1">Try adjusting your filters.</p>
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default MeetingSummary;
