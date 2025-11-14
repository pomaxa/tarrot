#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Cyberpunk Tarot Cards - PM2 Setup${NC}"
echo -e "${GREEN}========================================${NC}\n"

# Проверка Node.js
echo -e "${YELLOW}[1/6] Проверка Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js не установлен. Установите Node.js и запустите скрипт снова.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js установлен: $(node -v)${NC}\n"

# Проверка npm
echo -e "${YELLOW}[2/6] Проверка npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm не установлен.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm установлен: $(npm -v)${NC}\n"

# Установка PM2
echo -e "${YELLOW}[3/6] Проверка и установка PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo "PM2 не установлен. Устанавливаем глобально..."
    npm install -g pm2
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Ошибка установки PM2. Попробуйте: sudo npm install -g pm2${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ PM2 установлен${NC}"
else
    echo -e "${GREEN}✓ PM2 уже установлен: $(pm2 -v)${NC}"
fi
echo ""

# Установка serve
echo -e "${YELLOW}[4/6] Установка serve...${NC}"
npm install --save serve
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Ошибка установки serve${NC}"
    exit 1
fi
echo -e "${GREEN}✓ serve установлен${NC}\n"

# Создание ecosystem.config.js
echo -e "${YELLOW}[5/6] Создание конфигурации PM2...${NC}"
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'cyberpunk-tarot',
    script: 'npx',
    args: 'serve build -l 4444',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF
echo -e "${GREEN}✓ ecosystem.config.js создан${NC}\n"

# Обновление package.json со скриптами
echo -e "${YELLOW}[6/6] Обновление package.json...${NC}"
node << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

packageJson.scripts = {
  ...packageJson.scripts,
  start: 'serve build -l 4444',
  'pm2:start': 'pm2 start ecosystem.config.js',
  'pm2:stop': 'pm2 stop cyberpunk-tarot',
  'pm2:restart': 'pm2 restart cyberpunk-tarot',
  'pm2:delete': 'pm2 delete cyberpunk-tarot',
  'pm2:logs': 'pm2 logs cyberpunk-tarot',
  'pm2:status': 'pm2 status'
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✓ package.json обновлен');
EOF
echo ""

# Создание директории для логов
mkdir -p logs

# Сборка проекта
echo -e "${YELLOW}Сборка production build...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Ошибка сборки проекта${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Production build создан${NC}\n"

# Остановка старого процесса PM2 (если есть)
echo -e "${YELLOW}Проверка существующих PM2 процессов...${NC}"
pm2 stop cyberpunk-tarot 2>/dev/null
pm2 delete cyberpunk-tarot 2>/dev/null
echo ""

# Запуск через PM2
echo -e "${YELLOW}Запуск приложения через PM2...${NC}"
pm2 start ecosystem.config.js
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Ошибка запуска PM2${NC}"
    exit 1
fi
echo ""

# Сохранение конфигурации PM2
echo -e "${YELLOW}Сохранение конфигурации PM2...${NC}"
pm2 save
echo ""

# Настройка автозапуска при старте системы
echo -e "${YELLOW}Настройка автозапуска при старте системы...${NC}"
pm2 startup
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✓ Установка завершена!${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "Приложение запущено на: ${GREEN}http://localhost:4444${NC}\n"

echo -e "Полезные команды:"
echo -e "  ${YELLOW}npm run pm2:status${NC}   - Статус PM2"
echo -e "  ${YELLOW}npm run pm2:logs${NC}     - Просмотр логов"
echo -e "  ${YELLOW}npm run pm2:restart${NC}  - Перезапуск"
echo -e "  ${YELLOW}npm run pm2:stop${NC}     - Остановка"
echo -e "  ${YELLOW}npm run pm2:delete${NC}   - Удаление из PM2\n"

echo -e "Текущий статус:"
pm2 status
