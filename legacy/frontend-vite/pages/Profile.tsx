import React from 'react';
import { Mail, Linkedin, Clock } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="p-6 md:p-8 bg-gray-100 dark:bg-slate-900 h-full overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-200 to-cyan-300 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-cyan-700">PP</span>
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Peter Parker</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-gray-600 dark:text-slate-400 font-medium">Software Engineer at Microsoft</span>
            </div>
          </div>
          <button className="w-full md:w-auto px-6 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
            Update photo
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-gray-800 dark:text-white font-semibold">Available</p>
              <p className="text-sm text-gray-600 dark:text-slate-400">Work hours: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 pt-3 border-t border-gray-200 dark:border-slate-700">
            <Clock className="w-5 h-5 text-gray-400" />
            <p className="text-gray-600 dark:text-slate-400">Local time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Contact</h2>
        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
          <Mail className="w-6 h-6 text-gray-400" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-slate-400 font-medium">Email</p>
            <p className="text-gray-800 dark:text-white font-semibold">peter.park@mail.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Linkedin className="w-6 h-6 text-blue-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-slate-400 font-medium">LinkedIn</p>
            <button className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">Show Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;