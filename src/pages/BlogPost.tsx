import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Clock, Eye, Tag, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { apiConfig } from '@/config/api';

// API base URL
const getApiUrl = () => {
  return apiConfig.baseUrl;
};

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
  const response = await fetch(`${getApiUrl()}/api/blog/posts/${slug}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Post not found');
    }
    throw new Error('Failed to fetch blog post');
  }
  return response.json();
};

const fetchRelatedPosts = async (slug: string): Promise<BlogPost[]> => {
  const response = await fetch(`${getApiUrl()}/api/blog/posts?limit=3`);
  if (!response.ok) throw new Error('Failed to fetch related posts');
  const data = await response.json();
  return data.posts.filter((post: BlogPost) => post.slug !== slug).slice(0, 3);
};

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
      if (ogImage && post.featured_image_url) {
        ogImage.setAttribute('content', post.featured_image_url);
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
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
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
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 text-center">
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
          "image": post.featured_image_url,
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

      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <Link to="/blog" className="inline-flex items-center text-red-600 hover:text-red-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-red-100 text-red-700 hover:bg-red-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center space-x-3">
              {post.author_avatar && (
                <img
                  src={post.author_avatar}
                  alt={post.author_name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{post.author_name}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.published_at)}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.read_time_minutes} min read
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {post.view_count} views
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center space-x-4 py-6 border-y border-gray-200">
            <span className="flex items-center text-gray-600 font-medium">
              <Share2 className="w-4 h-4 mr-2" />
              Share:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnTwitter}
              className="flex items-center space-x-2"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnFacebook}
              className="flex items-center space-x-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareOnLinkedIn}
              className="flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </Button>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="prose prose-lg prose-red max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-blockquote:border-l-red-500 prose-blockquote:bg-red-50 prose-blockquote:px-6 prose-blockquote:py-4
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-gray-700"
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
              <Tag className="w-5 h-5 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-gray-600 border-gray-300">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author_bio && (
          <div className="bg-white rounded-xl p-8 mb-12 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              {post.author_avatar && (
                <img
                  src={post.author_avatar}
                  alt={post.author_name}
                  className="w-16 h-16 rounded-full flex-shrink-0"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author_name}</h3>
                <p className="text-gray-600 leading-relaxed">{post.author_bio}</p>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="group">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {relatedPost.featured_image_url && (
                        <img
                          src={relatedPost.featured_image_url}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="p-6">
                        {relatedPost.tags && relatedPost.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {relatedPost.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
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