"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellOff,
  Settings,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  TestTube
} from "lucide-react";
import NotificationService from "../services/notificationService";

interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSettings({ isOpen, onClose }: NotificationSettingsProps) {
  const [notificationService] = useState(() => NotificationService.getInstance());
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [settings, setSettings] = useState({
    dueDateReminders: true,
    overdueAlerts: true,
    dailyReminders: true,
    taskAssignments: true,
    reminderTime: '09:00',
    advanceNotice: 24 // hours before due date
  });

  useEffect(() => {
    setIsSupported(notificationService.isNotificationSupported());
    setPermission(notificationService.getPermissionStatus());
  }, [notificationService]);

  const handleEnableNotifications = async () => {
    try {
      const newPermission = await notificationService.requestPermission();
      setPermission(newPermission);
      
      if (newPermission === 'granted') {
        // Show test notification
        await notificationService.testNotification();
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
      alert('Failed to enable notifications. Please check your browser settings.');
    }
  };

  const handleTestNotification = async () => {
    if (permission === 'granted') {
      await notificationService.testNotification();
    } else {
      alert('Please enable notifications first.');
    }
  };

  const handleSettingChange = (key: string, value: boolean | string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Save to localStorage
    localStorage.setItem('taskflow-notification-settings', JSON.stringify({
      ...settings,
      [key]: value
    }));
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('taskflow-notification-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load notification settings:', error);
      }
    }
  }, []);

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { color: 'text-green-400', icon: CheckCircle, text: 'Enabled' };
      case 'denied':
        return { color: 'text-red-400', icon: BellOff, text: 'Denied' };
      default:
        return { color: 'text-yellow-400', icon: AlertTriangle, text: 'Not Set' };
    }
  };

  const status = getPermissionStatus();
  const StatusIcon = status.icon;

  if (!isSupported) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px] bg-neutral-900 border border-neutral-700 rounded-xl z-50 p-6"
            >
              <div className="text-center">
                <BellOff className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Notifications Not Supported</h2>
                <p className="text-neutral-400 mb-4">
                  Your browser doesn&apos;t support notifications. Please try using a modern browser like Chrome, Firefox, or Safari.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[90vh] bg-neutral-900 border border-neutral-700 rounded-xl z-50 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">Notification Settings</h1>
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
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Permission Status */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">Browser Permission</h3>
                  <div className={`flex items-center gap-2 ${status.color}`}>
                    <StatusIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">{status.text}</span>
                  </div>
                </div>
                
                <p className="text-neutral-400 text-sm mb-4">
                  Allow TaskFlow Pro to send you browser notifications for task reminders and updates.
                </p>

                <div className="flex gap-3">
                  {permission !== 'granted' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEnableNotifications}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Bell className="w-4 h-4" />
                      Enable Notifications
                    </motion.button>
                  )}
                  
                  {permission === 'granted' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleTestNotification}
                      className="flex items-center gap-2 px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
                    >
                      <TestTube className="w-4 h-4" />
                      Test Notification
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Notification Types */}
              {permission === 'granted' && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      {/* Due Date Reminders */}
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-white font-medium">Due Date Reminders</p>
                            <p className="text-neutral-400 text-sm">Get notified before tasks are due</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.dueDateReminders}
                            onChange={(e) => handleSettingChange('dueDateReminders', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>

                      {/* Overdue Alerts */}
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-white font-medium">Overdue Alerts</p>
                            <p className="text-neutral-400 text-sm">Immediate alerts for overdue tasks</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.overdueAlerts}
                            onChange={(e) => handleSettingChange('overdueAlerts', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>

                      {/* Daily Reminders */}
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-white font-medium">Daily Reminders</p>
                            <p className="text-neutral-400 text-sm">Daily summary of tasks due today</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.dailyReminders}
                            onChange={(e) => handleSettingChange('dailyReminders', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>

                      {/* Task Assignments */}
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Settings className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-white font-medium">Task Assignments</p>
                            <p className="text-neutral-400 text-sm">Get notified when assigned new tasks</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.taskAssignments}
                            onChange={(e) => handleSettingChange('taskAssignments', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Timing Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Timing Settings</h3>
                    <div className="space-y-4">
                      {/* Daily Reminder Time */}
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Daily Reminder Time</p>
                          <p className="text-neutral-400 text-sm">When to send daily task summaries</p>
                        </div>
                        <input
                          type="time"
                          value={settings.reminderTime}
                          onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
                          className="bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Advance Notice */}
                      <div className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg">
                        <div>
                          <p className="text-white font-medium">Due Date Notice</p>
                          <p className="text-neutral-400 text-sm">Hours before due date to remind</p>
                        </div>
                        <select
                          value={settings.advanceNotice}
                          onChange={(e) => handleSettingChange('advanceNotice', parseInt(e.target.value))}
                          className="bg-neutral-700 border border-neutral-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={1}>1 hour</option>
                          <option value={2}>2 hours</option>
                          <option value={6}>6 hours</option>
                          <option value={12}>12 hours</option>
                          <option value={24}>24 hours</option>
                          <option value={48}>48 hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-neutral-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Done
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}