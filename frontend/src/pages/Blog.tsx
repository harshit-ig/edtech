import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDots from "../FloatingDots";
import { blogPosts, categories, featuredPosts } from "../data/blog";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const allCategories = ['All', ...categories];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background dots */}
      <div className="fixed inset-0 -z-10">
        <FloatingDots numDots={50} className="mix-blend-screen opacity-40" />
      </div>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <div className="badge-hero mx-auto w-max mb-6">
                <span>📝</span><span>TECH INSIGHTS</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                Latest <span className="text-glow-green">Tech Insights</span> & Tutorials
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto mb-12">
                Stay updated with the latest trends, tutorials, and insights from the world of technology. 
                Learn from industry experts and advance your career.
              </p>

              {/* Search and Filter */}
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col gap-4 mb-8">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-6 py-3 text-white placeholder-white/50 focus:outline-none focus:border-edtech-green/50 focus:bg-black/40 transition-all min-w-0"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-edtech-green text-black'
                            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {selectedCategory === 'All' && !searchTerm && (
          <section className="py-12 bg-black/20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Featured Articles</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <article key={post.id} className="card p-0 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-edtech-green/20 to-edtech-orange/20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-edtech-green text-black px-3 py-1 rounded-full text-xs font-bold">
                          FEATURED
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                        <span className="bg-edtech-blue/20 text-edtech-blue px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span>{formatDate(post.publishedAt)}</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-edtech-green transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      
                      <p className="text-white/70 line-clamp-3 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-edtech-green/20 to-edtech-orange/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {post.author.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{post.author.name}</div>
                            <div className="text-xs text-white/50">{post.author.role}</div>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="text-edtech-green hover:text-edtech-orange transition-colors font-medium text-sm"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {selectedCategory === 'All' && !searchTerm ? 'All Articles' : `${filteredPosts.length} Article${filteredPosts.length !== 1 ? 's' : ''} Found`}
              </h2>
              
              {(selectedCategory !== 'All' || searchTerm) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="text-edtech-green hover:text-edtech-orange transition-colors text-sm font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="card p-0 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-edtech-blue/20 to-edtech-green/20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      {post.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-edtech-orange text-black px-2 py-1 rounded text-xs font-bold">
                            FEATURED
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3 text-sm text-white/60">
                        <span className="bg-edtech-blue/20 text-edtech-blue px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-edtech-green transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      
                      <p className="text-white/70 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-edtech-green/20 to-edtech-orange/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {post.author.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-xs text-white/60">{post.author.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-white/50 px-2 py-1">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-white/70 mb-6">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchTerm('');
                  }}
                  className="cta cta-secondary"
                >
                  View All Articles
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-24 bg-black/20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="card p-8 md:p-12">
              <div className="w-16 h-16 bg-edtech-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-edtech-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Never Miss an Update
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest tech insights, tutorials, and career advice 
                delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-edtech-green/50"
                />
                <button className="cta cta-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-white/50 mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Level Up Your Skills?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Don't just read about technology - learn it hands-on with our comprehensive courses 
                designed by industry experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses" className="cta cta-primary">
                  Browse Courses
                </Link>
                <Link to="/contact" className="cta cta-secondary">
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
