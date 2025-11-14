import { useState } from 'react';
import { allCards } from './tarot-data';
import { TarotCard } from './TarotCard';
import { Shuffle, Sparkles } from 'lucide-react';

type SpreadType = 'one' | 'three' | 'celtic';

export function TarotReading() {
  const [spread, setSpread] = useState<SpreadType>('three');
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isReading, setIsReading] = useState(false);

  const spreadConfigs = {
    one: {
      name: 'Одна карта',
      nameEn: 'Single Card',
      count: 1,
      positions: ['Ответ']
    },
    three: {
      name: 'Три карты',
      nameEn: 'Three Cards',
      count: 3,
      positions: ['Прошлое', 'Настоящее', 'Будущее']
    },
    celtic: {
      name: 'Кельтский крест',
      nameEn: 'Celtic Cross',
      count: 10,
      positions: [
        'Настоящее',
        'Препятствие',
        'Основа',
        'Прошлое',
        'Цель',
        'Будущее',
        'Вы',
        'Окружение',
        'Надежды/Страхи',
        'Итог'
      ]
    }
  };

  const drawCards = () => {
    setIsReading(true);
    setSelectedCards([]);
    
    setTimeout(() => {
      const shuffled = [...allCards].sort(() => Math.random() - 0.5);
      const drawn = shuffled.slice(0, spreadConfigs[spread].count).map(c => c.id);
      setSelectedCards(drawn);
      setIsReading(false);
    }, 1500);
  };

  const resetReading = () => {
    setSelectedCards([]);
  };

  const config = spreadConfigs[spread];

  return (
    <div className="space-y-6">
      {/* Spread selection */}
      <div className="space-y-3">
        <h2 className="text-cyan-300 mb-3">Выберите расклад</h2>
        
        <div className="space-y-2">
          {(Object.keys(spreadConfigs) as SpreadType[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSpread(key);
                setSelectedCards([]);
              }}
              disabled={isReading}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                spread === key
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400'
                  : 'bg-slate-900/30 border-cyan-500/20 hover:border-cyan-400/50'
              } disabled:opacity-50`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300">{spreadConfigs[key].name}</p>
                  <p className="text-xs text-gray-400">{spreadConfigs[key].nameEn}</p>
                </div>
                <div className="text-cyan-400/70 text-sm">
                  {spreadConfigs[key].count} {spreadConfigs[key].count === 1 ? 'карта' : 'карт'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Draw button */}
      {selectedCards.length === 0 ? (
        <button
          onClick={drawCards}
          disabled={isReading}
          className="w-full py-4 sm:py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white text-base sm:text-sm shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isReading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>Перемешиваем карты...</span>
            </>
          ) : (
            <>
              <Shuffle className="w-5 h-5" />
              <span>Сделать расклад</span>
            </>
          )}
        </button>
      ) : (
        <button
          onClick={resetReading}
          className="w-full py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-300 text-base sm:text-sm hover:bg-slate-800/70 transition-all flex items-center justify-center gap-2"
        >
          <Shuffle className="w-5 h-5" />
          <span>Новый расклад</span>
        </button>
      )}

      {/* Cards display */}
      {selectedCards.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-cyan-300 mb-2">{config.name}</h3>
            <p className="text-sm text-gray-400">{config.nameEn}</p>
          </div>

          {spread === 'celtic' ? (
            // Celtic Cross layout - responsive
            <>
              {/* Desktop/Tablet Celtic Cross Grid */}
              <div className="hidden md:block relative min-h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)' }}>
                    {selectedCards.map((cardId, index) => {
                      const card = allCards.find(c => c.id === cardId);
                      if (!card) return null;

                      // Celtic Cross positions
                      const positions: Record<number, { gridColumn: string; gridRow: string }> = {
                        0: { gridColumn: '2', gridRow: '2' }, // Center
                        1: { gridColumn: '2', gridRow: '2' }, // Cross (overlapping)
                        2: { gridColumn: '2', gridRow: '3' }, // Below
                        3: { gridColumn: '1', gridRow: '2' }, // Left
                        4: { gridColumn: '2', gridRow: '1' }, // Above
                        5: { gridColumn: '3', gridRow: '2' }, // Right
                        6: { gridColumn: '4', gridRow: '4' }, // Bottom right
                        7: { gridColumn: '4', gridRow: '3' }, //
                        8: { gridColumn: '4', gridRow: '2' }, //
                        9: { gridColumn: '4', gridRow: '1' }, // Top right
                      };

                      return (
                        <div
                          key={cardId}
                          className="flex flex-col items-center gap-2"
                          style={positions[index]}
                        >
                          <TarotCard
                            card={card}
                            flipped={true}
                            size="small"
                          />
                          <p className="text-xs text-cyan-400/70 text-center">
                            {config.positions[index]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile Celtic Cross Linear */}
              <div className="md:hidden space-y-6">
                {selectedCards.map((cardId, index) => {
                  const card = allCards.find(c => c.id === cardId);
                  if (!card) return null;

                  return (
                    <div key={cardId} className="space-y-3">
                      <div className="text-center">
                        <p className="text-sm text-cyan-400/70 mb-3">
                          {config.positions[index]}
                        </p>
                        <div className="flex justify-center mb-3">
                          <TarotCard card={card} flipped={true} size="medium" />
                        </div>
                      </div>

                      <div className="bg-slate-900/30 border border-cyan-500/20 rounded-lg p-4 space-y-2">
                        <h4
                          className="text-lg"
                          style={{
                            color: card.colors.primary,
                            textShadow: `0 0 20px ${card.colors.primary}40`
                          }}
                        >
                          {card.nameRu}
                        </h4>
                        <p className="text-sm text-gray-400">{card.name}</p>
                        <p className="text-sm text-cyan-100/70 pt-2 border-t border-cyan-500/20">
                          {card.meaning}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {card.keywords.map((keyword, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-300"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            // Linear layouts (one or three cards)
            <div className="space-y-6">
              {selectedCards.map((cardId, index) => {
                const card = allCards.find(c => c.id === cardId);
                if (!card) return null;

                return (
                  <div key={cardId} className="space-y-3">
                    <div className="text-center">
                      <p className="text-sm text-cyan-400/70 mb-3">
                        {config.positions[index]}
                      </p>
                      <div className="flex justify-center mb-3">
                        <TarotCard card={card} flipped={true} size="medium" />
                      </div>
                    </div>

                    <div className="bg-slate-900/30 border border-cyan-500/20 rounded-lg p-4 space-y-2">
                      <h4
                        className="text-lg"
                        style={{
                          color: card.colors.primary,
                          textShadow: `0 0 20px ${card.colors.primary}40`
                        }}
                      >
                        {card.nameRu}
                      </h4>
                      <p className="text-sm text-gray-400">{card.name}</p>
                      <p className="text-sm text-cyan-100/70 pt-2 border-t border-cyan-500/20">
                        {card.meaning}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {card.keywords.map((keyword, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-300"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
