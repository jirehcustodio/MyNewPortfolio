"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  User,
  Palette,
  Database,
  Download,
  Upload,
  Trash2,
  X,
  Save
} from "lucide-react";
import { useTask } from "../context/TaskContext";

interface GeneralSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GeneralSettings({ isOpen, onClose }: GeneralSettingsProps) {
  const { 
    currentUser, 
    personalSettings, 
    updatePersonalSettings, 
    workspaceMode,
    setWorkspaceMode 
  } = useTask();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    language: 'en',
    timezone: 'UTC',
    autoSave: true,
    showCompletedTasks: true,
    enableSounds: true,
    ...personalSettings
  });

  const handleSaveSettings = () => {
    updatePersonalSettings(settings);
    localStorage.setItem('taskflow-general-settings', JSON.stringify(settings));
    onClose();
  };

  const handleExportData = () => {
    // This would export user's tasks and settings
    const dataToExport = {
      user: currentUser,
      settings: settings,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'general', label: 'General', icon: Settings },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={currentUser?.name || ''}
                    readOnly
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    To change your name, please update your account settings
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    readOnly
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Workspace Mode
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWorkspaceMode('personal')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        workspaceMode === 'personal'
                          ? 'bg-blue-500 text-white'
                          : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                      }`}
                    >
                      Personal
                    </button>
                    <button
                      onClick={() => setWorkspaceMode('team')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        workspaceMode === 'team'
                          ? 'bg-blue-500 text-white'
                          : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                      }`}
                    >
                      Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Appearance Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Theme
                  </label>
                  <select
                    value={settings.theme}
                    onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as 'dark' | 'light' }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode (Coming Soon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Default Priority
                  </label>
                  <select
                    value={settings.defaultPriority}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      defaultPriority: e.target.value as 'low' | 'medium' | 'high' | 'urgent'
                    }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Show Completed Tasks</p>
                    <p className="text-neutral-400 text-sm">Display completed tasks in the kanban board</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.showCompletedTasks}
                      onChange={(e) => setSettings(prev => ({ ...prev, showCompletedTasks: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish (Coming Soon)</option>
                    <option value="fr">French (Coming Soon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Auto Save</p>
                    <p className="text-neutral-400 text-sm">Automatically save changes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoSave}
                      onChange={(e) => setSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Enable Sounds</p>
                    <p className="text-neutral-400 text-sm">Play sounds for notifications and actions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableSounds}
                      onChange={(e) => setSettings(prev => ({ ...prev, enableSounds: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Data & Privacy</h3>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-800/30 border border-neutral-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Export Data</h4>
                  <p className="text-neutral-400 text-sm mb-3">
                    Download all your tasks, settings, and account data
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExportData}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export Data
                  </motion.button>
                </div>

                <div className="p-4 bg-neutral-800/30 border border-neutral-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Import Data</h4>
                  <p className="text-neutral-400 text-sm mb-3">
                    Import previously exported TaskFlow Pro data
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Import Data
                  </motion.button>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
                  <p className="text-neutral-400 text-sm mb-3">
                    Clear all data and reset to defaults
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All Data
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[800px] max-h-[90vh] bg-neutral-900 border border-neutral-700 rounded-xl z-50 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">Settings</h1>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-64 bg-neutral-800/30 border-r border-neutral-700 p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {renderTabContent()}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-neutral-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-3 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}