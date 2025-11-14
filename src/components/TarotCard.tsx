import { TarotCard as TarotCardType } from './tarot-data';

interface TarotCardProps {
  card: TarotCardType;
  onClick?: () => void;
  flipped?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function TarotCard({ card, onClick, flipped = false, size = 'medium' }: TarotCardProps) {
  const sizeClasses = {
    small: 'w-24 h-36',
    medium: 'w-32 h-48 md:w-36 md:h-54',
    large: 'w-40 h-60'
  };

  return (
    <div
      onClick={onClick}
      className={`${sizeClasses[size]} cursor-pointer perspective-1000 group`}
    >
      <div
        className={`relative w-full h-full transition-all duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="w-full h-full rounded-lg border-2 border-cyan-400/50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-1 shadow-lg shadow-cyan-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/70 transition-all">
            <div className="w-full h-full rounded border border-cyan-400/30 bg-slate-950/80 flex items-center justify-center relative overflow-hidden">
              {/* Animated circuit pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 10px, #00ffff 10px, #00ffff 11px),
                    repeating-linear-gradient(90deg, transparent, transparent 10px, #ff00ff 10px, #ff00ff 11px)
                  `
                }} />
              </div>
              
              {/* Center logo */}
              <div className="relative z-10">
                <div className="text-6xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
                  ◈
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 text-cyan-400 text-xs">▲</div>
              <div className="absolute top-2 right-2 text-pink-400 text-xs">▲</div>
              <div className="absolute bottom-2 left-2 text-purple-400 text-xs">▼</div>
              <div className="absolute bottom-2 right-2 text-cyan-400 text-xs">▼</div>
            </div>
          </div>
        </div>

        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className="w-full h-full rounded-lg border-2 p-1 shadow-lg group-hover:shadow-xl transition-all"
            style={{
              borderColor: card.colors.primary,
              boxShadow: `0 0 20px ${card.colors.primary}40`
            }}
          >
            <div className="w-full h-full rounded bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col relative overflow-hidden">
              {/* Top section with number/name */}
              <div className="p-2 border-b" style={{ borderColor: `${card.colors.primary}30` }}>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs opacity-80"
                    style={{ color: card.colors.accent }}
                  >
                    {card.type === 'major' ? `${card.number}` : card.symbol}
                  </span>
                  <span
                    className="text-xs opacity-80"
                    style={{ color: card.colors.accent }}
                  >
                    {card.type === 'major' ? '⬡' : card.symbol}
                  </span>
                </div>
              </div>

              {/* Main card area */}
              <div className="flex-1 flex items-center justify-center p-3 relative">
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-20 blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${card.colors.primary}, ${card.colors.secondary})`
                  }}
                />

                {/* Main symbol */}
                <div className="relative z-10 text-center">
                  <div
                    className="text-5xl mb-2"
                    style={{
                      color: card.colors.primary,
                      textShadow: `0 0 20px ${card.colors.primary}, 0 0 40px ${card.colors.secondary}`
                    }}
                  >
                    {card.symbol}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="flex gap-1 justify-center mb-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: card.colors.accent,
                          boxShadow: `0 0 4px ${card.colors.accent}`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Corner tech details */}
                <div className="absolute top-2 right-2 opacity-50">
                  <div className="w-4 h-4 border-t-2 border-r-2 rounded-tr" style={{ borderColor: card.colors.primary }} />
                </div>
                <div className="absolute bottom-2 left-2 opacity-50">
                  <div className="w-4 h-4 border-b-2 border-l-2 rounded-bl" style={{ borderColor: card.colors.primary }} />
                </div>
              </div>

              {/* Bottom section with name */}
              <div className="p-2 border-t" style={{ borderColor: `${card.colors.primary}30` }}>
                <div className="text-center">
                  <p
                    className="text-xs mb-0.5"
                    style={{
                      color: card.colors.primary,
                      textShadow: `0 0 10px ${card.colors.primary}80`
                    }}
                  >
                    {card.nameRu}
                  </p>
                  <p className="text-[8px] text-gray-400 uppercase tracking-wider">
                    {card.name}
                  </p>
                </div>
              </div>

              {/* Scan line effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
