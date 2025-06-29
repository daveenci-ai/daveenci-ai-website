import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, User, BookOpen } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const Blog = () => {
  const featuredPost = {
    title: "The Ultimate Guide to AI-Powered Marketing Automation in 2024",
    excerpt: "Discover how businesses are leveraging AI to automate their marketing processes, generate more qualified leads, and scale their operations efficiently.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Alex Johnson",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Marketing Automation"
  };

  const blogPosts = [
    {
      title: "5 Signs Your Business Needs Marketing Automation",
      excerpt: "Learn the key indicators that show when it's time to automate your marketing processes and how to get started.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      author: "Sarah Chen",
      date: "December 12, 2024",
      readTime: "5 min read",
      category: "Business Strategy"
    },
    {
      title: "How AI is Revolutionizing Lead Generation",
      excerpt: "Explore the latest AI technologies that are transforming how businesses identify, qualify, and nurture potential customers.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      author: "Marcus Rodriguez",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "AI Solutions"
    },
    {
      title: "ROI Calculator: Marketing Automation Investment",
      excerpt: "Use our comprehensive guide to calculate the return on investment for your marketing automation initiatives.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      author: "Alex Johnson",
      date: "December 8, 2024",
      readTime: "7 min read",
      category: "ROI & Analytics"
    },
    {
      title: "Custom CRM vs. Off-the-Shelf: What's Right for You?",
      excerpt: "Compare the benefits and drawbacks of custom CRM solutions versus pre-built systems for your business needs.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      author: "Sarah Chen",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Custom Software"
    },
    {
      title: "Integration Success: Connecting Your Business Tools",
      excerpt: "Best practices for integrating multiple business systems to create seamless automated workflows.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      author: "Marcus Rodriguez",
      date: "December 3, 2024",
      readTime: "8 min read",
      category: "Systems Integration"
    },
    {
      title: "Machine Learning for Small Business: A Practical Guide",
      excerpt: "Demystify machine learning and discover practical applications that can benefit small and medium-sized businesses.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      author: "Alex Johnson",
      date: "November 30, 2024",
      readTime: "9 min read",
      category: "AI Solutions"
    }
  ];

  const categories = ["All", "Marketing Automation", "AI Solutions", "Custom Software", "Systems Integration", "Business Strategy", "ROI & Analytics"];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <BookOpen className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              <span className="text-red-600">Insights</span> & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest trends in AI, marketing automation, and business growth strategies from our team of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Article</h2>
            <p className="text-gray-600">Our latest insights on AI and automation</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {featuredPost.category}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                {featuredPost.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredPost.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All" 
                    ? "bg-red-600 text-white" 
                    : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-red-200">
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-16">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Get the latest insights on AI, automation, and business growth delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog; 