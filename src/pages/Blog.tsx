import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, Calendar, Clock, User, BookOpen, Search, Filter, Eye, Tag } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { API_CONFIG } from '@/config/api';

// API base URL
const getApiUrl = () => {
  const environment = import.meta.env.PROD ? 'production' : 'development';
  return API_CONFIG[environment].baseUrl;
};

// Types
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url?: string;
  view_count: number;
  read_time_minutes: number;
  is_featured: boolean;
  published_at: string;
  author_name: string;
  author_avatar?: string;
  tags: string[];
}

interface BlogTag {
  name: string;
  count: number;
}

interface BlogResponse {
  posts: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// API functions
const fetchBlogPosts = async (params: {
  page?: number;
  limit?: number;
  tag?: string;
  search?: string;
  featured?: boolean;
}): Promise<BlogResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.tag) searchParams.append('tag', params.tag);
  if (params.search) searchParams.append('search', params.search);
  if (params.featured) searchParams.append('featured', 'true');

  const response = await fetch(`${getApiUrl()}/api/blog/posts?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch blog posts');
  return response.json();
};

const fetchTags = async (): Promise<BlogTag[]> => {
  const response = await fetch(`${getApiUrl()}/api/blog/tags`);
  if (!response.ok) throw new Error('Failed to fetch tags');
  return response.json();
};

const fetchFeaturedPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${getApiUrl()}/api/blog/featured?limit=1`);
  if (!response.ok) throw new Error('Failed to fetch featured posts');
  return response.json();
};

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const postsPerPage = 6;

  // Fetch blog posts
  const { data: blogData, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['blogPosts', currentPage, selectedTag, searchQuery],
    queryFn: () => fetchBlogPosts({
      page: currentPage,
      limit: postsPerPage,
      tag: selectedTag || undefined,
      search: searchQuery || undefined
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch tags
  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ['blogTags'],
    queryFn: fetchTags,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch featured post
  const { data: featuredPosts, isLoading: featuredLoading } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: fetchFeaturedPosts,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const featuredPost = featuredPosts?.[0];

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle tag filter
  const handleTagFilter = (tagName: string) => {
    setSelectedTag(tagName === selectedTag ? '' : tagName);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading skeleton component
  const PostSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* SEO Meta Tags */}
      <head>
        <title>AI & Marketing Automation Blog - DaVeenci AI</title>
        <meta name="description" content="Expert insights on AI automation, marketing technology, and business growth strategies. Stay updated with the latest trends and best practices." />
        <meta name="keywords" content="AI automation, marketing automation, business strategy, technology trends, CRM, lead generation" />
        <meta property="og:title" content="AI & Marketing Automation Blog - DaVeenci AI" />
        <meta property="og:description" content="Expert insights on AI automation, marketing technology, and business growth strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://daveenci.ai/blog" />
        <link rel="canonical" href="https://daveenci.ai/blog" />
      </head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI & Automation
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Expert insights on AI automation, marketing technology, and business growth strategies. 
              Stay ahead with the latest trends and actionable advice.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !featuredLoading && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {featuredPost.featured_image_url && (
                  <img
                    src={featuredPost.featured_image_url}
                    alt={featuredPost.title}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                )}
              </div>
              <div>
                {featuredPost.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} className="bg-red-100 text-red-700 hover:bg-red-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    {featuredPost.author_avatar && (
                      <img
                        src={featuredPost.author_avatar}
                        alt={featuredPost.author_name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{featuredPost.author_name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(featuredPost.published_at)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPost.read_time_minutes} min read
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {featuredPost.view_count} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/blog/${featuredPost.slug}`}>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tags Filter */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                <Button
                  variant={selectedTag === '' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagFilter('')}
                  className="rounded-full"
                >
                  <Tag className="w-4 h-4 mr-1" />
                  All Posts
                </Button>
                {tags?.slice(0, 8).map((tag) => (
                  <Button
                    key={tag.name}
                    variant={selectedTag === tag.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleTagFilter(tag.name)}
                    className="rounded-full"
                  >
                    {tag.name} ({tag.count})
                  </Button>
                ))}
              </div>
            </div>
            {blogData && (
              <p className="text-sm text-gray-600">
                {blogData.pagination.totalPosts} articles found
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {postsError && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Failed to load blog posts</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          )}

          {postsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : blogData?.posts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogData?.posts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {post.featured_image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {post.is_featured && (
                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                          Featured
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="p-6">
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {post.author_avatar && (
                          <img
                            src={post.author_avatar}
                            alt={post.author_name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{post.author_name}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(post.published_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.read_time_minutes} min
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.view_count}
                        </span>
                      </div>
                      <Link to={`/blog/${post.slug}`}>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {blogData && blogData.pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <Button
                variant="outline"
                disabled={!blogData.pagination.hasPrevPage}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {Array.from({ length: Math.min(5, blogData.pagination.totalPages) }).map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className="w-10 h-10"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                disabled={!blogData.pagination.hasNextPage}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog; 