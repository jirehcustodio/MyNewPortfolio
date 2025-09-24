'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, Crown, Shield } from 'lucide-react';
import Image from 'next/image';
import type { SupabaseUser } from '../services/supabaseAuthService';

interface UserProfileProps {
  user: SupabaseUser;
  onLogout: () => void;
  onSettings: () => void;
}

export default function UserProfile({ user, onLogout, onSettings }: UserProfileProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const isGuest = user.email === 'guest@taskflow.local';
  const isPremium = user.subscription?.plan === 'pro' || user.subscription?.plan === 'team';

  const getPlanIcon = () => {
    if (isGuest) return <User className="w-4 h-4" />;
    if (isPremium) return <Crown className="w-4 h-4 text-yellow-500" />;
    return <Shield className="w-4 h-4 text-blue-500" />;
  };

  const getPlanText = () => {
    if (isGuest) return 'Guest';
    if (isPremium) return 'Premium';
    return 'Free';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="relative">
          <Image
            src={user.avatar || '/icons/default-avatar.png'}
            alt={user.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          {!isGuest && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {user.name}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            {getPlanIcon()}
            {getPlanText()}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {showDropdown && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-20"
            >
              {/* User Info */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Image
                    src={user.avatar || '/icons/default-avatar.png'}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white truncate">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {getPlanIcon()}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getPlanText()} Plan
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {!isGuest && (
                  <button
                    onClick={() => {
                      onSettings();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onLogout();
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isGuest ? 'Exit Guest Mode' : 'Sign Out'}</span>
                </button>
              </div>

              {/* Footer */}
              {!isGuest && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-b-xl border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {user.subscription?.plan === 'free' ? (
                      <>
                        <div>Free Plan • 0/100 tasks</div>
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 mt-1">
                          Upgrade to Premium
                        </button>
                      </>
                    ) : (
                      <div>Premium Plan • Unlimited tasks</div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}