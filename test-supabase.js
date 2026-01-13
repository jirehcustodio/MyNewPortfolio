// Quick Supabase Connection Test
// Run this with: node test-supabase.js

const supabaseUrl = 'https://xcymxecvyoumhfcekvzs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjeW14ZWN2eW91bWhmY2VrdnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NzE3MTMsImV4cCI6MjA3NDE0NzcxM30.lK25Trx7Ml9Zp4dOw4bHjMb7U6KUv2WG971WtmLeMvM';

async function testSupabase() {
  console.log('🧪 Testing Supabase Connection...\n');
  
  try {
    // Test 1: Check if URL is reachable
    console.log('1️⃣ Testing URL:', supabaseUrl);
    const response = await fetch(supabaseUrl);
    console.log('✅ URL is reachable\n');
    
    // Test 2: Check if testimonials table exists
    console.log('2️⃣ Testing testimonials table...');
    const testQuery = await fetch(`${supabaseUrl}/rest/v1/testimonials?select=*&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (testQuery.ok) {
      const data = await testQuery.json();
      console.log('✅ Testimonials table exists!');
      console.log(`📊 Found ${data.length} testimonial(s)\n`);
      
      if (data.length > 0) {
        console.log('Sample testimonial:', data[0]);
      }
    } else {
      const error = await testQuery.json();
      console.log('❌ Error:', error);
      
      if (testQuery.status === 404 || error.code === '42P01') {
        console.log('\n🔧 ISSUE FOUND: testimonials table does NOT exist!');
        console.log('\n📝 TO FIX:');
        console.log('1. Go to https://supabase.com/dashboard');
        console.log('2. Select your project');
        console.log('3. Go to SQL Editor');
        console.log('4. Copy and run the SQL from supabase-schema.sql file');
      }
    }
    
  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    console.log('\n🔧 Possible issues:');
    console.log('- Check internet connection');
    console.log('- Verify Supabase project is active');
    console.log('- Check if URL and key are correct');
  }
}

testSupabase();
