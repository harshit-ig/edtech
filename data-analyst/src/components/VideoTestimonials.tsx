'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Play } from 'lucide-react';

export default function VideoTestimonials() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const videos = [
    { id: '1', url: '/videos/testimonial-1.mp4' },
    { id: '2', url: '/videos/testimonial-2.mp4' },
    { id: '3', url: '/videos/testimonial-3.mp4' },
    { id: '4', url: '/videos/testimonial-4.mp4' },
    { id: '5', url: '/videos/testimonial-5.mp4' },
    { id: '6', url: '/videos/testimonial-6.mp4' },
  ];

  const handlePlay = (videoId: string) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      if (playingVideo === videoId) {
        // If this video is already playing, pause it
        videoElement.pause();
        setPlayingVideo(null);
      } else {
        // Pause all other videos first
        Object.entries(videoRefs.current).forEach(([id, video]) => {
          if (video && id !== videoId) {
            video.pause();
          }
        });
        // Then play the selected video
        videoElement.play();
        setPlayingVideo(videoId);
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Real Students, Real Results 📱
          </h2>
          <p className="text-gray-600">
            Tap to watch their success stories
          </p>
        </motion.div>

        {/* Video Reels Grid */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 px-4 md:justify-center min-w-min">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0"
            >
              <div className="relative group">
                {/* Portrait Video Container */}
                <div className="relative w-[280px] h-[480px] rounded-3xl overflow-hidden bg-black shadow-2xl">
                  <video
                    ref={(el) => { videoRefs.current[video.id] = el; }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectFit: 'cover', minWidth: '100%', minHeight: '100%' }}
                    src={video.url}
                    playsInline
                    muted={playingVideo !== video.id}
                    preload="metadata"
                    onClick={() => handlePlay(video.id)}
                  />
                  
                  {/* Play Button Overlay (shows when not playing) */}
                  {playingVideo !== video.id && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                      onClick={() => handlePlay(video.id)}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-12 h-12 text-primary fill-primary" />
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl ring-2 ring-purple-400/50 group-hover:ring-4 group-hover:ring-purple-500/70 transition-all pointer-events-none" />
                </div>

                {/* Tap to Play Text */}
                {playingVideo !== video.id && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-3 text-sm text-gray-600 font-medium"
                  >
                    Tap to play ▶
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

