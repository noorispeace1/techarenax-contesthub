'use client';

import { useState } from 'react';
import Link from 'next/link';
import { contests } from '../../data/contests';

const userProfile = {
  name: 'Aryan Sharma',
  handle: '@aryansharma',
  avatar: '🦁',
  country: '🇮🇳 India',
  title: 'Competitive Programmer & Full-Stack Builder',
  bio: 'Solving algorithm challenges, crafting React apps, and participating in hackathons globally. Top 1% in TechArenaX GAC.',
  joinedDate: 'August 2024',
  globalRank: 1,
  rating: 2480,
  contestsJoined: 18,
  contestsWon: 12,
  badges: ['GAC Gold', 'AI Hackathon Champion', 'Problem Solver', 'Legendary Participant'],
  skills: ['Algorithms', 'Data Structures', 'TypeScript', 'Next.js', 'Python', 'PyTorch'],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'joined' | 'achievements' | 'about'>('joined');
  const joinedContests = contests.slice(0, 4);

  return (
    <div className="min-h-screen text-white">
      {/* Header / Profile Hero */}
      <div className="border-b border-[var(--border-base)] bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl shadow-xl flex-shrink-0">
                {userProfile.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-3xl font-extrabold text-white">{userProfile.name}</h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    Global #1
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-400 mt-0.5">{userProfile.handle} · {userProfile.country}</p>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">{userProfile.title}</p>
              </div>
            </div>

            <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all">
              Edit Profile
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="card p-3.5 sm:p-4 text-center">
              <p className="text-xs text-slate-400">Global Rank</p>
              <p className="text-lg sm:text-2xl font-extrabold text-amber-400">#{userProfile.globalRank}</p>
            </div>
            <div className="card p-3.5 sm:p-4 text-center">
              <p className="text-xs text-slate-400">Rating</p>
              <p className="text-lg sm:text-2xl font-extrabold text-indigo-400">{userProfile.rating}</p>
            </div>
            <div className="card p-3.5 sm:p-4 text-center">
              <p className="text-xs text-slate-400">Contests Joined</p>
              <p className="text-lg sm:text-2xl font-extrabold text-purple-400">{userProfile.contestsJoined}</p>
            </div>
            <div className="card p-3.5 sm:p-4 text-center">
              <p className="text-xs text-slate-400">Victories</p>
              <p className="text-lg sm:text-2xl font-extrabold text-emerald-400">{userProfile.contestsWon}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-white/5 pb-3 overflow-x-auto no-scrollbar mb-6">
          {(['joined', 'achievements', 'about'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'joined' ? 'Joined Contests' : tab}
            </button>
          ))}
        </div>

        {/* Tab contents */}
        {activeTab === 'joined' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {joinedContests.map((c) => (
              <Link key={c.id} href={`/contests/${c.id}`} className="card p-4 sm:p-5 hover:-translate-y-0.5 transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-xl">{c.organizer.logo}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                    {c.status}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-1">{c.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{c.description}</p>
                <div className="text-xs text-indigo-400 font-medium">View details →</div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProfile.badges.map((badge, idx) => (
              <div key={idx} className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-xl">
                  🥇
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{badge}</p>
                  <p className="text-xs text-slate-400">Awarded for top ranking</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="card p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Bio</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{userProfile.bio}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Skills & Focus</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
