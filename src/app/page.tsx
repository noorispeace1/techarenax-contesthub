import Link from 'next/link';
import Image from 'next/image';
import { contests } from '../data/contests';
import HeroSlider from '../components/home/HeroSlider';

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

  return (
    <div className="min-h-screen text-white">

      {/* ─── HERO SLIDER BANNER ─── */}
      <HeroSlider />

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-[var(--border-base)] py-8 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-2">
              <div className="text-2xl sm:text-3xl mb-1">{s.icon}</div>
              <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED CONTESTS ─── */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Contests</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Hand-picked competitions worth your time</p>
            </div>
            <Link href="/contests" className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((c) => (
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
                    <h3 className="font-bold text-white text-base mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">{c.description}</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-3">
                      <span>👥 {c.participants.toLocaleString()} joined</span>
                      <span className="font-bold text-amber-400">
                        💰 ${Math.max(...c.prizes.map(p => p.amount)).toLocaleString()}
                      </span>
                    </div>
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
        </div>
      </section>

      {/* ─── UPCOMING EVENTS ─── */}
      <section className="border-y border-[var(--border-base)] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Upcoming Events</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Mark your calendar</p>
            </div>
            <Link href="/contests?status=Upcoming" className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              See all →
            </Link>
          </div>
          <div className="space-y-3.5 sm:space-y-4">
            {upcoming.map((c) => (
              <Link
                key={c.id}
                href={`/contests/${c.id}`}
                className="card group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 transition-all duration-300"
              >
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${c.imageColor} flex items-center justify-center text-lg sm:text-xl shadow-lg`}>
                    {c.organizer.logo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{c.category}</span>
                      <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{c.difficulty}</span>
                    </div>
                    <h3 className="font-semibold text-white text-sm sm:text-base group-hover:text-indigo-300 transition-colors line-clamp-1">{c.title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      Starts {new Date(c.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {' · '}Registration closes {new Date(c.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center sm:flex-col justify-between sm:justify-center w-full sm:w-auto text-left sm:text-right border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0 flex-shrink-0">
                  <div className="text-xs sm:text-sm font-bold text-amber-400">
                    💰 ${Math.max(...c.prizes.map(p => p.amount)).toLocaleString()}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400">{c.participants.toLocaleString()} registered</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute -top-10 -right-10 w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-white/5 blur-2xl" />
          <div className="relative text-center px-6 sm:px-8 py-12 sm:py-16">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚀</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              Ready to prove your skills?
            </h2>
            <p className="text-indigo-100 text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
              Join thousands of developers competing globally. Create your profile and jump into your first contest today — it's free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                href="/contests"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white text-indigo-700 font-bold text-sm sm:text-base hover:bg-indigo-50 transition-all duration-200 shadow-xl hover:-translate-y-0.5"
              >
                🏁 Start Competing
              </Link>
              <Link
                href="/profile"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5"
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
