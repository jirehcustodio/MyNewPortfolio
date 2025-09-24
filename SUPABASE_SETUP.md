# 🚀 Supabase Setup Guide for TaskFlow Pro

## Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `taskflow-pro`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 2. Get Your API Keys
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Update Environment Variables
Edit `.env.local` with your actual values:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 4. Set Up Database Tables
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the SQL from `src/app/taskflow/lib/supabase.ts` (the `CREATE_TABLES_SQL` constant)
3. Paste and run the SQL script
4. This creates all necessary tables with proper security policies

### 5. Enable Authentication
1. Go to **Authentication** → **Settings**
2. Configure these settings:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: `http://localhost:3000/taskflow/**`
3. Enable **Email** provider
4. Optionally enable social providers (Google, GitHub, etc.)

### 6. Test Your Setup
1. Run `npm run dev`
2. Go to `http://localhost:3000/taskflow`
3. Try creating an account
4. Check your Supabase dashboard → **Authentication** → **Users** to see the new user

## 🌐 Production Deployment

### For Netlify/Vercel:
1. Add environment variables in your hosting platform:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Update Supabase Auth settings:
   - **Site URL**: `https://your-domain.com`
   - **Redirect URLs**: `https://your-domain.com/taskflow/**`

## 🔒 Security Notes

- The `anon` key is safe to expose in frontend code
- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- All passwords are handled securely by Supabase Auth

## 📊 Features Enabled

✅ **User Authentication**: Register, login, logout, password reset
✅ **Real-time Updates**: Tasks sync across devices instantly
✅ **Data Persistence**: All data stored in cloud database
✅ **Security**: Row-level security ensures data privacy
✅ **Scalability**: Handles thousands of users
✅ **Offline Support**: Works offline, syncs when online

## 🆘 Troubleshooting

**Can't connect to Supabase?**
- Check your environment variables
- Ensure `.env.local` is not committed to git
- Verify project URL and keys in Supabase dashboard

**Authentication not working?**
- Check Site URL and Redirect URLs in Auth settings
- Ensure email provider is enabled
- Check browser console for errors

**Database errors?**
- Verify SQL schema was executed successfully
- Check if RLS policies are enabled
- Look at Supabase logs in dashboard

## 🎯 Next Steps

1. **Set up your Supabase project** (5 minutes)
2. **Update environment variables**
3. **Run the SQL schema**
4. **Test authentication**
5. **Deploy to production**

Your TaskFlow Pro will now work online with real user accounts! 🎉