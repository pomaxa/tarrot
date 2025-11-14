import { useState } from 'react';
import { allCards } from './tarot-data';
import { TarotCard } from './TarotCard';
import { Search, Filter } from 'lucide-react';

export function TarotDeck() {
  const [filter, setFilter] = useState<'all' | 'major' | 'minor'>('all');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = allCards.filter(card => {
    const matchesFilter = filter === 'all' || card.type === filter;
    const matchesSearch = card.nameRu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Поиск карты..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder:text-cyan-400/50 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-sm ${
              filter === 'all'
                ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 border border-cyan-400'
                : 'bg-slate-900/30 text-cyan-400/70 border border-cyan-500/20'
            }`}
          >
            <Filter className="w-4 h-4" />
            Все ({allCards.length})
          </button>
          <button
            onClick={() => setFilter('major')}
            className={`flex-1 py-2 rounded-lg transition-all text-sm ${
              filter === 'major'
                ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 border border-purple-400'
                : 'bg-slate-900/30 text-cyan-400/70 border border-cyan-500/20'
            }`}
          >
            Старшие (22)
          </button>
          <button
            onClick={() => setFilter('minor')}
            className={`flex-1 py-2 rounded-lg transition-all text-sm ${
              filter === 'minor'
                ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400'
                : 'bg-slate-900/30 text-cyan-400/70 border border-cyan-500/20'
            }`}
          >
            Младшие (56)
          </button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredCards.map((card) => (
          <div key={card.id} className="flex justify-center">
            <TarotCard
              card={card}
              flipped={selectedCard === card.id}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              size="medium"
            />
          </div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-cyan-400/50">Карты не найдены</p>
        </div>
      )}

      {/* Card details modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border-t sm:border border-cyan-500/50 sm:rounded-lg p-6 max-w-md w-full h-full sm:h-auto overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const card = allCards.find(c => c.id === selectedCard);
              if (!card) return null;
              
              return (
                <div>
                  <div className="flex justify-center mb-4">
                    <TarotCard card={card} flipped={true} size="large" />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h2
                        className="text-xl mb-1"
                        style={{
                          color: card.colors.primary,
                          textShadow: `0 0 20px ${card.colors.primary}60`
                        }}
                      >
                        {card.nameRu}
                      </h2>
                      <p className="text-sm text-gray-400">{card.name}</p>
                    </div>

                    <div className="border-t border-cyan-500/30 pt-3">
                      <p className="text-sm text-cyan-100/80">{card.meaning}</p>
                    </div>

                    <div className="border-t border-cyan-500/30 pt-3">
                      <p className="text-xs text-cyan-400/70 mb-2">Ключевые слова:</p>
                      <div className="flex flex-wrap gap-2">
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

                    <button
                      onClick={() => setSelectedCard(null)}
                      className="w-full mt-4 py-3 sm:py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 rounded-lg text-cyan-300 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all text-base sm:text-sm"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
