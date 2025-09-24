"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Bell, 
  Settings, 
  Plus, 
  Filter,
  BarChart3,
  Zap,
  ArrowLeft,
  Users,
  User
} from "lucide-react";
import { useTask } from "../context/TaskContext";
import AddTaskModal from "./AddTaskModal";
import NotificationSettings from "./NotificationSettings";
import GeneralSettings from "./GeneralSettings";
import UserProfile from "./UserProfile";
import type { SupabaseUser } from '../services/supabaseAuthService';

interface HeaderProps {
  currentUser?: SupabaseUser | null;
  onLogout?: () => void;
}

export default function Header({ currentUser: propCurrentUser, onLogout }: HeaderProps = {}) {
  const { 
    currentUser: contextCurrentUser, 
    notifications, 
    setFilter, 
    filter,
    projects,
    selectedProject,
    setSelectedProject,
    workspaceMode,
    setWorkspaceMode
  } = useTask();
  
  // Use prop user if provided, otherwise fall back to context user
  const currentUser = propCurrentUser || contextCurrentUser;
  
  const [searchText, setSearchText] = useState(filter.searchText || '');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showGeneralSettings, setShowGeneralSettings] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read);

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setFilter({ ...filter, searchText: value });
  };

  return (
    <header className="bg-neutral-800/50 border-b border-neutral-700 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Project Selector */}
          <div className="flex items-center gap-6">
            {/* Back to Portfolio */}
            <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Portfolio</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">TaskFlow Pro</h1>
            </div>
            
            {/* Workspace Mode Toggle */}
            <div className="flex items-center gap-2 bg-neutral-700/50 rounded-lg p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setWorkspaceMode('personal')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  workspaceMode === 'personal' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                Personal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setWorkspaceMode('team')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  workspaceMode === 'team' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                Team
              </motion.button>
            </div>
            
            {/* Project Selector */}
            {workspaceMode === 'team' && (
              <div className="relative">
                <select
                  value={selectedProject?.id || ''}
                  onChange={(e) => {
                    const project = projects.find(p => p.id === e.target.value);
                    setSelectedProject(project || null);
                  }}
                  className="bg-neutral-700 border border-neutral-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Projects</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tasks, projects, or team members..."
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-neutral-700/50 border border-neutral-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section - Actions & User */}
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              }`}
            >
              <Filter className="w-4 h-4" />
            </motion.button>

            {/* Analytics Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
            </motion.button>

            {/* Add Task Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddTaskModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Task</span>
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotificationSettings(true)}
                className="p-2 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 transition-colors relative"
                title="Notification Settings"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                  </span>
                )}
              </motion.button>
            </div>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowGeneralSettings(true)}
              className="p-2 bg-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-600 transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </motion.button>

            {/* User Profile */}
            {currentUser && (
              <UserProfile 
                user={currentUser as SupabaseUser}
                onLogout={onLogout || (() => {})}
                onSettings={() => setShowGeneralSettings(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-neutral-700 px-6 py-4 bg-neutral-800/30"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-400">Status:</span>
              <select
                multiple
                className="bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-sm text-white"
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setFilter({ ...filter, status: values });
                }}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-400">Priority:</span>
              <select
                multiple
                className="bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-sm text-white"
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setFilter({ ...filter, priority: values });
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter({})}
              className="px-3 py-1 text-sm bg-neutral-700 text-neutral-300 rounded hover:bg-neutral-600 transition-colors"
            >
              Clear Filters
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        initialProject={selectedProject || projects[0]}
      />

      {/* Notification Settings Modal */}
      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />

      {/* General Settings Modal */}
      <GeneralSettings
        isOpen={showGeneralSettings}
        onClose={() => setShowGeneralSettings(false)}
      />
    </header>
  );
}