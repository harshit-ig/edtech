import { useEffect, useRef } from "react";
import { courses } from "../data/courses";

export default function CoursesSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const isInteractingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const step = () => {
      const vp = viewportRef.current;
      if (vp && !isInteractingRef.current) {
        const max = vp.scrollWidth - vp.clientWidth;
        const next = vp.scrollLeft + 0.5; // speed px/frame
        vp.scrollLeft = next >= max ? 0 : next;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  const scheduleResume = (delay = 1000) => {
    if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  };

  const onMouseDownDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const vp = viewportRef.current;
    if (!vp) return;
    isInteractingRef.current = true;
    vp.classList.add("dragging");
    let startX = e.pageX - vp.offsetLeft;
    let scrollLeft = vp.scrollLeft;
    const onMove = (ev: MouseEvent) => {
      const x = ev.pageX - vp.offsetLeft;
      vp.scrollLeft = scrollLeft - (x - startX);
    };
    const onUp = () => {
      vp.classList.remove("dragging");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      scheduleResume(1200);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const onTouchStartDrag: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const vp = viewportRef.current;
    if (!vp) return;
    isInteractingRef.current = true;
    const touch = e.touches[0];
    let startX = touch.pageX - vp.offsetLeft;
    let scrollLeft = vp.scrollLeft;
    const onMove = (ev: TouchEvent) => {
      const t = ev.touches[0];
      const x = t.pageX - vp.offsetLeft;
      vp.scrollLeft = scrollLeft - (x - startX);
    };
    const onEnd = () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      scheduleResume(1200);
    };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
  };

  return (
    <section id="courses" className="py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <div className="badge-hero mx-auto w-max"><span>🚀</span><span>MOST POPULAR COURSES</span></div>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold">Featured Programs</h2>
          <p className="mt-2 text-white/70 max-w-2xl mx-auto">Transform your career with our industry‑leading certification programs designed by experts for real‑world success</p>
        </div>

        <div className="marquee mb-6">
          <div
            className="marquee-viewport"
            ref={viewportRef}
            onMouseDown={onMouseDownDrag}
            onTouchStart={onTouchStartDrag}
            onMouseEnter={() => { isInteractingRef.current = true; }}
            onMouseLeave={() => scheduleResume(800)}
            onWheel={() => { isInteractingRef.current = true; scheduleResume(1000); }}
          >
            <div className="marquee-track py-6">
            {[...courses, ...courses].map((c, idx) => (
              <article key={`${c.id}-${idx}`} className="course-card card-glow p-4 flex flex-col min-w-[340px] max-w-[380px] relative" data-accent={c.accent.replace('edtech-','')}> 
                <div className="course-head">
                  <span className="cat-pill">{c.category}</span>
                  <div className="course-icon">
                    {c.id === 'data-analytics' || c.id === 'data-analytics-2' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 19V7m5 12V4m5 15V9m5 10V12"/></svg>
                    ) : c.id === 'gen-ai' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.4 4.9L20 9l-4 3.9.9 5.6L12 16.8 7.1 18.5 8 13 4 9l5.6-1.1L12 3z"/></svg>
                    ) : c.id === 'ai-engineering' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M8 7v10m8-10v10M4 17h16"/></svg>
                    ) : c.id === 'ai-kids' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3v18"/></svg>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="badge-accent text-white/80">{c.badge}{c.tag ? ' ⭐ ' + c.tag : ''}</span>
                    {c.tag ? <span className="small-tag">{c.tag}</span> : null}
                  </div>
                  <h3 className="course-title mt-2 text-[18px] font-semibold leading-snug line-clamp-2">{c.title}</h3>
                  <p className="mt-2 text-[13px] text-white/70 line-clamp-2">{c.desc}</p>
                </div>

                <div className="mt-4 flex items-center gap-3 text-[12px] text-white/70">
                  <span className="chip"><span className="meta-dot"/> {c.duration}</span>
                  <span className="chip"><span className="meta-dot"/> {c.extra}</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <a className="cta cta-secondary" href="#">View Details</a>
                  <a className="cta cta-primary" href="#">Apply Now</a>
                </div>

                {(c.badge === 'MOST POPULAR' || c.badge === 'TRENDING' || c.badge === 'NEW' || c.badge === 'FEATURED') && (
                  <span className="corner-badge">{c.badge}</span>
                )}
              </article>
            ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#" className="cta cta-secondary hover:text-edtech-orange">View All Courses</a>
        </div>
      </div>
    </section>
  );
}

