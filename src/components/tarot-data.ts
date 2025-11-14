export interface TarotCard {
  id: string;
  name: string;
  nameRu: string;
  type: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  meaning: string;
  keywords: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  symbol: string;
}

export const majorArcana: TarotCard[] = [
  {
    id: 'major-0',
    name: 'The Fool',
    nameRu: 'Дурак',
    type: 'major',
    number: 0,
    meaning: 'Начало, спонтанность, вера в будущее',
    keywords: ['Новое начало', 'Приключение', 'Риск'],
    colors: { primary: '#00ffff', secondary: '#ff00ff', accent: '#ffff00' },
    symbol: '∞'
  },
  {
    id: 'major-1',
    name: 'The Magician',
    nameRu: 'Маг',
    type: 'major',
    number: 1,
    meaning: 'Мастерство, сила воли, проявление',
    keywords: ['Сила', 'Навыки', 'Концентрация'],
    colors: { primary: '#ff00ff', secondary: '#00ffff', accent: '#ff0080' },
    symbol: '∆'
  },
  {
    id: 'major-2',
    name: 'The High Priestess',
    nameRu: 'Верховная Жрица',
    type: 'major',
    number: 2,
    meaning: 'Интуиция, тайны, подсознание',
    keywords: ['Интуиция', 'Мудрость', 'Тайна'],
    colors: { primary: '#8000ff', secondary: '#00ffff', accent: '#c0c0ff' },
    symbol: '☽'
  },
  {
    id: 'major-3',
    name: 'The Empress',
    nameRu: 'Императрица',
    type: 'major',
    number: 3,
    meaning: 'Изобилие, природа, материнство',
    keywords: ['Плодородие', 'Изобилие', 'Красота'],
    colors: { primary: '#ff1493', secondary: '#00ff80', accent: '#ffd700' },
    symbol: '♀'
  },
  {
    id: 'major-4',
    name: 'The Emperor',
    nameRu: 'Император',
    type: 'major',
    number: 4,
    meaning: 'Структура, власть, отеческая фигура',
    keywords: ['Власть', 'Структура', 'Контроль'],
    colors: { primary: '#ff4500', secondary: '#ffd700', accent: '#ff0000' },
    symbol: '♂'
  },
  {
    id: 'major-5',
    name: 'The Hierophant',
    nameRu: 'Иерофант',
    type: 'major',
    number: 5,
    meaning: 'Традиция, духовная мудрость, учитель',
    keywords: ['Традиция', 'Образование', 'Вера'],
    colors: { primary: '#4169e1', secondary: '#ffd700', accent: '#ffffff' },
    symbol: '⚔'
  },
  {
    id: 'major-6',
    name: 'The Lovers',
    nameRu: 'Влюблённые',
    type: 'major',
    number: 6,
    meaning: 'Любовь, гармония, выбор',
    keywords: ['Любовь', 'Выбор', 'Единство'],
    colors: { primary: '#ff1493', secondary: '#ff69b4', accent: '#ff00ff' },
    symbol: '♡'
  },
  {
    id: 'major-7',
    name: 'The Chariot',
    nameRu: 'Колесница',
    type: 'major',
    number: 7,
    meaning: 'Победа, контроль, движение вперёд',
    keywords: ['Победа', 'Контроль', 'Решимость'],
    colors: { primary: '#00ffff', secondary: '#0080ff', accent: '#ffffff' },
    symbol: '⚡'
  },
  {
    id: 'major-8',
    name: 'Strength',
    nameRu: 'Сила',
    type: 'major',
    number: 8,
    meaning: 'Внутренняя сила, храбрость, терпение',
    keywords: ['Сила', 'Храбрость', 'Терпение'],
    colors: { primary: '#ff4500', secondary: '#ffd700', accent: '#ff6347' },
    symbol: '⚔'
  },
  {
    id: 'major-9',
    name: 'The Hermit',
    nameRu: 'Отшельник',
    type: 'major',
    number: 9,
    meaning: 'Самоанализ, одиночество, руководство',
    keywords: ['Самопознание', 'Уединение', 'Мудрость'],
    colors: { primary: '#6a5acd', secondary: '#c0c0c0', accent: '#ffffff' },
    symbol: '※'
  },
  {
    id: 'major-10',
    name: 'Wheel of Fortune',
    nameRu: 'Колесо Фортуны',
    type: 'major',
    number: 10,
    meaning: 'Судьба, циклы, поворотный момент',
    keywords: ['Судьба', 'Удача', 'Перемены'],
    colors: { primary: '#ffd700', secondary: '#ff00ff', accent: '#00ffff' },
    symbol: '◉'
  },
  {
    id: 'major-11',
    name: 'Justice',
    nameRu: 'Справедливость',
    type: 'major',
    number: 11,
    meaning: 'Справедливость, истина, баланс',
    keywords: ['Справедливость', 'Правда', 'Баланс'],
    colors: { primary: '#00bfff', secondary: '#ffd700', accent: '#ffffff' },
    symbol: '⚖'
  },
  {
    id: 'major-12',
    name: 'The Hanged Man',
    nameRu: 'Повешенный',
    type: 'major',
    number: 12,
    meaning: 'Отпускание, новая перспектива, жертва',
    keywords: ['Жертва', 'Перспектива', 'Отпускание'],
    colors: { primary: '#40e0d0', secondary: '#9370db', accent: '#00ffff' },
    symbol: '⊥'
  },
  {
    id: 'major-13',
    name: 'Death',
    nameRu: 'Смерть',
    type: 'major',
    number: 13,
    meaning: 'Конец, трансформация, переход',
    keywords: ['Трансформация', 'Конец', 'Переход'],
    colors: { primary: '#000000', secondary: '#8b00ff', accent: '#00ffff' },
    symbol: '☠'
  },
  {
    id: 'major-14',
    name: 'Temperance',
    nameRu: 'Умеренность',
    type: 'major',
    number: 14,
    meaning: 'Баланс, умеренность, терпение',
    keywords: ['Баланс', 'Гармония', 'Терпение'],
    colors: { primary: '#00ffff', secondary: '#ff69b4', accent: '#ffd700' },
    symbol: '∞'
  },
  {
    id: 'major-15',
    name: 'The Devil',
    nameRu: 'Дьявол',
    type: 'major',
    number: 15,
    meaning: 'Зависимость, искушение, ограничения',
    keywords: ['Искушение', 'Зависимость', 'Материализм'],
    colors: { primary: '#ff0000', secondary: '#000000', accent: '#ff4500' },
    symbol: '⛧'
  },
  {
    id: 'major-16',
    name: 'The Tower',
    nameRu: 'Башня',
    type: 'major',
    number: 16,
    meaning: 'Внезапные перемены, хаос, откровение',
    keywords: ['Разрушение', 'Хаос', 'Откровение'],
    colors: { primary: '#ff4500', secondary: '#ffff00', accent: '#ff0000' },
    symbol: '⚡'
  },
  {
    id: 'major-17',
    name: 'The Star',
    nameRu: 'Звезда',
    type: 'major',
    number: 17,
    meaning: 'Надежда, вдохновение, обновление',
    keywords: ['Надежда', '��дохновение', 'Исцеление'],
    colors: { primary: '#00ffff', secondary: '#ffffff', accent: '#c0c0ff' },
    symbol: '★'
  },
  {
    id: 'major-18',
    name: 'The Moon',
    nameRu: 'Луна',
    type: 'major',
    number: 18,
    meaning: 'Иллюзия, страх, подсознание',
    keywords: ['Иллюзия', 'Интуиция', 'Тайна'],
    colors: { primary: '#9370db', secondary: '#00ffff', accent: '#c0c0c0' },
    symbol: '☾'
  },
  {
    id: 'major-19',
    name: 'The Sun',
    nameRu: 'Солнце',
    type: 'major',
    number: 19,
    meaning: 'Радость, успех, позитив',
    keywords: ['Радость', 'Успех', 'Жизненная сила'],
    colors: { primary: '#ffd700', secondary: '#ff8c00', accent: '#ffff00' },
    symbol: '☼'
  },
  {
    id: 'major-20',
    name: 'Judgement',
    nameRu: 'Суд',
    type: 'major',
    number: 20,
    meaning: 'Возрождение, прощение, призыв',
    keywords: ['Возрождение', 'Прощение', 'Призвание'],
    colors: { primary: '#ff00ff', secondary: '#00ffff', accent: '#ffffff' },
    symbol: '⚖'
  },
  {
    id: 'major-21',
    name: 'The World',
    nameRu: 'Мир',
    type: 'major',
    number: 21,
    meaning: 'Завершение, достижение, интеграция',
    keywords: ['Завершение', 'Успех', 'Гармония'],
    colors: { primary: '#00ff00', secondary: '#00ffff', accent: '#ff00ff' },
    symbol: '◉'
  }
];

const suitColors = {
  wands: { primary: '#ff4500', secondary: '#ffd700', accent: '#ff6347' },
  cups: { primary: '#00bfff', secondary: '#40e0d0', accent: '#87ceeb' },
  swords: { primary: '#c0c0c0', secondary: '#00ffff', accent: '#ffffff' },
  pentacles: { primary: '#ffd700', secondary: '#00ff00', accent: '#ffff00' }
};

const suitSymbols = {
  wands: '|',
  cups: '◡',
  swords: '†',
  pentacles: '◇'
};

const courtCards = ['Page', 'Knight', 'Queen', 'King'];
const courtCardsRu = ['Паж', 'Рыцарь', 'Королева', 'Король'];

export const minorArcana: TarotCard[] = [];

(['wands', 'cups', 'swords', 'pentacles'] as const).forEach((suit) => {
  const suitNamesRu: Record<string, string> = {
    wands: 'Жезлов',
    cups: 'Кубков',
    swords: 'Мечей',
    pentacles: 'Пентаклей'
  };

  // Number cards 1-10 (Ace = 1)
  for (let i = 1; i <= 10; i++) {
    const name = i === 1 ? 'Ace' : String(i);
    const nameRu = i === 1 ? 'Туз' : String(i);
    
    minorArcana.push({
      id: `${suit}-${i}`,
      name: `${name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      nameRu: `${nameRu} ${suitNamesRu[suit]}`,
      type: 'minor',
      suit,
      number: i,
      meaning: `Значение карты ${i} ${suitNamesRu[suit]}`,
      keywords: ['Энергия', 'Действие', 'Рост'],
      colors: suitColors[suit],
      symbol: suitSymbols[suit]
    });
  }

  // Court cards
  courtCards.forEach((court, index) => {
    minorArcana.push({
      id: `${suit}-${court.toLowerCase()}`,
      name: `${court} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
      nameRu: `${courtCardsRu[index]} ${suitNamesRu[suit]}`,
      type: 'minor',
      suit,
      number: 11 + index,
      meaning: `Значение карты ${court} ${suitNamesRu[suit]}`,
      keywords: ['Личность', 'Влияние', 'Действие'],
      colors: suitColors[suit],
      symbol: suitSymbols[suit]
    });
  });
});

export const allCards = [...majorArcana, ...minorArcana];
