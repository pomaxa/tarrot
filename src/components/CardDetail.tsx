import { TarotCard } from '../types/tarot';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface CardDetailProps {
  card: TarotCard;
  isReversed: boolean;
  onClose: () => void;
}

export function CardDetail({ card, isReversed, onClose }: CardDetailProps) {
  const getSuitSymbol = (suit?: string) => {
    switch (suit) {
      case 'major':
        return '✦';
      case 'wands':
        return '⚡';
      case 'cups':
        return '💧';
      case 'swords':
        return '⚔';
      case 'pentacles':
        return '◈';
      default:
        return '✦';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 rounded-2xl border-2 border-cyan-400/30 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative p-6 bg-gradient-to-br ${card.gradient} border-b border-white/10`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-4">
            <div className="text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              {getSuitSymbol(card.suit)}
            </div>
            <div>
              <h2 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] mb-1">
                {card.nameRu}
              </h2>
              <div className="text-sm text-white/80 font-mono">{card.name}</div>
            </div>
          </div>

          {isReversed && (
            <div className="mt-4 px-3 py-1.5 bg-red-500/30 border border-red-400/50 rounded-full inline-block">
              <span className="text-xs text-red-200 font-mono">ПЕРЕВЕРНУТАЯ ↻</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Киберпанк тема */}
          <div>
            <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">CYBER THEME</div>
            <div className="text-white/90 bg-black/30 rounded-lg p-3 border border-cyan-400/20">
              {card.cyberpunkTheme}
            </div>
          </div>

          {/* Значение */}
          <div>
            <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
              {isReversed ? 'REVERSED MEANING' : 'UPRIGHT MEANING'}
            </div>
            <div className="text-white/90 bg-black/30 rounded-lg p-3 border border-purple-400/20">
              {isReversed ? card.reversed : card.meaning}
            </div>
          </div>

          {/* Ключевые слова */}
          <div>
            <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">KEYWORDS</div>
            <div className="flex flex-wrap gap-2">
              {card.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-white/90 text-sm font-mono"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Масть и номер */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 rounded-lg p-4 border border-cyan-400/20">
              <div className="text-xs text-cyan-400 font-mono mb-1">SUIT</div>
              <div className="text-white/90">{card.suit === 'major' ? 'Major Arcana' : card.suit}</div>
            </div>
            {card.number !== undefined && (
              <div className="bg-black/30 rounded-lg p-4 border border-pink-400/20">
                <div className="text-xs text-pink-400 font-mono mb-1">NUMBER</div>
                <div className="text-white/90">{card.number}</div>
              </div>
            )}
          </div>

          {/* Дополнительное значение */}
          <div>
            <div className="text-xs text-cyan-400 font-mono mb-2 tracking-widest">
              {isReversed ? 'UPRIGHT MEANING' : 'REVERSED MEANING'}
            </div>
            <div className="text-white/70 bg-black/20 rounded-lg p-3 border border-gray-600/20 text-sm">
              {isReversed ? card.meaning : card.reversed}
            </div>
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
