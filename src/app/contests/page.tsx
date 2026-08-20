'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contests } from '../../data/contests';
import { ContestStatus, ContestCategory } from '../../types/contest';

const statusStyles: Record<string, string> = {
  Live: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Upcoming: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  Completed: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
};

const difficultyStyles: Record<string, string> = {
  Beginner: 'text-emerald-400',
  Intermediate: 'text-amber-400',
  Advanced: 'text-rose-400',
};

const ALL_STATUSES: ContestStatus[] = ['Live', 'Upcoming', 'Completed'];
const ALL_CATEGORIES: ContestCategory[] = ['Algorithm', 'Web Dev', 'AI/ML', 'Security', 'Design', 'Data Science'];

export default function ContestsPage() {
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState<ContestStatus | 'All'>('All');
  const [activeCategory, setActiveCategory] = useState<ContestCategory | 'All'>('All');

  const filtered = useMemo(() => {
    return contests.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = activeStatus === 'All' || c.status === activeStatus;
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, activeStatus, activeCategory]);

  const liveCount = contests.filter((c) => c.status === 'Live').length;

  return (
    <div className="min-h-screen text-white">
      {/* Page header */}
      <div className="border-b border-[var(--border-base)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">All Contests</h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                Showing <span className="text-white font-semibold">{filtered.length}</span> of{' '}
                {contests.length} contests
                {liveCount > 0 && (
                  <span className="ml-2 inline-flex items-center gap-1 text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                    {liveCount} Live
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 sm:mt-6 relative max-w-lg">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contests, tags…"
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 text-white placeholder-slate-400 text-sm outline-none transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors text-lg leading-none">×</button>
            )}
          </div>

          {/* Filters - Responsive scroll container on mobile */}
          <div className="mt-4 flex flex-col gap-3">
            {/* Status tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {(['All', ...ALL_STATUSES] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeStatus === s
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {(['All', ...ALL_CATEGORIES] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contest grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
            <div className="text-5xl sm:text-6xl mb-4">🔍</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No contests found</h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(''); setActiveStatus('All'); setActiveCategory('All'); }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((c) => (
              <Link
                key={c.id}
                href={`/contests/${c.id}`}
                className="card group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col"
              >
                {/* Contest Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-r ${c.imageColor}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur border border-white/10 text-slate-200 flex items-center gap-1.5">
                      <span>{c.organizer.logo}</span>
                      <span>{c.organizer.name}</span>
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur flex items-center gap-1 ${statusStyles[c.status]}`}>
                      {c.status === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />}
                      {c.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title & description */}
                    <h3 className="font-bold text-white text-base mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">{c.description}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">{c.category}</span>
                      <span className={`text-xs font-semibold ${difficultyStyles[c.difficulty]}`}>● {c.difficulty}</span>
                    </div>
                  </div>

                  <div>
                    {/* Footer */}
                    <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>👥 {c.participants.toLocaleString()} joined</span>
                      <span className="font-bold text-amber-400">💰 ${Math.max(...c.prizes.map(p => p.amount)).toLocaleString()}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                      {c.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
