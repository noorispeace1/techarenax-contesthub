'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: '1',
    image: '/contest_algorithm.jpg',
    badge: '🔥 FEATURED CONTEST',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    title: 'Global Algorithm Championship 2026',
    subtitle: 'Compete against 5,000+ top programmers worldwide in an intense 5-hour algorithmic showdown with $25,000+ in prizes.',
    primaryCtaText: 'Join Championship',
    primaryCtaLink: '/contests/1',
    category: 'Algorithm · Advanced',
    prize: '$25,000 Prize Pool',
  },
  {
    id: '2',
    image: '/contest_aiml.jpg',
    badge: '🤖 AI & MACHINE LEARNING',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    title: 'AI/ML Hackathon: Future Builders',
    subtitle: 'Build revolutionary AI applications in 48 hours. Mentorship from DeepMind labs and industry experts included.',
    primaryCtaText: 'Register for Hackathon',
    primaryCtaLink: '/contests/2',
    category: 'AI/ML · Intermediate',
    prize: '$14,000 Prize Pool',
  },
  {
    id: '3',
    image: '/contest_webdev.jpg',
    badge: '⚡ FULL STACK SPRINT',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    title: 'Web Dev Sprint: 24-Hour Build',
    subtitle: 'Design, code, and deploy a complete full-stack web application from scratch. Open to developers of all levels.',
    primaryCtaText: 'Enter Web Sprint',
    primaryCtaLink: '/contests/3',
    category: 'Web Dev · Beginner',
    prize: '$5,250 Prize Pool',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16">
      {/* Main Hero Slider Box */}
      <div className="relative h-[480px] sm:h-[540px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950">
        
        {/* Background Images Cross-Fade */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-70 scale-105 transition-transform duration-7000' : 'opacity-0 scale-100 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Gradient Overlays for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* Content Container */}
        <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-end max-w-3xl">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`transition-all duration-500 ${
                idx === current ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-4'
              }`}
            >
              {/* Badge & Meta */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${slide.badgeColor}`}>
                  {slide.badge}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 font-semibold border border-amber-500/20">
                  🏆 {slide.prize}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 tracking-tight drop-shadow-md">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed mb-6 line-clamp-2 max-w-2xl">
                {slide.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={slide.primaryCtaLink}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
                >
                  🚀 {slide.primaryCtaText}
                </Link>
                <Link
                  href="/contests"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
                >
                  View All Contests
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-indigo-600 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/60 hover:bg-indigo-600 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          ›
        </button>

        {/* Slide Indicators / Thumbnails Bar */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === current
                  ? 'w-8 bg-indigo-500 shadow-lg shadow-indigo-500/50'
                  : 'w-2.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
