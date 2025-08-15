import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingDots from "../FloatingDots";
import { getPostBySlug, getRelatedPosts } from "../data/blog";

export default function PostPage() {
  const { slug } = useParams();
  
  if (!slug) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Invalid URL</h1>
            <Link to="/blog" className="cta cta-primary">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const post = getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">📄</div>
            <h1 className="text-2xl font-bold mb-2">Article Not Found</h1>
            <p className="text-white/70 mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link to="/blog" className="cta cta-primary">
              Browse All Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const shareUrl = window.location.href;
  const shareTitle = encodeURIComponent(post.title);

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    copy: () => {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Background dots */}
      <div className="fixed inset-0 -z-10">
        <FloatingDots numDots={30} className="mix-blend-screen opacity-20" />
      </div>
      
      <main className="pt-20">
        {/* Article Header */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8">
              <Link to="/" className="hover:text-edtech-green">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-edtech-green">Blog</Link>
              <span>/</span>
              <span className="text-white/80">{post.category}</span>
            </nav>

            {/* Article Meta */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-edtech-blue/20 text-edtech-blue px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="bg-edtech-green text-black px-3 py-1 rounded-full text-sm font-bold">
                    FEATURED
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                {post.excerpt}
              </p>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-edtech-green/20 to-edtech-orange/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-lg">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{post.author.name}</div>
                    <div className="text-white/60 text-sm">{post.author.role}</div>
                  </div>
                </div>

                {/* Article Meta */}
                <div className="flex items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Featured Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-edtech-blue/20 to-edtech-green/20 rounded-2xl mb-8 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <div 
                    className="article-content text-white/90 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/^# /gm, '<h1 class="text-3xl font-bold mb-6 mt-8 text-glow-green">')
                        .replace(/^## /gm, '<h2 class="text-2xl font-bold mb-4 mt-8 text-glow-blue">')
                        .replace(/^### /gm, '<h3 class="text-xl font-bold mb-3 mt-6">')
                        .replace(/^\*\* /gm, '<h4 class="text-lg font-semibold mb-2 mt-4">')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-edtech-green">$1</strong>')
                        .replace(/- \*\*(.*?)\*\*/g, '• <strong class="font-semibold">$1</strong>')
                        .replace(/^- /gm, '• ')
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/^([^#\-•<])/, '<p class="mb-4">$1')
                        .replace(/([^>])$/, '$1</p>')
                    }}
                  />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-white/5 hover:bg-edtech-green/20 text-white/70 hover:text-edtech-green px-3 py-1 rounded-full text-sm transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex items-center gap-4">
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </a>
                    
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                    
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                    
                    <button
                      onClick={socialLinks.copy}
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Table of Contents */}
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                    <div className="space-y-2 text-sm">
                      {post.content.split('\n').filter(line => line.startsWith('#')).map((heading, index) => {
                        const level = heading.match(/^#+/)?.[0].length || 1;
                        const text = heading.replace(/^#+\s/, '');
                        
                        return (
                          <div 
                            key={index} 
                            className={`hover:text-edtech-green transition-colors cursor-pointer ${
                              level === 1 ? 'font-medium' : 
                              level === 2 ? 'pl-3' : 'pl-6'
                            }`}
                            style={{ marginLeft: `${(level - 1) * 12}px` }}
                          >
                            {text}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">About the Author</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-edtech-green/20 to-edtech-orange/20 rounded-full flex items-center justify-center">
                        <span className="font-bold text-lg">
                          {post.author.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{post.author.name}</div>
                        <div className="text-white/60 text-sm">{post.author.role}</div>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {post.author.name} is a {post.author.role.toLowerCase()} with extensive experience 
                      in the field. They regularly contribute insights on the latest industry trends and 
                      best practices.
                    </p>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="card p-6">
                    <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
                    <p className="text-white/70 text-sm mb-4">
                      Get the latest articles and insights delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-edtech-green/50"
                      />
                      <button className="w-full cta cta-primary text-sm py-2">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-black/20">
            <div className="mx-auto max-w-7xl px-6">
              <h2 className="text-2xl font-bold mb-12 text-center">Related Articles</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="card p-0 overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                    <div className="aspect-video bg-gradient-to-br from-edtech-blue/20 to-edtech-green/20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3 text-sm text-white/60">
                        <span className="bg-edtech-blue/20 text-edtech-blue px-2 py-1 rounded text-xs font-medium">
                          {relatedPost.category}
                        </span>
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-edtech-green transition-colors">
                        <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </h3>
                      
                      <p className="text-white/70 text-sm line-clamp-3 mb-4">{relatedPost.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-edtech-green/20 to-edtech-orange/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {relatedPost.author.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-xs text-white/60">{relatedPost.author.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <span>{relatedPost.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/blog" className="cta cta-secondary">
                  View All Articles
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Put Knowledge into Action?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Transform what you've learned into practical skills with our hands-on courses 
                taught by industry professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses" className="cta cta-primary">
                  Explore Courses
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
