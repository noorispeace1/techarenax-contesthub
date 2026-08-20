export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-white">
      {/* Animated logo mark */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping scale-150" />
        {/* Middle ring */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-pulse" />
        {/* Trophy icon container */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/40">
          <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H9v2h6v-2h-2v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <h2 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent mb-6">
        TechArenaX
      </h2>

      {/* Animated dots bar */}
      <div className="flex items-center gap-2 mb-4">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="inline-block w-2 h-2 rounded-full bg-indigo-500"
            style={{
              animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      <p className="text-sm text-slate-400 tracking-wide">Loading, please wait…</p>

      {/* Shimmer progress bar */}
      <div className="mt-8 w-48 h-1 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          style={{ animation: 'shimmer 1.5s ease-in-out infinite' }}
        />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
