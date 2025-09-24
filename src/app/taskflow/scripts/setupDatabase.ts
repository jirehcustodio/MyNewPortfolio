// Database setup script for TaskFlow Pro
// Run this to create tables and test Supabase connection

import { supabase, hasValidSupabaseConfig } from '../lib/supabase';

export async function setupDatabase() {
  console.log('🚀 Setting up TaskFlow Pro database...');
  
  if (!hasValidSupabaseConfig) {
    console.error('❌ Invalid Supabase configuration. Please check your environment variables.');
    return false;
  }

  try {
    // Test connection
    console.log('📡 Testing Supabase connection...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error && error.message.includes('Invalid')) {
      console.error('❌ Invalid Supabase credentials:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');

    // Check if tables exist
    console.log('🔍 Checking database tables...');
    
    const { data: tables, error: tablesError } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });

    if (tablesError && tablesError.code === 'PGRST116') {
      console.log('📋 Tables not found. Creating database schema...');
      
      // Create the database schema
      const result = await createDatabaseSchema();
      
      if (!result) {
        console.error('❌ Failed to create database schema');
        return false;
      }
      
      console.log('✅ Database schema created successfully!');
    } else {
      console.log('✅ Database tables already exist!');
    }

    return true;
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    return false;
  }
}

async function createDatabaseSchema() {
  try {
    // Since we can't execute DDL from the client, we'll guide the user
    console.log(`
🔧 MANUAL SETUP REQUIRED:

Please go to your Supabase dashboard and execute this SQL:

1. Go to https://app.supabase.com
2. Open your project: ${process.env.NEXT_PUBLIC_SUPABASE_URL}
3. Navigate to "SQL Editor"
4. Paste and execute the following SQL:

-- Enable Row Level Security
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{}',
  subscription JSONB DEFAULT '{"plan": "free", "status": "active"}'
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  project_id UUID,
  assignee_id UUID,
  tags TEXT[],
  category TEXT
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  members JSONB DEFAULT '[]',
  settings JSONB DEFAULT '{}'
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB DEFAULT '{}'
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid()::text = id::text);

-- Tasks policies
CREATE POLICY "Users can view own tasks" ON tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON tasks FOR DELETE USING (auth.uid() = user_id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects FOR DELETE USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notifications" ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

5. Click "Run" to execute the SQL
6. You should see "Success" message

After completing these steps, your database will be ready! 🎉
`);
    
    return false; // Return false to indicate manual setup is needed
  } catch (error) {
    console.error('Error in createDatabaseSchema:', error);
    return false;
  }
}

// Test function to verify everything is working
export async function testDatabaseConnection() {
  console.log('🧪 Testing database connection...');
  
  try {
    // Test authentication
    const { data: authData } = await supabase.auth.getUser();
    console.log('Auth test:', authData ? '✅ Working' : '❌ No user');

    // Test database access
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Database error:', error.message);
      if (error.code === 'PGRST116') {
        console.log('💡 Table does not exist. Please run the database setup first.');
      }
      return false;
    }

    console.log('✅ Database connection successful!');
    return true;
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return false;
  }
}