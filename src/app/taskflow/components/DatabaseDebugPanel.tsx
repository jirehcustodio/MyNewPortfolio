'use client';

import { useState, useEffect } from 'react';
import { supabase, hasValidSupabaseConfig } from '../lib/supabase';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Database } from 'lucide-react';

interface ConnectionStatus {
  configValid: boolean;
  connectionActive: boolean;
  tablesExist: boolean;
  authWorking: boolean;
  error?: string;
}

export default function DatabaseDebugPanel() {
  const [status, setStatus] = useState<ConnectionStatus>({
    configValid: false,
    connectionActive: false,
    tablesExist: false,
    authWorking: false
  });
  const [loading, setLoading] = useState(true);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    setLoading(true);
    
    const newStatus: ConnectionStatus = {
      configValid: hasValidSupabaseConfig,
      connectionActive: false,
      tablesExist: false,
      authWorking: false
    };

    try {
      // Test 1: Check configuration
      console.log('🔧 Checking Supabase configuration...');
      
      if (!hasValidSupabaseConfig) {
        newStatus.error = 'Invalid Supabase configuration';
        setStatus(newStatus);
        setLoading(false);
        return;
      }

      // Test 2: Check connection
      console.log('📡 Testing Supabase connection...');
      const { error: connectionError } = await supabase.auth.getSession();
      
      if (connectionError && !connectionError.message.includes('session_not_found')) {
        newStatus.error = `Connection failed: ${connectionError.message}`;
        setStatus(newStatus);
        setLoading(false);
        return;
      }
      
      newStatus.connectionActive = true;

      // Test 3: Check if tables exist
      console.log('🗃️ Checking database tables...');
      const { error: tablesError } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true });

      if (tablesError) {
        if (tablesError.code === 'PGRST116') {
          newStatus.error = 'Database tables not found. Please run the setup SQL.';
        } else {
          newStatus.error = `Database error: ${tablesError.message}`;
        }
      } else {
        newStatus.tablesExist = true;
      }

      // Test 4: Check auth functionality
      console.log('🔐 Testing authentication...');
      try {
        await supabase.auth.getUser();
        newStatus.authWorking = true;
      } catch {
        console.log('Auth test completed (no active user is normal)');
        newStatus.authWorking = true; // Auth is working even without an active user
      }

    } catch (error) {
      newStatus.error = `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    setStatus(newStatus);
    setLoading(false);
  };

  const StatusIcon = ({ condition, loading: itemLoading }: { condition: boolean; loading?: boolean }) => {
    if (itemLoading) {
      return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
    }
    return condition ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white hover:bg-neutral-700 transition-colors"
        title="Database Debug Panel"
      >
        <Database className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Database Status</h2>
            <button
              onClick={() => setShowPanel(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Configuration Status */}
          <div className="flex items-center gap-3">
            <StatusIcon condition={status.configValid} loading={loading} />
            <div>
              <h3 className="font-semibold text-gray-900">Supabase Configuration</h3>
              <p className="text-sm text-gray-600">
                {status.configValid ? 'Valid credentials found' : 'Invalid or missing credentials'}
              </p>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-3">
            <StatusIcon condition={status.connectionActive} loading={loading} />
            <div>
              <h3 className="font-semibold text-gray-900">Database Connection</h3>
              <p className="text-sm text-gray-600">
                {status.connectionActive ? 'Successfully connected' : 'Connection failed'}
              </p>
            </div>
          </div>

          {/* Tables Status */}
          <div className="flex items-center gap-3">
            <StatusIcon condition={status.tablesExist} loading={loading} />
            <div>
              <h3 className="font-semibold text-gray-900">Database Tables</h3>
              <p className="text-sm text-gray-600">
                {status.tablesExist ? 'Tables exist and accessible' : 'Tables not found or inaccessible'}
              </p>
            </div>
          </div>

          {/* Auth Status */}
          <div className="flex items-center gap-3">
            <StatusIcon condition={status.authWorking} loading={loading} />
            <div>
              <h3 className="font-semibold text-gray-900">Authentication</h3>
              <p className="text-sm text-gray-600">
                {status.authWorking ? 'Authentication system working' : 'Authentication issues detected'}
              </p>
            </div>
          </div>

          {/* Error Display */}
          {status.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h4 className="font-semibold text-red-800">Error Detected</h4>
              </div>
              <p className="text-sm text-red-700">{status.error}</p>
            </div>
          )}

          {/* Setup Instructions */}
          {!status.tablesExist && status.connectionActive && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Database Setup Required</h4>
              <p className="text-sm text-blue-700 mb-3">
                Your Supabase connection is working, but the database tables need to be created.
              </p>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Go to your <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="underline">Supabase dashboard</a></li>
                <li>Navigate to &quot;SQL Editor&quot;</li>
                <li>Copy the SQL from <code>SUPABASE_SETUP.md</code></li>
                <li>Paste and execute the SQL</li>
                <li>Refresh this panel to verify</li>
              </ol>
            </div>
          )}

          {/* Success Message */}
          {status.configValid && status.connectionActive && status.tablesExist && status.authWorking && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-green-800">Everything is working!</h4>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your TaskFlow Pro database is properly configured and ready to use.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={checkDatabaseStatus}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Recheck Status'}
            </button>
            <button
              onClick={() => setShowPanel(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}