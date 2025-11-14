export interface TarotCard {
  id: number;
  name: string;
  nameRu: string;
  suit?: 'major' | 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  meaning: string;
  reversed: string;
  keywords: string[];
  cyberpunkTheme: string;
  color: string;
  gradient: string;
}

export const TAROT_CARDS: TarotCard[] = [
  // Старшие Арканы (Major Arcana)
  {
    id: 0,
    name: "The Fool",
    nameRu: "Дурак",
    suit: 'major',
    number: 0,
    meaning: "Новые начинания, невинность, спонтанность",
    reversed: "Безрассудство, риск, страх",
    keywords: ["начало", "свобода", "невинность"],
    cyberpunkTheme: "Хакер в начале пути",
    color: "#00ff41",
    gradient: "from-cyan-500 to-green-500"
  },
  {
    id: 1,
    name: "The Magician",
    nameRu: "Маг",
    suit: 'major',
    number: 1,
    meaning: "Мастерство, сила воли, проявление",
    reversed: "Манипуляция, иллюзии",
    keywords: ["мастерство", "сила", "действие"],
    cyberpunkTheme: "Мастер кода",
    color: "#ff00ff",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    name: "The High Priestess",
    nameRu: "Верховная Жрица",
    suit: 'major',
    number: 2,
    meaning: "Интуиция, тайны, подсознание",
    reversed: "Секреты, отрицание интуиции",
    keywords: ["интуиция", "тайна", "знание"],
    cyberpunkTheme: "AI Оракул",
    color: "#0ff",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "The Empress",
    nameRu: "Императрица",
    suit: 'major',
    number: 3,
    meaning: "Плодородие, изобилие, природа",
    reversed: "Зависимость, пустота",
    keywords: ["изобилие", "забота", "природа"],
    cyberpunkTheme: "Био-кибернетическая мать",
    color: "#ff1493",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 4,
    name: "The Emperor",
    nameRu: "Император",
    suit: 'major',
    number: 4,
    meaning: "Власть, структура, контроль",
    reversed: "Тирания, жестокость",
    keywords: ["власть", "порядок", "контроль"],
    cyberpunkTheme: "Корпоративный CEO",
    color: "#ff4500",
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 5,
    name: "The Hierophant",
    nameRu: "Иерофант",
    suit: 'major',
    number: 5,
    meaning: "Традиции, духовность, учитель",
    reversed: "Догма, ограничения",
    keywords: ["традиция", "учение", "вера"],
    cyberpunkTheme: "Системный архитектор",
    color: "#ffd700",
    gradient: "from-yellow-500 to-amber-500"
  },
  {
    id: 6,
    name: "The Lovers",
    nameRu: "Влюбленные",
    suit: 'major',
    number: 6,
    meaning: "Любовь, гармония, выбор",
    reversed: "Дисгармония, разделение",
    keywords: ["любовь", "союз", "выбор"],
    cyberpunkTheme: "Синхронизация душ",
    color: "#ff69b4",
    gradient: "from-rose-500 to-pink-500"
  },
  {
    id: 7,
    name: "The Chariot",
    nameRu: "Колесница",
    suit: 'major',
    number: 7,
    meaning: "Победа, контроль, решимость",
    reversed: "Отсутствие направления, агрессия",
    keywords: ["победа", "движение", "контроль"],
    cyberpunkTheme: "Боевой киберкар",
    color: "#00ffff",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 8,
    name: "Strength",
    nameRu: "Сила",
    suit: 'major',
    number: 8,
    meaning: "Храбрость, терпение, внутренняя сила",
    reversed: "Слабость, сомнение",
    keywords: ["сила", "храбрость", "терпение"],
    cyberpunkTheme: "Киборг-воин",
    color: "#ff6347",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 9,
    name: "The Hermit",
    nameRu: "Отшельник",
    suit: 'major',
    number: 9,
    meaning: "Уединение, поиск, внутренняя мудрость",
    reversed: "Изоляция, одиночество",
    keywords: ["уединение", "поиск", "мудрость"],
    cyberpunkTheme: "Одинокий нетраннер",
    color: "#9370db",
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    nameRu: "Колесо Фортуны",
    suit: 'major',
    number: 10,
    meaning: "Судьба, циклы, удача",
    reversed: "Невезение, сопротивление переменам",
    keywords: ["судьба", "удача", "перемены"],
    cyberpunkTheme: "Квантовый генератор",
    color: "#4169e1",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: 11,
    name: "Justice",
    nameRu: "Правосудие",
    suit: 'major',
    number: 11,
    meaning: "Справедливость, истина, закон",
    reversed: "Несправедливость, нечестность",
    keywords: ["справедливость", "истина", "баланс"],
    cyberpunkTheme: "AI Судья",
    color: "#1e90ff",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 12,
    name: "The Hanged Man",
    nameRu: "Повешенный",
    suit: 'major',
    number: 12,
    meaning: "Пауза, новая перспектива, жертва",
    reversed: "Застой, сопротивление",
    keywords: ["пауза", "жертва", "перспектива"],
    cyberpunkTheme: "Подвешенная анимация",
    color: "#20b2aa",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    id: 13,
    name: "Death",
    nameRu: "Смерть",
    suit: 'major',
    number: 13,
    meaning: "Трансформация, окончание, переход",
    reversed: "Сопротивление переменам, застой",
    keywords: ["трансформация", "конец", "начало"],
    cyberpunkTheme: "Перезагрузка системы",
    color: "#8b008b",
    gradient: "from-purple-600 to-black"
  },
  {
    id: 14,
    name: "Temperance",
    nameRu: "Умеренность",
    suit: 'major',
    number: 14,
    meaning: "Баланс, терпение, гармония",
    reversed: "Дисбаланс, излишество",
    keywords: ["баланс", "умеренность", "гармония"],
    cyberpunkTheme: "Био-синтез",
    color: "#00ced1",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    id: 15,
    name: "The Devil",
    nameRu: "Дьявол",
    suit: 'major',
    number: 15,
    meaning: "Зависимость, материализм, ограничения",
    reversed: "Освобождение, осознание",
    keywords: ["зависимость", "соблазн", "материя"],
    cyberpunkTheme: "Корпоративный контроль",
    color: "#dc143c",
    gradient: "from-red-600 to-black"
  },
  {
    id: 16,
    name: "The Tower",
    nameRu: "Башня",
    suit: 'major',
    number: 16,
    meaning: "Внезапные перемены, разрушение, откровение",
    reversed: "Избегание бедствия, страх перемен",
    keywords: ["разрушение", "перемены", "откровение"],
    cyberpunkTheme: "Системный сбой",
    color: "#ff0000",
    gradient: "from-red-600 to-orange-600"
  },
  {
    id: 17,
    name: "The Star",
    nameRu: "Звезда",
    suit: 'major',
    number: 17,
    meaning: "Надежда, вдохновение, духовность",
    reversed: "Отчаяние, отсутствие веры",
    keywords: ["надежда", "вдохновение", "исцеление"],
    cyberpunkTheme: "Квантовая звезда",
    color: "#87ceeb",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    id: 18,
    name: "The Moon",
    nameRu: "Луна",
    suit: 'major',
    number: 18,
    meaning: "Иллюзия, страх, подсознание",
    reversed: "Освобождение от страха, ясность",
    keywords: ["иллюзия", "интуиция", "тайна"],
    cyberpunkTheme: "Виртуальная реальность",
    color: "#9400d3",
    gradient: "from-purple-600 to-blue-600"
  },
  {
    id: 19,
    name: "The Sun",
    nameRu: "Солнце",
    suit: 'major',
    number: 19,
    meaning: "Радость, успех, позитивность",
    reversed: "Временное уныние, чрезмерный оптимизм",
    keywords: ["радость", "успех", "жизненность"],
    cyberpunkTheme: "Энергетическое ядро",
    color: "#ffa500",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    id: 20,
    name: "Judgement",
    nameRu: "Суд",
    suit: 'major',
    number: 20,
    meaning: "Возрождение, прощение, призвание",
    reversed: "Сомнение, самоосуждение",
    keywords: ["возрождение", "оценка", "прощение"],
    cyberpunkTheme: "Системная диагностика",
    color: "#ff1493",
    gradient: "from-pink-500 to-purple-500"
  },
  {
    id: 21,
    name: "The World",
    nameRu: "Мир",
    suit: 'major',
    number: 21,
    meaning: "Завершение, достижение, единство",
    reversed: "Незавершенность, отсутствие закрытия",
    keywords: ["завершение", "успех", "единство"],
    cyberpunkTheme: "Глобальная сеть",
    color: "#00ff00",
    gradient: "from-green-500 to-emerald-500"
  },

  // Жезлы (Wands) - Огонь, Энергия, Действие
  ...Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const names = ["Туз", "Двойка", "Тройка", "Четверка", "Пятерка", "Шестерка", "Семерка", "Восьмерка", "Девятка", "Десятка", "Паж", "Рыцарь", "Королева", "Король"];
    const cyberthemes = ["Импульс энергии", "Выбор путей", "Прогресс", "Стабильность", "Конфликт", "Победа", "Оборона", "Скорость", "Стойкость", "Бремя", "Энергичный посланник", "Импульсивный воин", "Страстная правительница", "Властный лидер"];
    return {
      id: 21 + i + 1,
      name: `${names[i]} of Wands`,
      nameRu: `${names[i]} Жезлов`,
      suit: 'wands' as const,
      number: num,
      meaning: "Энергия, страсть, творчество",
      reversed: "Импульсивность, агрессия",
      keywords: ["энергия", "действие", "страсть"],
      cyberpunkTheme: cyberthemes[i],
      color: "#ff4500",
      gradient: "from-red-500 to-yellow-500"
    };
  }),

  // Кубки (Cups) - Вода, Эмоции, Отношения
  ...Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const names = ["Туз", "Двойка", "Тройка", "Четверка", "Пятерка", "Шестерка", "Семерка", "Восьмерка", "Девятка", "Десятка", "Паж", "Рыцарь", "Королева", "Король"];
    const cyberthemes = ["Новые чувства", "Партнерство", "Праздник", "Апатия", "Утрата", "Ностальгия", "Иллюзия выбора", "Покидание", "Исполнение желаний", "Гармония", "Чувствительный посланник", "Романтичный мечтатель", "Эмпатичная правительница", "Эмоциональный мастер"];
    return {
      id: 35 + i + 1,
      name: `${names[i]} of Cups`,
      nameRu: `${names[i]} Кубков`,
      suit: 'cups' as const,
      number: num,
      meaning: "Эмоции, любовь, интуиция",
      reversed: "Эмоциональная нестабильность",
      keywords: ["чувства", "любовь", "отношения"],
      cyberpunkTheme: cyberthemes[i],
      color: "#00bfff",
      gradient: "from-blue-500 to-cyan-500"
    };
  }),

  // Мечи (Swords) - Воздух, Разум, Конфликт
  ...Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const names = ["Туз", "Двойка", "Тройка", "Четверка", "Пятерка", "Шестерка", "Семерка", "Восьмерка", "Девятка", "Десятка", "Паж", "Рыцарь", "Королева", "Король"];
    const cyberthemes = ["Ясность мысли", "Трудный выбор", "Сердечная боль", "Отдых", "Поражение", "Переход", "Обман", "Ограничение", "Тревога", "Конец цикла", "Бдительный наблюдатель", "Импульсивный мыслитель", "Проницательная правительница", "Интеллектуальный судья"];
    return {
      id: 49 + i + 1,
      name: `${names[i]} of Swords`,
      nameRu: `${names[i]} Мечей`,
      suit: 'swords' as const,
      number: num,
      meaning: "Разум, логика, конфликт",
      reversed: "Путаница, жестокость",
      keywords: ["разум", "истина", "конфликт"],
      cyberpunkTheme: cyberthemes[i],
      color: "#c0c0c0",
      gradient: "from-gray-400 to-blue-400"
    };
  }),

  // Пентакли (Pentacles) - Земля, Материя, Богатство
  ...Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const names = ["Туз", "Двойка", "Тройка", "Четверка", "Пятерка", "Шестерка", "Семерка", "Восьмерка", "Девятка", "Десятка", "Паж", "Рыцарь", "Королева", "Король"];
    const cyberthemes = ["Новая возможность", "Баланс ресурсов", "Командная работа", "Жадность", "Бедность", "Щедрость", "Терпение", "Мастерство", "Достаток", "Наследие", "Практичный ученик", "Надежный работник", "Заботливая правительница", "Успешный магнат"];
    return {
      id: 63 + i + 1,
      name: `${names[i]} of Pentacles`,
      nameRu: `${names[i]} Пентаклей`,
      suit: 'pentacles' as const,
      number: num,
      meaning: "Материя, финансы, работа",
      reversed: "Потери, жадность",
      keywords: ["богатство", "работа", "стабильность"],
      cyberpunkTheme: cyberthemes[i],
      color: "#ffd700",
      gradient: "from-yellow-500 to-green-500"
    };
  })
];
