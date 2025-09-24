"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import AuthModal from "./components/AuthModal";
import DatabaseDebugPanel from "./components/DatabaseDebugPanel";
import { useTask } from "./context/TaskContext";
import SupabaseAuthService from "./services/supabaseAuthService";
import type { SupabaseUser } from "./services/supabaseAuthService";
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Settings,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

type ViewType = 'kanban' | 'calendar' | 'analytics' | 'team' | 'settings';

export default function TaskFlowPro() {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { tasks, users, selectedProject } = useTask();

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authService = SupabaseAuthService.getInstance();
        const session = await authService.getCurrentSession();
        
        if (session) {
          const user = authService.getCurrentUser();
          if (user) {
            setCurrentUser(user);
          } else {
            setShowAuthModal(true);
          }
        } else {
          // Check for guest mode
          const isGuest = localStorage.getItem('taskflow-guest-mode') === 'true';
          if (isGuest) {
            const guestUserData = localStorage.getItem('taskflow-guest-user');
            if (guestUserData) {
              setCurrentUser(JSON.parse(guestUserData));
            } else {
              setShowAuthModal(true);
            }
          } else {
            setShowAuthModal(true);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setShowAuthModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleAuthenticated = (user: SupabaseUser) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    try {
      const authService = SupabaseAuthService.getInstance();
      await authService.logout();
      setCurrentUser(null);
      setShowAuthModal(true);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-400">Loading TaskFlow Pro...</p>
        </div>
      </div>
    );
  }

  // Show auth modal if no user is logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthenticated={handleAuthenticated}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to TaskFlow Pro</h1>
            <p className="text-neutral-400 mb-8">Please sign in to access your productivity dashboard</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'
  ).length;

  const renderView = () => {
    switch (currentView) {
      case 'kanban':
        return <KanbanBoard />;
      case 'calendar':
        return (
          <div className="p-6">
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-8 text-center">
              <Calendar className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Calendar View</h3>
              <p className="text-neutral-400">Calendar view with task scheduling coming soon!</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">Total Tasks</p>
                    <p className="text-2xl font-bold text-white">{totalTasks}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">In Progress</p>
                    <p className="text-2xl font-bold text-blue-400">{inProgressTasks}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-400 text-sm">Overdue</p>
                    <p className="text-2xl font-bold text-red-400">{overdueTasks}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Task Status Distribution</h3>
                <div className="h-64 flex items-center justify-center text-neutral-400">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                    <p>Chart visualization coming soon</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Team Productivity</h3>
                <div className="h-64 flex items-center justify-center text-neutral-400">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 mx-auto mb-2" />
                    <p>Productivity metrics coming soon</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Team Management</h2>
              <p className="text-neutral-400">Manage team members and their roles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <p className="text-neutral-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                      user.role === 'manager' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {user.role}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Assigned Tasks:</span>
                      <span className="text-white">{tasks.filter(t => t.assignee?.id === user.id).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Completed:</span>
                      <span className="text-green-400">
                        {tasks.filter(t => t.assignee?.id === user.id && t.status === 'done').length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-8 text-center">
              <Settings className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Settings & Configuration</h3>
              <p className="text-neutral-400">Project settings and automation rules coming soon!</p>
            </div>
          </div>
        );
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      
      {/* Navigation Sidebar */}
      <div className="flex">
        <motion.aside 
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className="w-64 bg-neutral-800/30 border-r border-neutral-700 min-h-screen"
        >
          <div className="p-6">
            {/* Project Info */}
            {selectedProject && (
              <div className="mb-6 p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">{selectedProject.name}</h3>
                <p className="text-neutral-400 text-sm mb-3">{selectedProject.description}</p>
                <div className="flex -space-x-2">
                  {selectedProject.members.slice(0, 3).map(member => (
                    <Image
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-neutral-800"
                    />
                  ))}
                  {selectedProject.members.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-neutral-700 border-2 border-neutral-800 flex items-center justify-center">
                      <span className="text-xs text-neutral-300">+{selectedProject.members.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {[
                { id: 'kanban', label: 'Kanban Board', icon: BarChart3 },
                { id: 'calendar', label: 'Calendar', icon: Calendar },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'team', label: 'Team', icon: Users },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map(item => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentView(item.id as ViewType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-700/50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-neutral-800/50 border border-neutral-700 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-3">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Active Tasks:</span>
                  <span className="text-white">{tasks.filter(t => t.status !== 'done').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Completed:</span>
                  <span className="text-green-400">{completedTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Team Members:</span>
                  <span className="text-white">{users.length}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          {renderView()}
        </main>
      </div>

      {/* Database Debug Panel - only show in development */}
      {process.env.NODE_ENV === 'development' && <DatabaseDebugPanel />}
    </div>
  );
}