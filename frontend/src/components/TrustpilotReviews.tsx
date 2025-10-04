import { useState } from 'react';
import { Star } from 'lucide-react';

interface TrustpilotReview {
  id: number;
  name: string;
  avatar: string;
  location: string;
  reviewCount: number;
  rating: number;
  title: string;
  review: string;
  reviewDate: string;
  verified: boolean;
}

export default function TrustpilotReviews() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Calculate relative time from review date
  const getRelativeTime = (dateString: string): string => {
    const reviewDate = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - reviewDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 14) return '1 week ago';
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 60) return '1 month ago';
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const reviews: TrustpilotReview[] = [
    {
      id: 1,
      name: "Emily Chen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      location: "GB",
      reviewCount: 1,
      rating: 5,
      title: "Excellent learning experience!",
      review: "The Data Analytics program exceeded my expectations. The instructors are knowledgeable and the projects are really hands-on. I landed a job as a Data Analyst within 3 months of completing the course!",
      reviewDate: "September 18, 2025",
      verified: true
    },
    {
      id: 2,
      name: "Marcus Thompson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "US",
      reviewCount: 2,
      rating: 5,
      title: "Career-changing program",
      review: "I switched from marketing to tech thanks to their AI & Machine Learning program. The support from mentors was incredible, and the curriculum is up-to-date with industry standards.",
      reviewDate: "September 10, 2025",
      verified: true
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      location: "CA",
      reviewCount: 1,
      rating: 5,
      title: "Best investment I've made",
      review: "The Python Development program was comprehensive and well-structured. I appreciate the lifetime access to materials and the active community. Worth every penny!",
      reviewDate: "September 15, 2025",
      verified: true
    },
    {
      id: 4,
      name: "James Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      location: "GB",
      reviewCount: 3,
      rating: 4.5,
      title: "Outstanding support team",
      review: "What sets Edtech Informative apart is their dedication to student success. The career services team helped me polish my resume and prepare for interviews. Highly recommend!",
      reviewDate: "September 13, 2025",
      verified: true
    },
    {
      id: 5,
      name: "Priya Patel",
      avatar: "https://randomuser.me/api/portraits/women/78.jpg",
      location: "IN",
      reviewCount: 1,
      rating: 5,
      title: "Top-notch quality",
      review: "The Cloud Computing program gave me the skills I needed to get AWS certified. The hands-on labs and real-world scenarios made learning practical and engaging.",
      reviewDate: "September 11, 2025",
      verified: true
    },
    {
      id: 6,
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      location: "AU",
      reviewCount: 1,
      rating: 5,
      title: "Transformed my career",
      review: "I went from zero coding knowledge to building full-stack applications. The instructors break down complex concepts brilliantly. This platform is a game-changer!",
      reviewDate: "September 14, 2025",
      verified: true
    },
    {
      id: 7,
      name: "Lisa Anderson",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
      location: "US",
      reviewCount: 4,
      rating: 5,
      title: "Highly professional",
      review: "The Cybersecurity program is incredibly detailed. The instructors have real industry experience, and you can tell they care about your success. Already got two job offers!",
      reviewDate: "September 4, 2025",
      verified: true
    },
    {
      id: 8,
      name: "Ahmed Hassan",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      location: "GB",
      reviewCount: 2,
      rating: 4.5,
      title: "Exceptional learning platform",
      review: "The project-based approach makes all the difference. I built a portfolio that impressed employers. The mentorship sessions were invaluable for my growth.",
      reviewDate: "September 12, 2025",
      verified: true
    }
  ];

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const container = e.currentTarget as HTMLElement;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = e.currentTarget as HTMLElement;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderStars = (rating: number) => {
    // Round to nearest 0.5 for Trustpilot star images (they only support 0.5 increments)
    const roundedRating = Math.round(rating * 2) / 2;
    
    return (
      <div className="flex items-center">
        <img 
          src={`https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-${roundedRating}.svg`}
          alt={`${rating} stars`}
          className="h-5"
        />
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            {/* Trustpilot Logo */}
            <div className="flex items-center gap-2 bg-[#00b67a] text-white px-4 py-2 rounded">
              <Star className="w-5 h-5 fill-white text-white" />
              <span className="font-bold text-lg">Trustpilot</span>
            </div>
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg"
                alt="5 stars"
                className="h-6"
              />
              <span className="font-bold text-gray-900 text-lg">4.9</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-[#00b67a]">10,000+</span> Professionals
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our successful graduates have to say about their learning journey
          </p>
          
          <div className="mt-4 text-sm text-gray-500">
            TrustScore <span className="font-bold text-gray-900">4.9</span> | <span className="font-bold">Excellent</span>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          <div 
            className="overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="flex gap-6 animate-marquee-slow hover:pause-marquee">
              {duplicatedReviews.map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 w-[400px] bg-white border border-[#dcdce6] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Header - Avatar, Name, Location */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#191919] text-base">{review.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#5f5f5f]">
                        <span>{review.location}</span>
                        <span>•</span>
                        <span>{review.reviewCount} {review.reviewCount === 1 ? 'review' : 'reviews'}</span>
                      </div>
                    </div>
                    <div className="text-xs text-[#5f5f5f] whitespace-nowrap">
                      {getRelativeTime(review.reviewDate)}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    {renderStars(review.rating)}
                  </div>

                  {/* Title */}
                  <h5 className="font-bold text-[#191919] mb-3 text-lg leading-snug">
                    {review.title}
                  </h5>

                  {/* Review Text */}
                  <p className="text-[#191919] text-base leading-relaxed mb-4">
                    {review.review}
                  </p>

                  {/* Date and Status */}
                  <div className="flex items-center gap-3 text-xs text-[#5f5f5f]">
                    <span className="bg-[#f5f5f5] px-2 py-1 rounded">{review.reviewDate}</span>
                    {review.verified && (
                      <span className="bg-[#f5f5f5] px-2 py-1 rounded">Unprompted review</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.trustpilot.com/review/edtechinformative.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00b67a] hover:text-[#008a5d] font-semibold text-lg transition-colors"
          >
            Read all reviews on Trustpilot
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes marquee-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee-slow {
          animation: marquee-slow 60s linear infinite;
        }

        .pause-marquee:hover {
          animation-play-state: paused;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
