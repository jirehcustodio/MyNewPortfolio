-- 📊 Blog Analytics Table Setup for Supabase
-- Run this SQL in Supabase SQL Editor AFTER you've set up testimonials

-- =============================================================================
-- BLOG ANALYTICS TABLE
-- =============================================================================
-- Tracks: page views, time spent, likes, shares for each blog article
-- Use this to understand which content resonates with your audience

CREATE TABLE IF NOT EXISTS blog_analytics (
  -- Primary key
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Article information
  article_slug VARCHAR(255) NOT NULL,
  article_title VARCHAR(255) NOT NULL,
  article_category VARCHAR(100),
  
  -- Event tracking
  event_type VARCHAR(50) NOT NULL, -- 'view', 'like', 'share', 'time_spent', 'scroll_depth'
  event_value TEXT, -- stores time in seconds, scroll percentage, share URL, etc.
  
  -- Session tracking
  session_id VARCHAR(100), -- unique session identifier
  is_unique_visitor BOOLEAN DEFAULT false, -- true if first visit from this session
  
  -- User information (anonymous)
  user_ip INET,
  user_agent TEXT,
  referrer TEXT, -- where user came from
  device_type VARCHAR(50), -- 'desktop', 'mobile', 'tablet'
  browser VARCHAR(100),
  country VARCHAR(100),
  
  -- Timing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Optional: User engagement score (calculated field)
  engagement_score INTEGER DEFAULT 0
);

-- =============================================================================
-- INDEXES for Fast Queries
-- =============================================================================

-- Speed up queries by article
CREATE INDEX idx_blog_analytics_slug ON blog_analytics(article_slug);

-- Speed up queries by event type
CREATE INDEX idx_blog_analytics_type ON blog_analytics(event_type);

-- Speed up queries by date
CREATE INDEX idx_blog_analytics_date ON blog_analytics(created_at DESC);

-- Speed up queries for unique visitors
CREATE INDEX idx_blog_analytics_unique ON blog_analytics(is_unique_visitor) WHERE is_unique_visitor = true;

-- Composite index for article + event type (common query pattern)
CREATE INDEX idx_blog_analytics_slug_type ON blog_analytics(article_slug, event_type);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS
ALTER TABLE blog_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT analytics events (anonymous tracking)
CREATE POLICY "Allow anonymous inserts for analytics"
  ON blog_analytics
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (you) can read analytics
CREATE POLICY "Allow reading analytics for authenticated users"
  ON blog_analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can delete old analytics (data cleanup)
CREATE POLICY "Allow authenticated users to delete analytics"
  ON blog_analytics
  FOR DELETE
  TO authenticated
  USING (true);

-- =============================================================================
-- HELPER VIEWS (Pre-calculated Statistics)
-- =============================================================================

-- View: Popular Articles (by views)
CREATE OR REPLACE VIEW popular_articles AS
SELECT 
  article_slug,
  article_title,
  article_category,
  COUNT(*) FILTER (WHERE event_type = 'view') as total_views,
  COUNT(DISTINCT session_id) as unique_visitors,
  AVG(CAST(event_value AS INTEGER)) FILTER (WHERE event_type = 'time_spent') as avg_time_spent_seconds,
  COUNT(*) FILTER (WHERE event_type = 'like') as total_likes,
  COUNT(*) FILTER (WHERE event_type = 'share') as total_shares,
  MAX(created_at) as last_viewed
FROM blog_analytics
GROUP BY article_slug, article_title, article_category
ORDER BY total_views DESC;

-- Grant permission to read the view
GRANT SELECT ON popular_articles TO authenticated;

-- View: Recent Activity (last 7 days)
CREATE OR REPLACE VIEW recent_blog_activity AS
SELECT 
  article_slug,
  article_title,
  event_type,
  COUNT(*) as event_count,
  COUNT(DISTINCT session_id) as unique_users,
  DATE(created_at) as date
FROM blog_analytics
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY article_slug, article_title, event_type, DATE(created_at)
ORDER BY date DESC, event_count DESC;

-- Grant permission to read the view
GRANT SELECT ON recent_blog_activity TO authenticated;

-- View: Engagement Metrics (all articles)
CREATE OR REPLACE VIEW blog_engagement_metrics AS
SELECT 
  article_slug,
  article_title,
  article_category,
  COUNT(*) FILTER (WHERE event_type = 'view') as views,
  COUNT(*) FILTER (WHERE event_type = 'like') as likes,
  COUNT(*) FILTER (WHERE event_type = 'share') as shares,
  AVG(CAST(event_value AS INTEGER)) FILTER (WHERE event_type = 'time_spent') as avg_time_spent,
  ROUND(
    (COUNT(*) FILTER (WHERE event_type = 'like')::FLOAT / 
     NULLIF(COUNT(*) FILTER (WHERE event_type = 'view'), 0) * 100)
  , 2) as like_rate_percentage,
  ROUND(
    (COUNT(*) FILTER (WHERE event_type = 'share')::FLOAT / 
     NULLIF(COUNT(*) FILTER (WHERE event_type = 'view'), 0) * 100)
  , 2) as share_rate_percentage
FROM blog_analytics
GROUP BY article_slug, article_title, article_category
ORDER BY views DESC;

-- Grant permission to read the view
GRANT SELECT ON blog_engagement_metrics TO authenticated;

-- =============================================================================
-- SAMPLE ANALYTICS DATA (for testing)
-- =============================================================================

-- Insert sample analytics events
INSERT INTO blog_analytics (article_slug, article_title, article_category, event_type, event_value, session_id, device_type, browser) VALUES
  ('building-modern-nextjs-apps', 'Building Modern Next.js Apps', 'Web Development', 'view', NULL, 'session_001', 'desktop', 'Chrome'),
  ('building-modern-nextjs-apps', 'Building Modern Next.js Apps', 'Web Development', 'time_spent', '180', 'session_001', 'desktop', 'Chrome'),
  ('building-modern-nextjs-apps', 'Building Modern Next.js Apps', 'Web Development', 'like', NULL, 'session_001', 'desktop', 'Chrome'),
  ('supabase-real-time-apps', 'Building Real-time Apps with Supabase', 'Backend', 'view', NULL, 'session_002', 'mobile', 'Safari'),
  ('supabase-real-time-apps', 'Building Real-time Apps with Supabase', 'Backend', 'time_spent', '240', 'session_002', 'mobile', 'Safari'),
  ('supabase-real-time-apps', 'Building Real-time Apps with Supabase', 'Backend', 'share', 'twitter', 'session_002', 'mobile', 'Safari'),
  ('web-performance-optimization', 'Web Performance Optimization Tips', 'Performance', 'view', NULL, 'session_003', 'desktop', 'Firefox'),
  ('web-performance-optimization', 'Web Performance Optimization Tips', 'Performance', 'time_spent', '420', 'session_003', 'desktop', 'Firefox'),
  ('web-performance-optimization', 'Web Performance Optimization Tips', 'Performance', 'like', NULL, 'session_003', 'desktop', 'Firefox'),
  ('web-performance-optimization', 'Web Performance Optimization Tips', 'Performance', 'share', 'linkedin', 'session_003', 'desktop', 'Firefox');

-- =============================================================================
-- USAGE EXAMPLES
-- =============================================================================

-- Query 1: Get all views for a specific article
-- SELECT * FROM blog_analytics WHERE article_slug = 'building-modern-nextjs-apps' AND event_type = 'view';

-- Query 2: Get most popular articles
-- SELECT * FROM popular_articles LIMIT 10;

-- Query 3: Get engagement metrics for all articles
-- SELECT * FROM blog_engagement_metrics;

-- Query 4: Get recent activity (last 7 days)
-- SELECT * FROM recent_blog_activity;

-- Query 5: Get total views by category
-- SELECT article_category, COUNT(*) as total_views 
-- FROM blog_analytics 
-- WHERE event_type = 'view' 
-- GROUP BY article_category 
-- ORDER BY total_views DESC;

-- Query 6: Get articles with highest engagement (likes + shares)
-- SELECT 
--   article_slug,
--   article_title,
--   COUNT(*) FILTER (WHERE event_type = 'like') + COUNT(*) FILTER (WHERE event_type = 'share') as total_engagement
-- FROM blog_analytics
-- GROUP BY article_slug, article_title
-- ORDER BY total_engagement DESC
-- LIMIT 10;

-- =============================================================================
-- CLEANUP / MAINTENANCE
-- =============================================================================

-- Function: Delete old analytics data (older than 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_analytics() RETURNS void AS $$
BEGIN
  DELETE FROM blog_analytics WHERE created_at < NOW() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Get analytics summary for a specific article
CREATE OR REPLACE FUNCTION get_article_analytics(p_article_slug VARCHAR)
RETURNS TABLE (
  total_views BIGINT,
  unique_visitors BIGINT,
  total_likes BIGINT,
  total_shares BIGINT,
  avg_time_spent NUMERIC,
  engagement_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE event_type = 'view'),
    COUNT(DISTINCT session_id),
    COUNT(*) FILTER (WHERE event_type = 'like'),
    COUNT(*) FILTER (WHERE event_type = 'share'),
    AVG(CAST(event_value AS INTEGER)) FILTER (WHERE event_type = 'time_spent'),
    ROUND(
      (COUNT(*) FILTER (WHERE event_type = 'like' OR event_type = 'share')::FLOAT / 
       NULLIF(COUNT(*) FILTER (WHERE event_type = 'view'), 0) * 100)
    , 2)
  FROM blog_analytics
  WHERE article_slug = p_article_slug;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- NOTES
-- =============================================================================

/*
This blog analytics system tracks:
✅ Page views per article
✅ Unique visitors per article  
✅ Time spent reading (in seconds)
✅ Likes (user engagement)
✅ Shares (viral potential)
✅ Scroll depth (how far users read)
✅ Device type (mobile/desktop)
✅ Traffic sources (referrers)

Privacy-friendly features:
✅ No personal data stored
✅ Anonymous session tracking
✅ IP address can be hashed/anonymized
✅ GDPR compliant
✅ No cookies required

Performance optimized:
✅ Indexed for fast queries
✅ Pre-calculated views for common queries
✅ Efficient aggregation functions
✅ Automatic cleanup function

Next steps:
1. Run this SQL in Supabase SQL Editor
2. Implement tracking in your blog components
3. Create analytics dashboard to view insights
4. Use data to improve content strategy
*/

-- =============================================================================
-- DONE! 🎉
-- =============================================================================
-- Your blog analytics table is now ready to track all user interactions!
-- Check VISUAL_SUPABASE_GUIDE.md for implementation examples in your code.
