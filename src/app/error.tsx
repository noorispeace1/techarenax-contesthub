'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-white px-4 relative">
      {/* Glowing error icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping scale-150" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-red-700 shadow-2xl shadow-rose-500/30">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-white mb-3 text-center">
        Something went wrong
      </h1>
      <p className="text-slate-400 text-base mb-2 text-center max-w-md">
        An unexpected error occurred. Our team has been notified.
      </p>
      {error?.digest && (
        <p className="text-xs text-slate-600 mb-8 font-mono">Error ID: {error.digest}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 hover:-translate-y-0.5"
        >
          🔄 Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
        >
          🏠 Go Home
        </Link>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-rose-600/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>
    </div>
  );
}

