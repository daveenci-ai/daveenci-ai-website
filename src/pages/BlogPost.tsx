import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getApiEndpoint } from '@/utils/api';
import '../styles/blog-post.css';

// Types
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_description?: string;
  meta_keywords?: string;
  featured_image_url?: string;
  view_count: number;
  read_time_minutes: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_bio?: string;
  author_avatar?: string;
  tags: string[];
}

// API functions
const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  const response = await fetch(getApiEndpoint(`/api/blog/posts/${slug}`));
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found');
    }
    throw new Error('Failed to fetch blog post');
  }
  return response.json();
};

const fetchRelatedPosts = async (slug: string): Promise<BlogPost[]> => {
  const response = await fetch(getApiEndpoint('/api/blog/posts?limit=3'));
  if (!response.ok) throw new Error('Failed to fetch related posts');
  const data = await response.json();
  return data.posts.filter((post: BlogPost) => post.slug !== slug).slice(0, 3);
};

// Default featured image for articles without one
const DEFAULT_FEATURED_IMAGE = "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch blog post
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPost(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch related posts
  const { data: relatedPosts } = useQuery({
    queryKey: ['relatedPosts', slug],
    queryFn: () => fetchRelatedPosts(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Update page title and meta tags
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - DaVeenci AI Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.meta_description || post.excerpt);
      }

      // Update meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && post.meta_keywords) {
        metaKeywords.setAttribute('content', post.meta_keywords);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${post.title} - DaVeenci AI Blog`);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', post.meta_description || post.excerpt);
      }

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', post.featured_image_url || DEFAULT_FEATURED_IMAGE);
      }

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://daveenci.ai/blog/${post.slug}`);
      }
    }
  }, [post]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Share functions
  const shareUrl = `https://daveenci.ai/blog/${slug}`;
  const shareTitle = post?.title || '';

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {error.message === 'Post not found' ? 'Article Not Found' : 'Error Loading Article'}
            </h1>
            <p className="text-gray-600 mb-8">
              {error.message === 'Post not found' 
                ? "The article you're looking for doesn't exist or may have been moved."
                : "We're having trouble loading this article. Please try again later."
              }
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.meta_description || post.excerpt,
          "image": post.featured_image_url || DEFAULT_FEATURED_IMAGE,
          "author": {
            "@type": "Person",
            "name": post.author_name
          },
          "publisher": {
            "@type": "Organization",
            "name": "DaVeenci AI"
          },
          "datePublished": post.published_at,
          "dateModified": post.updated_at,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://daveenci.ai/blog/${post.slug}`
          }
        })}
      </script>

      {/* Hero Section with Featured Image */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white pt-20 pb-16">
        <div className="absolute inset-0 opacity-20">
          <img
            src={post.featured_image_url || DEFAULT_FEATURED_IMAGE}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-red-900/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog */}
            <Link to="/blog" className="inline-flex items-center text-red-300 hover:text-red-200 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-red-600/20 text-red-200 border-red-400/30 hover:bg-red-600/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-8">
              <div className="flex items-center space-x-3">
                {post.author_avatar && (
                  <img
                    src={post.author_avatar}
                    alt={post.author_name}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                )}
                <div>
                  <p className="font-medium text-white">{post.author_name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.read_time_minutes} min read
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-gray-300 font-medium">
                <Share2 className="w-4 h-4 mr-2" />
                Share:
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnTwitter}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnFacebook}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnLinkedIn}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Article Body */}
          <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="blog-content-container"
            />
          </article>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h3 className="flex items-center text-xl font-bold text-gray-900 mb-6">
                <Tag className="w-5 h-5 mr-3 text-red-600" />
                Article Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-gray-600 border-gray-300 hover:border-red-300 hover:text-red-600 px-4 py-2 text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.author_bio && (
            <div className="bg-gradient-to-r from-red-50 to-gray-50 rounded-2xl p-8 mb-12 border border-red-100">
              <div className="flex items-start space-x-6">
                {post.author_avatar && (
                  <img
                    src={post.author_avatar}
                    alt={post.author_name}
                    className="w-20 h-20 rounded-lg flex-shrink-0 border-4 border-white shadow-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">About DaVeenci AI Team</h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">{post.author_bio}</p>
                  
                  {/* CTA Button */}
                  <div className="pt-4">
                    <a 
                      href="https://calendly.com/daveenci/astrid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
                    >
                      Schedule a Call
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative overflow-hidden">
                        <img
                          src={relatedPost.featured_image_url || DEFAULT_FEATURED_IMAGE}
                          alt={relatedPost.title}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6">
                        {relatedPost.tags && relatedPost.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {relatedPost.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{formatDate(relatedPost.published_at)}</span>
                          <span>{relatedPost.read_time_minutes} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost; 