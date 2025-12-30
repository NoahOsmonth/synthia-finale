import React, { useState } from 'react';
import { 
  Moon, ChevronRight, Search, Plus, Trash2, 
  Shield, Users, FileText, Activity, GitMerge, 
  LogOut, Check, Building
} from 'lucide-react';
import { useNavigate } from 'react-router';

const Settings: React.FC = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  
  // Tabs configuration based on your screenshots
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'org-structure', label: 'Org Structure' },
    { id: 'approval-chains', label: 'Approval Chains' },
    { id: 'audit-logs', label: 'Audit Logs' },
    { id: 'roles-permissions', label: 'Roles & Permissions' },
    { id: 'user-roles', label: 'User Roles' },
  ];

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            {/* Appearance Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Appearance</h3>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-between shadow-sm">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Toggle dark/light theme</p>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-violet-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Organization Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Organization</h3>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Organization Settings</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Manage organization configuration and branding</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Workspace Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Workspace</h3>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Invitations</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Manage workspace invitations and shareable links</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        );

      case 'approval-chains':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Workflows</h3>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm divide-y divide-gray-200 dark:divide-slate-700">
               {/* */}
               <div className="p-4 flex items-center justify-between">
                 <div>
                   <p className="font-medium text-gray-900 dark:text-white">Meeting Request Approval</p>
                   <p className="text-sm text-gray-500 dark:text-slate-400">Require admin approval for new meetings</p>
                 </div>
                 <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-violet-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                 </button>
               </div>
               
               <div className="p-4 flex items-center justify-between">
                 <div>
                   <p className="font-medium text-gray-900 dark:text-white">Transcript Distribution</p>
                   <p className="text-sm text-gray-500 dark:text-slate-400">Auto-send transcripts to participants</p>
                 </div>
                 <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-slate-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                 </button>
               </div>

               <div className="p-4 flex items-center justify-between">
                 <div>
                   <p className="font-medium text-gray-900 dark:text-white">External Sharing</p>
                   <p className="text-sm text-gray-500 dark:text-slate-400">Allow documents to be shared outside the org</p>
                 </div>
                 <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-slate-600 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                 </button>
               </div>
            </div>
          </div>
        );

      case 'audit-logs':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
              {/* - Recreated list style */}
              {[
                { time: 'Today, 10:21 AM', user: 'Admin', action: 'changed permission for', target: '#general' },
                { time: 'Today, 10:22 AM', user: 'Admin', action: 'changed permission for', target: '#general' },
                { time: 'Today, 10:23 AM', user: 'Admin', action: 'changed permission for', target: '#general' },
                { time: 'Yesterday, 4:45 PM', user: 'Katherine Laroga', action: 'exported report', target: 'Weekly Summary' },
              ].map((log, idx) => (
                <div key={idx} className="p-4 border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <p className="text-xs text-gray-400 mb-1">{log.time}</p>
                  <p className="text-sm text-gray-800 dark:text-slate-300">
                    <span className="font-bold text-gray-900 dark:text-white">{log.user}</span> {log.action} <span className="font-bold text-gray-900 dark:text-white">{log.target}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'user-roles':
        return (
          <div className="space-y-6">
            {/* Header Area */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Role Assignments</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Manage role assignments for users in your organization</p>
              
              <label className="block text-xs font-semibold text-gray-500 dark:text-slate-400 mb-1">Select User</label>
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="h-4 w-4 text-gray-400" />
                   </div>
                   <input 
                      type="text" 
                      placeholder="Search by name or email" 
                      className="pl-9 block w-full rounded-lg border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm py-2.5 focus:ring-violet-500 focus:border-violet-500"
                   />
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                  <Users className="w-4 h-4" /> Assign Role
                </button>
              </div>
            </div>

            {/* Scope Filter */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-2">Filter by Scope</p>
              <div className="flex gap-2">
                {['All', 'ORGANIZATION', 'WORKSPACE', 'CHANNEL'].map((scope) => (
                  <button 
                    key={scope} 
                    className={`px-3 py-1.5 text-xs font-bold rounded-md uppercase border ${
                      scope === 'All' 
                      ? 'bg-violet-600 text-white border-violet-600' 
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-300 dark:border-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>

            {/* User Cards Section */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-violet-600" />
                  <span className="text-xs font-bold text-gray-500 uppercase">Organization (1)</span>
               </div>

               {/* User Card */}
               <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center">
                          <Users className="w-5 h-5" />
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Katherine Laroga</h4>
                          <p className="text-xs text-gray-500 dark:text-slate-400">neil4socmeds@gmail.com</p>
                          
                          <div className="mt-3">
                             <p className="text-sm font-medium text-gray-900 dark:text-white">Participant</p>
                             <div className="flex flex-col gap-1 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1"><Activity className="w-3 h-3" /> ORGANIZATION: Organization</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1"><Activity className="w-3 h-3" /> Expires: Never</span>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-col gap-2">
                       <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase text-center">Active</span>
                       <button className="p-2 text-red-400 hover:bg-red-50 rounded transition-colors mt-auto self-end">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );

      // --- ADDED TABS (No screenshots provided, created based on context) ---
      
      case 'org-structure':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Organization Structure</h3>
                 <p className="text-sm text-gray-500 dark:text-slate-400">Manage departments and hierarchy</p>
              </div>
              <button className="text-sm text-violet-600 font-medium border border-violet-200 bg-violet-50 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-violet-100 transition-colors">
                 <Plus className="w-4 h-4" /> Add Department
              </button>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 text-center py-12">
               <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-gray-400" />
               </div>
               <h4 className="text-gray-900 dark:text-white font-medium mb-2">Visual Hierarchy</h4>
               <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
                 Define your company structure here. Assign managers and group employees into functional units.
               </p>
            </div>
          </div>
        );

      case 'roles-permissions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Roles & Permissions</h3>
                 <p className="text-sm text-gray-500 dark:text-slate-400">Define what each role can access</p>
              </div>
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                 <Plus className="w-4 h-4" /> Create Role
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700">
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-slate-300 font-medium">
                     <tr>
                        <th className="px-4 py-3">Permission</th>
                        <th className="px-4 py-3 text-center">Admin</th>
                        <th className="px-4 py-3 text-center">Manager</th>
                        <th className="px-4 py-3 text-center">Member</th>
                        <th className="px-4 py-3 text-center">Viewer</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
                     {[
                        'Manage Organization', 'Edit Settings', 'Invite Users', 
                        'View Audit Logs', 'Create Channels', 'Send Messages'
                     ].map((perm, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                           <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{perm}</td>
                           <td className="px-4 py-3 text-center text-violet-600"><Check className="w-4 h-4 mx-auto" /></td>
                           <td className="px-4 py-3 text-center text-violet-600">{idx > 1 && <Check className="w-4 h-4 mx-auto" />}</td>
                           <td className="px-4 py-3 text-center text-violet-600">{idx > 3 && <Check className="w-4 h-4 mx-auto" />}</td>
                           <td className="px-4 py-3 text-center text-violet-600">{idx > 4 && <Check className="w-4 h-4 mx-auto" />}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full min-h-screen p-6 md:p-8 flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings & Administration</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700 mb-6 overflow-x-auto">
        <nav className="flex space-x-6 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                ${activeTab === tab.id 
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
         {renderContent()}
      </div>

      {/* Footer / Sign Out */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-slate-700">
         <button className="w-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/10 dark:hover:bg-red-900/20 dark:text-red-400 font-medium py-3 rounded-xl transition-colors border border-red-200 dark:border-red-900/30 flex items-center justify-center gap-2" onClick={() => navigate('/login')}>
            <LogOut className="w-4 h-4" />
            Sign Out
         </button>
      </div>
    </div>
  );
};

export default Settings;