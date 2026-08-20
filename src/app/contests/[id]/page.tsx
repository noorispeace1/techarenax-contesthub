'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { contests } from '../../../data/contests';

const statusStyles: Record<string, string> = {
  Live: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Upcoming: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  Completed: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
};

export default function ContestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const contest = contests.find((c) => c.id === id) || contests[0];

  return (
    <div className="min-h-screen text-white">
      {/* Header / Hero */}
      <div className="relative overflow-hidden border-b border-[var(--border-base)] bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <Link href="/contests" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-indigo-300 mb-4 sm:mb-6 transition-colors">
            ← Back to all contests
          </Link>

          {/* Banner container */}
          <div className="relative h-48 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 sm:mb-8 border border-white/10 shadow-2xl">
            {contest.image ? (
              <Image src={contest.image} alt={contest.title} fill className="object-cover" priority />
            ) : (
              <div className={`h-full w-full bg-gradient-to-r ${contest.imageColor}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[contest.status]}`}>
                    {contest.status}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur text-slate-300 border border-white/10">
                    {contest.category}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {contest.difficulty}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">{contest.title}</h1>
              </div>

              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/30 transition-all">
                {contest.status === 'Completed' ? 'View Results' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3">About this Contest</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{contest.fullDescription}</p>
            </div>

            {/* Timeline */}
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Timeline</h2>
              <div className="space-y-4">
                {contest.timeline.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${event.done ? 'bg-green-400' : 'bg-indigo-500'}`} />
                    <div>
                      <p className="text-sm font-semibold text-white">{event.label}</p>
                      <p className="text-xs text-indigo-300 mt-0.5">{event.date}</p>
                      {event.description && <p className="text-xs text-slate-400 mt-1">{event.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Rules & Guidelines</h2>
              <ul className="space-y-2.5">
                {contest.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Prizes */}
            <div className="card-elevated p-5 sm:p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                💰 Prize Pool
              </h3>
              <div className="space-y-3">
                {contest.prizes.map((prize, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-indigo-300">{prize.rank}</span>
                      <span className="text-xs text-slate-400">({prize.label})</span>
                    </div>
                    <span className="text-sm font-extrabold text-amber-400">${prize.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div className="card-elevated p-5 sm:p-6">
              <h3 className="text-base font-bold text-white mb-3">Organizer</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl">
                  {contest.organizer.logo}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{contest.organizer.name}</p>
                  <a href={contest.organizer.website} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline">
                    Visit Official Site →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
