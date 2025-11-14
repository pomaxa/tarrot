import { useState } from 'react';
import { TarotDeck } from './components/TarotDeck';
import { TarotReading } from './components/TarotReading';
import { Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'deck' | 'reading'>('deck');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Cyber grid background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00ffff 1px, transparent 1px),
            linear-gradient(to bottom, #00ffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 py-4 sm:py-6 border-b border-cyan-500/30 backdrop-blur-sm">
          <h1 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2 text-3xl sm:text-4xl md:text-5xl font-bold">
            CYBER TAROT
          </h1>
          <p className="text-center text-cyan-300/70 text-xs sm:text-sm">
            キ サ イ バ ー タ ロ ッ ト
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex gap-2 p-3 sm:p-4 sticky top-0 bg-slate-900/80 backdrop-blur-sm z-40 border-b border-cyan-500/20">
          <button
            onClick={() => setView('deck')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-2.5 rounded-lg transition-all text-base sm:text-sm ${
              view === 'deck'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-800/50 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="hidden xs:inline sm:inline">Колода</span>
          </button>
          <button
            onClick={() => setView('reading')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-2.5 rounded-lg transition-all text-base sm:text-sm ${
              view === 'reading'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-800/50 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="hidden xs:inline sm:inline">Гадание</span>
          </button>
        </nav>

        {/* Content */}
        <main className="px-3 sm:px-4 md:px-6 pb-16 sm:pb-20 pt-4">
          {view === 'deck' ? <TarotDeck /> : <TarotReading />}
        </main>
      </div>
    </div>
  );
}
