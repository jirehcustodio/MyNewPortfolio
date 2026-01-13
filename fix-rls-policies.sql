-- 🔧 FIX for "row-level security policy" error
-- Run this SQL in Supabase SQL Editor to allow testimonial submissions

-- This allows anonymous visitors to INSERT testimonials into the table
CREATE POLICY "Allow anonymous inserts for testimonials"
  ON testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- This allows anyone to READ approved testimonials
CREATE POLICY "Allow public read access to approved testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Optional: Allow authenticated users to read ALL testimonials (for admin)
CREATE POLICY "Allow authenticated users to read all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Allow authenticated users to UPDATE testimonials (for approval)
CREATE POLICY "Allow authenticated users to update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'testimonials';
