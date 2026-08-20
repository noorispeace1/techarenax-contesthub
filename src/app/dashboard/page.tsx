import Link from 'next/link';
import { contests } from '../../data/contests';

// Mock: current user's registered contest IDs
const registeredIds = ['1', '2', '5'];
const registeredContests = contests.filter((c) => registeredIds.includes(c.id));

const statusStyles: Record<string, string> = {
  Live: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Upcoming: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  Completed: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
};

const participationStatus: Record<string, { label: string; color: string }> = {
  '1': { label: 'Competing Now', color: 'text-green-400' },
  '2': { label: 'Registered', color: 'text-indigo-300' },
  '5': { label: 'Registered', color: 'text-indigo-300' },
};

const recentActivity = [
  { id: 1, icon: '🏆', text: 'You registered for Global Algorithm Championship 2026', time: '2 hours ago' },
  { id: 2, icon: '🤖', text: 'You registered for AI/ML Hackathon: Future Builders', time: '1 day ago' },
  { id: 3, icon: '📊', text: 'You registered for Data Science Bowl 2026', time: '3 days ago' },
  { id: 4, icon: '🥇', text: 'You finished Rank #42 in Cybersecurity CTF 2026', time: '1 week ago' },
  { id: 5, icon: '🎨', text: 'You submitted your project to UI/UX Design Sprint', time: '2 weeks ago' },
];

const stats = [
  { label: 'Contests Joined', value: '8', icon: '🏁', color: 'from-indigo-600 to-purple-600' },
  { label: 'Contests Won', value: '2', icon: '🥇', color: 'from-amber-500 to-orange-600' },
  { label: 'Current Rank', value: '#42', icon: '📈', color: 'from-cyan-600 to-blue-600' },
  { label: 'Total Score', value: '7,800', icon: '⭐', color: 'from-pink-600 to-rose-600' },
];

export default function DashboardPage() {
  const upcomingDeadlines = registeredContests
    .filter((c) => c.status === 'Upcoming')
    .sort((a, b) => new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime());

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="border-b border-[var(--border-base)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl shadow-lg flex-shrink-0">
              🦁
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">Welcome back, Aryan!</h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Here's your contest activity at a glance.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card relative p-4 sm:p-6 overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              <div className="relative">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-[11px] sm:text-xs text-slate-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Registered contests */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white">My Contests</h2>
              <Link href="/contests" className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Browse more →
              </Link>
            </div>

            {registeredContests.length === 0 ? (
              <div className="bg-slate-900/60 border border-white/8 rounded-2xl p-8 sm:p-10 text-center">
                <div className="text-4xl sm:text-5xl mb-3">🎯</div>
                <p className="text-slate-400 text-xs sm:text-sm mb-4">You haven't joined any contests yet.</p>
                <Link href="/contests" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors">
                  Find a Contest
                </Link>
              </div>
            ) : (
              registeredContests.map((c) => (
                <Link
                  key={c.id}
                  href={`/contests/${c.id}`}
                  className="card group flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 transition-all duration-300"
                >
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${c.imageColor} flex items-center justify-center text-lg sm:text-xl shadow-md`}>
                    {c.organizer.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${statusStyles[c.status]}`}>
                        {c.status === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />}
                        {c.status}
                      </span>
                      <span className={`text-[10px] sm:text-xs font-semibold ${participationStatus[c.id]?.color}`}>
                        {participationStatus[c.id]?.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm sm:text-base group-hover:text-indigo-300 transition-colors line-clamp-1">{c.title}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                      {c.status === 'Live'
                        ? `Ends ${new Date(c.endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} today`
                        : `Starts ${new Date(c.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      }
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs sm:text-sm font-bold text-amber-400 mb-1">💰 ${Math.max(...c.prizes.map(p => p.amount)).toLocaleString()}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500">{c.category}</div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Right sidebar: deadlines + activity */}
          <div className="space-y-6">
            {/* Upcoming deadlines */}
            <div className="card-elevated p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                ⏰ Upcoming Deadlines
              </h3>
              {upcomingDeadlines.length === 0 ? (
                <p className="text-xs text-slate-400">No upcoming deadlines.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingDeadlines.map((c) => (
                    <div key={c.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${c.imageColor} flex items-center justify-center text-sm flex-shrink-0`}>
                        {c.organizer.logo}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white truncate">{c.title}</p>
                        <p className="text-[11px] text-rose-400">
                          Reg. closes {new Date(c.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent activity */}
            <div className="card-elevated p-4 sm:p-5">
              <h3 className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                📋 Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.slice(0, 4).map((a) => (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <span className="text-sm sm:text-base mt-0.5 flex-shrink-0">{a.icon}</span>
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">{a.text}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
