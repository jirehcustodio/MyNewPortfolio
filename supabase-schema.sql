-- Create testimonials table with proper structure and security
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(100),
  position VARCHAR(100),
  testimonial TEXT NOT NULL CHECK (char_length(testimonial) >= 10 AND char_length(testimonial) <= 500),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  project_type VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID,
  ip_address INET,
  user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved_at ON testimonials(approved_at DESC) WHERE status = 'approved';
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating) WHERE status = 'approved';

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to approved testimonials
CREATE POLICY "Anyone can view approved testimonials" ON testimonials
  FOR SELECT USING (status = 'approved');

-- Create policy for public submission (insert only)
CREATE POLICY "Anyone can submit testimonials" ON testimonials
  FOR INSERT WITH CHECK (
    status = 'pending' AND 
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    testimonial IS NOT NULL AND 
    rating BETWEEN 1 AND 5
  );

-- Create policy for admin management (you'll need to set up admin authentication)
-- This is a placeholder - replace 'admin@yoursite.com' with your actual admin email
CREATE POLICY "Admin can manage all testimonials" ON testimonials
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'jireh4401@gmail.com' OR
    auth.jwt() ->> 'role' = 'admin'
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at 
  BEFORE UPDATE ON testimonials 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to set approved_at when status changes to approved
CREATE OR REPLACE FUNCTION set_approved_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
    NEW.approved_at = NOW();
  ELSIF NEW.status != 'approved' THEN
    NEW.approved_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for approved_at
CREATE TRIGGER set_testimonials_approved_at 
  BEFORE UPDATE ON testimonials 
  FOR EACH ROW 
  EXECUTE FUNCTION set_approved_at();

-- Insert some sample testimonials for demonstration (you can remove these)
INSERT INTO testimonials (name, email, company, position, testimonial, rating, project_type, status, approved_at) VALUES
(
  'Sarah Johnson',
  'sarah@techcorp.com',
  'TechCorp Solutions',
  'CTO',
  'Jireh delivered an exceptional e-commerce platform that exceeded all our expectations. The performance optimizations resulted in a 40% increase in conversion rates, and the clean, maintainable code made future updates seamless.',
  5,
  'E-commerce',
  'approved',
  NOW()
),
(
  'Michael Chen',
  'mike@startupco.io',
  'StartupCo',
  'Founder',
  'Working with Jireh was a game-changer for our startup. He not only built our MVP in record time but also provided valuable insights on scalability and user experience. The real-time features he implemented have become our key differentiator.',
  5,
  'Web Development',
  'approved',
  NOW()
),
(
  'Emily Rodriguez',
  'emily@digitalagency.com',
  'Digital Agency Pro',
  'Project Manager',
  'Jireh''s expertise in Next.js and database optimization helped us migrate our legacy system to a modern, high-performance platform. His attention to detail and proactive communication made the entire process smooth and stress-free.',
  5,
  'Cloud Migration',
  'approved',
  NOW()
);

-- Create a view for public testimonial display
CREATE OR REPLACE VIEW public_testimonials AS
SELECT 
  id,
  name,
  company,
  position,
  testimonial,
  rating,
  project_type,
  approved_at as created_at
FROM testimonials 
WHERE status = 'approved' 
ORDER BY approved_at DESC;

-- Grant necessary permissions
GRANT SELECT ON public_testimonials TO anon, authenticated;
GRANT SELECT, INSERT ON testimonials TO anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;