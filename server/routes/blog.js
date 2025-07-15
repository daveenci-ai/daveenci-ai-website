import express from 'express';
import rateLimit from 'express-rate-limit';
import { query } from '../config/database.js';

const router = express.Router();

// Rate limiting for blog endpoints
const blogLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for LLM endpoints (more restrictive)
const llmLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per hour
  message: 'Too many content creation requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-');
};

// Helper function to calculate reading time
const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Helper function to generate excerpt
const generateExcerpt = (content, maxLength = 200) => {
  const plainText = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength).trim() + '...'
    : plainText;
};

// Helper function to parse tags
const parseTags = (tagsString) => {
  if (!tagsString) return [];
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
};

// GET /api/blog/posts - List all published posts with pagination and filtering
router.get('/posts', blogLimiter, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      tag,
      search,
      featured,
      sort = 'published_at'
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Build WHERE clause
    let whereConditions = ["status = 'published'"];
    let queryParams = [];
    let paramCount = 0;

    if (tag) {
      whereConditions.push(`tags ILIKE $${++paramCount}`);
      queryParams.push(`%${tag}%`);
    }

    if (search) {
      whereConditions.push(`(title ILIKE $${++paramCount} OR content ILIKE $${++paramCount})`);
      queryParams.push(`%${search}%`, `%${search}%`);
      paramCount++;
    }

    if (featured === 'true') {
      whereConditions.push('is_featured = true');
    }

    // Build ORDER BY clause
    let orderBy = 'published_at DESC';
    if (sort === 'title') orderBy = 'title ASC';
    else if (sort === 'views') orderBy = 'view_count DESC';
    else if (sort === 'created_at') orderBy = 'created_at DESC';

    const postsQuery = `
      SELECT 
        id,
        title,
        slug,
        excerpt,
        tags,
        featured_image_url,
        view_count,
        read_time_minutes,
        is_featured,
        published_at,
        created_at,
        updated_at
      FROM blog_posts
      WHERE ${whereConditions.join(' AND ')}
      ORDER BY ${orderBy}
      LIMIT $${++paramCount} OFFSET $${++paramCount}
    `;

    queryParams.push(limitNum, offset);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM blog_posts
      WHERE ${whereConditions.join(' AND ')}
    `;

    const [postsResult, countResult] = await Promise.all([
      query(postsQuery, queryParams),
      query(countQuery, queryParams.slice(0, -2)) // Remove limit and offset for count
    ]);

    // Parse tags for each post
    const posts = postsResult.rows.map(post => ({
      ...post,
      tags: parseTags(post.tags),
      author_name: 'DaVeenci AI Team' // Static author
    }));

    const totalPosts = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalPosts / limitNum);

    res.json({
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalPosts,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// GET /api/blog/posts/:slug - Get single post by slug
router.get('/posts/:slug', blogLimiter, async (req, res) => {
  try {
    const { slug } = req.params;

    // Update view count
    await query(
      'UPDATE blog_posts SET view_count = view_count + 1 WHERE slug = $1',
      [slug]
    );

    const postResult = await query(
      'SELECT * FROM blog_posts WHERE slug = $1 AND status = $2',
      [slug, 'published']
    );

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const post = {
      ...postResult.rows[0],
      tags: parseTags(postResult.rows[0].tags),
      author_name: 'DaVeenci AI Team',
      author_bio: 'Expert insights on AI automation, marketing technology, and business growth strategies.',
      author_avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    };

    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

// POST /api/blog/posts - Create new post (for LLM automation)
router.post('/posts', llmLimiter, async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      tags = [],
      meta_description,
      meta_keywords,
      featured_image_url,
      status = 'published',
      is_featured = false,
      seo_score = 0.0,
      llm_prompt
    } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Generate slug
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (true) {
      const existingPost = await query('SELECT id FROM blog_posts WHERE slug = $1', [slug]);
      if (existingPost.rows.length === 0) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Auto-generate excerpt if not provided
    const finalExcerpt = excerpt || generateExcerpt(content);
    
    // Calculate reading time
    const readTime = calculateReadTime(content);

    // Auto-generate meta description if not provided
    const finalMetaDescription = meta_description || generateExcerpt(content, 160);

    // Convert tags array to comma-separated string
    const tagsString = Array.isArray(tags) ? tags.join(', ') : tags;

    // Insert blog post
    const postResult = await query(`
      INSERT INTO blog_posts (
        title, slug, content, excerpt, tags, meta_description, meta_keywords,
        featured_image_url, status, is_featured, read_time_minutes,
        seo_score, llm_prompt
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, slug
    `, [
      title, slug, content, finalExcerpt, tagsString, finalMetaDescription, 
      meta_keywords, featured_image_url, status, is_featured, readTime,
      seo_score, llm_prompt
    ]);

    res.status(201).json({
      id: postResult.rows[0].id,
      slug: postResult.rows[0].slug,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// POST /api/blog/posts/bulk - Bulk create posts (for daily LLM automation)
router.post('/posts/bulk', llmLimiter, async (req, res) => {
  try {
    const { posts } = req.body;

    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return res.status(400).json({ error: 'Posts array is required' });
    }

    if (posts.length > 5) {
      return res.status(400).json({ error: 'Maximum 5 posts allowed per bulk request' });
    }

    const results = [];

    for (const post of posts) {
      try {
        // Create individual post using the same logic as single post creation
        const result = await createSinglePost(post);
        results.push({ success: true, post: result });
      } catch (error) {
        console.error('Error creating post in bulk:', error);
        results.push({ 
          success: false, 
          error: error.message,
          title: post.title 
        });
      }
    }

    res.status(201).json({
      message: 'Bulk post creation completed',
      results,
      totalCreated: results.filter(r => r.success).length,
      totalFailed: results.filter(r => !r.success).length
    });
  } catch (error) {
    console.error('Error in bulk post creation:', error);
    res.status(500).json({ error: 'Failed to create posts in bulk' });
  }
});

// Helper function for single post creation (used in bulk)
async function createSinglePost(postData) {
  const {
    title,
    content,
    excerpt,
    tags = [],
    meta_description,
    meta_keywords,
    featured_image_url,
    status = 'published',
    is_featured = false,
    seo_score = 0.0,
    llm_prompt
  } = postData;

  if (!title || !content) {
    throw new Error('Title and content are required');
  }

  // Generate unique slug
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingPost = await query('SELECT id FROM blog_posts WHERE slug = $1', [slug]);
    if (existingPost.rows.length === 0) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  const finalExcerpt = excerpt || generateExcerpt(content);
  const readTime = calculateReadTime(content);
  const finalMetaDescription = meta_description || generateExcerpt(content, 160);
  const tagsString = Array.isArray(tags) ? tags.join(', ') : tags;

  const postResult = await query(`
    INSERT INTO blog_posts (
      title, slug, content, excerpt, tags, meta_description, meta_keywords,
      featured_image_url, status, is_featured, read_time_minutes,
      seo_score, llm_prompt
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING id, slug
  `, [
    title, slug, content, finalExcerpt, tagsString, finalMetaDescription,
    meta_keywords, featured_image_url, status, is_featured, readTime,
    seo_score, llm_prompt
  ]);

  return { id: postResult.rows[0].id, slug: postResult.rows[0].slug };
}

// GET /api/blog/featured - Get featured posts
router.get('/featured', blogLimiter, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const result = await query(`
      SELECT 
        id,
        title,
        slug,
        excerpt,
        tags,
        featured_image_url,
        view_count,
        read_time_minutes,
        published_at
      FROM blog_posts
      WHERE status = 'published' AND is_featured = true
      ORDER BY published_at DESC
      LIMIT $1
    `, [limit]);

    // Parse tags and add static author info
    const posts = result.rows.map(post => ({
      ...post,
      tags: parseTags(post.tags),
      author_name: 'DaVeenci AI Team',
      author_avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }));

    res.json(posts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    res.status(500).json({ error: 'Failed to fetch featured posts' });
  }
});

// GET /api/blog/tags - List all unique tags
router.get('/tags', blogLimiter, async (req, res) => {
  try {
    const result = await query(`
      SELECT DISTINCT unnest(string_to_array(tags, ',')) as tag, COUNT(*) as count
      FROM blog_posts 
      WHERE status = 'published' AND tags IS NOT NULL AND tags != ''
      GROUP BY tag
      HAVING trim(unnest(string_to_array(tags, ','))) != ''
      ORDER BY count DESC, tag ASC
    `);

    const tags = result.rows.map(row => ({
      name: row.tag.trim(),
      count: parseInt(row.count)
    })).filter(tag => tag.name.length > 0);

    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// GET /api/blog/sitemap - Generate sitemap data
router.get('/sitemap', async (req, res) => {
  try {
    const result = await query(`
      SELECT slug, updated_at
      FROM blog_posts
      WHERE status = 'published'
      ORDER BY updated_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

export { router as blogRoutes }; 