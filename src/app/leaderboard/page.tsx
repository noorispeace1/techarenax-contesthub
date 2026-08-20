'use client';

import { useState } from 'react';
import { leaderboard, LeaderboardEntry } from '../../data/leaderboard';

const badgeColors: Record<string, string> = {
  Legend: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  Expert: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  Master: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  Intermediate: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  Beginner: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
};

export default function LeaderboardPage() {
  const [search, setSearch] = useState('');
  const [filterBadge, setFilterBadge] = useState<string>('All');

  const filtered = leaderboard.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesBadge = filterBadge === 'All' || user.badge === filterBadge;
    return matchesSearch && matchesBadge;
  });

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="border-b border-[var(--border-base)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Global Leaderboard</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Rankings updated live based on contest performance</p>

          {/* Filters */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search participant..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 text-white placeholder-slate-400 text-sm outline-none"
            />
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {['All', 'Legend', 'Expert', 'Master', 'Intermediate'].map((badge) => (
                <button
                  key={badge}
                  onClick={() => setFilterBadge(badge)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    filterBadge === badge
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="card overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-white/5">
                <tr>
                  <th className="py-4 px-6">Rank</th>
                  <th className="py-4 px-6">Participant</th>
                  <th className="py-4 px-6">Badge</th>
                  <th className="py-4 px-6 text-center">Contests</th>
                  <th className="py-4 px-6 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((user) => (
                  <tr key={user.userId} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-bold">
                      {user.rank === 1 ? '🥇 #1' : user.rank === 2 ? '🥈 #2' : user.rank === 3 ? '🥉 #3' : `#${user.rank}`}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{user.avatar}</span>
                        <div>
                          <p className="font-bold text-white flex items-center gap-1.5">
                            <span>{user.name}</span>
                            <span className="text-xs">{user.country}</span>
                          </p>
                          <p className="text-xs text-slate-400">{user.contestsWon} Contests Won</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[user.badge]}`}>
                        {user.badge}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-medium text-slate-300">
                      {user.contestsEntered}
                    </td>
                    <td className="py-4 px-6 text-right font-extrabold text-amber-400 text-base">
                      {user.score.toLocaleString()} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="block md:hidden divide-y divide-white/5">
            {filtered.map((user) => (
              <div key={user.userId} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-extrabold text-indigo-400 text-sm w-7 flex-shrink-0">
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                  </span>
                  <span className="text-2xl flex-shrink-0">{user.avatar}</span>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm truncate flex items-center gap-1">
                      <span>{user.name}</span>
                      <span className="text-xs">{user.country}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[user.badge]}`}>
                        {user.badge}
                      </span>
                      <span className="text-[11px] text-slate-400">{user.contestsWon} won</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-extrabold text-amber-400 text-sm">{user.score.toLocaleString()} pts</p>
                  <p className="text-[10px] text-slate-400">{user.contestsEntered} joined</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
