import Link from 'next/link';
import { contests } from '../data/contests';

const stats = [
  { label: 'Active Contests', value: '24+', icon: '🏆' },
  { label: 'Total Participants', value: '18K+', icon: '👥' },
  { label: 'Prize Pool', value: '$150K+', icon: '💰' },
  { label: 'Countries', value: '80+', icon: '🌍' },
];

const statusStyles: Record<string, string> = {
  Live: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Upcoming: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  Completed: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
};

export default function HomePage() {
  const featured = contests.filter((c) => c.featured);
  const upcoming = contests.filter((c) => c.status === 'Upcoming').slice(0, 3);
  const live = contests.filter((c) => c.status === 'Live');

  return (
    <div className="min-h-screen text-white">

      {/* ─── HERO BANNER ─── */}
      <section className="relative overflow-hidden pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-600/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-900/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Live badge */}
          {live.length > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8 animate-pulse">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
              {live.length} Contest{live.length > 1 ? 's' : ''} Live Now
            </div>
          )}

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              Compete.
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-200 bg-clip-text text-transparent">
              Win.
            </span>{' '}
            <span className="bg-gradient-to-r from-indigo-200 via-white to-indigo-300 bg-clip-text text-transparent">
              Rise.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join the world's premier tech contest hub. Tackle real-world challenges in AI, algorithms,
            cybersecurity, and more — and claim your place on the global leaderboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contests"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              🏁 Browse Contests
            </Link>
            <Link
              href="/leaderboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/30 text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
            >
              🥇 View Leaderboard
            </Link>
          </div>

          {/* Floating contest preview cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {live.slice(0, 1).concat(upcoming.slice(0, 2)).map((c) => (
              <Link
                key={c.id}
                href={`/contests/${c.id}`}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/30 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mb-3 ${statusStyles[c.status]}`}>
                  {c.status === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse inline-block" />}
                  {c.status}
                </div>
                <p className="text-sm font-semibold text-white line-clamp-2 mb-1 group-hover:text-indigo-300 transition-colors">{c.title}</p>
                <p className="text-xs text-slate-400">{c.category} · {c.difficulty}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-[var(--border-base)] py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-sm text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED CONTESTS ─── */}
      <section className="section-base py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Contests</h2>
              <p className="text-slate-400 mt-1 text-sm">Hand-picked competitions worth your time</p>
            </div>
            <Link href="/contests" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((c) => (
              <Link
                key={c.id}
                href={`/contests/${c.id}`}
                className="card group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                {/* Card gradient top */}
                <div className={`h-2 w-full bg-gradient-to-r ${c.imageColor}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{c.organizer.logo}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[c.status]}`}>
                      {c.status === 'Live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse" />}
                      {c.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">{c.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-4">
                    <span>👥 {c.participants.toLocaleString()} joined</span>
                    <span className="font-semibold text-amber-400">
                      💰 ${Math.max(...c.prizes.map(p => p.amount)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {c.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ─── */}
      <section className="border-y border-[var(--border-base)] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
              <p className="text-slate-400 mt-1 text-sm">Mark your calendar</p>
            </div>
            <Link href="/contests?status=Upcoming" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              See all →
            </Link>
          </div>
          <div className="space-y-4">
            {upcoming.map((c, i) => (
              <Link
                key={c.id}
                href={`/contests/${c.id}`}
                className="card group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${c.imageColor} flex items-center justify-center text-xl shadow-lg`}>
                  {c.organizer.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{c.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{c.difficulty}</span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{c.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Starts {new Date(c.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {' · '}Registration closes {new Date(c.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-bold text-amber-400 mb-1">
                    💰 ${Math.max(...c.prizes.map(p => p.amount)).toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">{c.participants.toLocaleString()} registered</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
          <div className="relative text-center px-8 py-16">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Ready to prove your skills?
            </h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of developers competing globally. Create your profile and jump into your first contest today — it's free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contests"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-bold text-base hover:bg-indigo-50 transition-all duration-200 shadow-xl hover:-translate-y-0.5"
              >
                🏁 Start Competing
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                👤 Create Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
