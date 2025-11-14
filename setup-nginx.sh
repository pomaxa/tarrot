#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOMAIN="tarrot.p4.lv"
EMAIL="admin@p4.lv"  # Измените на ваш email для Let's Encrypt

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Nginx Setup for $DOMAIN${NC}"
echo -e "${GREEN}========================================${NC}\n"

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}✗ Запустите скрипт с правами root: sudo ./setup-nginx.sh${NC}"
    exit 1
fi

echo -e "${YELLOW}[1/7] Проверка и установка nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    echo "Nginx не установлен. Устанавливаем..."
    apt-get update
    apt-get install -y nginx
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Ошибка установки nginx${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Nginx установлен${NC}"
else
    echo -e "${GREEN}✓ Nginx уже установлен: $(nginx -v 2>&1)${NC}"
fi
echo ""

echo -e "${YELLOW}[2/7] Проверка и установка certbot...${NC}"
if ! command -v certbot &> /dev/null; then
    echo "Certbot не установлен. Устанавливаем..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
    if [ $? -ne 0 ]; then
        echo -e "${RED}✗ Ошибка установки certbot${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Certbot установлен${NC}"
else
    echo -e "${GREEN}✓ Certbot уже установлен: $(certbot --version 2>&1 | head -n1)${NC}"
fi
echo ""

echo -e "${YELLOW}[3/7] Копирование конфигурации nginx...${NC}"
if [ ! -f "tarrot.p4.lv.conf" ]; then
    echo -e "${RED}✗ Файл tarrot.p4.lv.conf не найден${NC}"
    exit 1
fi

cp tarrot.p4.lv.conf /etc/nginx/sites-available/tarrot.p4.lv
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Ошибка копирования конфигурации${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Конфигурация скопирована в /etc/nginx/sites-available/${NC}"
echo ""

echo -e "${YELLOW}[4/7] Создание symlink...${NC}"
if [ -L /etc/nginx/sites-enabled/tarrot.p4.lv ]; then
    echo "Symlink уже существует, удаляем старый..."
    rm /etc/nginx/sites-enabled/tarrot.p4.lv
fi

ln -s /etc/nginx/sites-available/tarrot.p4.lv /etc/nginx/sites-enabled/
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Ошибка создания symlink${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Symlink создан${NC}"
echo ""

echo -e "${YELLOW}[5/7] Проверка конфигурации nginx...${NC}"
nginx -t
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Ошибка в конфигурации nginx${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Конфигурация nginx корректна${NC}"
echo ""

echo -e "${YELLOW}[6/7] Перезапуск nginx...${NC}"
systemctl restart nginx
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Ошибка перезапуска nginx${NC}"
    exit 1
fi

systemctl enable nginx
echo -e "${GREEN}✓ Nginx перезапущен и добавлен в автозагрузку${NC}"
echo ""

echo -e "${YELLOW}[7/7] Получение SSL сертификата от Let's Encrypt...${NC}"
echo -e "${YELLOW}ВАЖНО: Убедитесь, что домен $DOMAIN указывает на IP этого сервера!${NC}\n"

read -p "Продолжить получение SSL сертификата? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email $EMAIL
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠ Не удалось получить SSL сертификат. Возможные причины:${NC}"
        echo "  - Домен не указывает на этот сервер"
        echo "  - Порт 80 недоступен из интернета"
        echo "  - Проблемы с DNS"
        echo ""
        echo -e "${YELLOW}Сайт работает на HTTP: http://$DOMAIN${NC}"
        echo -e "${YELLOW}Вы можете попробовать получить сертификат позже командой:${NC}"
        echo -e "  ${GREEN}sudo certbot --nginx -d $DOMAIN${NC}"
    else
        echo -e "${GREEN}✓ SSL сертификат успешно получен и настроен${NC}"

        # Настройка автообновления сертификата
        systemctl enable certbot.timer
        systemctl start certbot.timer
        echo -e "${GREEN}✓ Автообновление сертификата настроено${NC}"
    fi
else
    echo -e "${YELLOW}Пропускаем получение SSL сертификата${NC}"
    echo -e "${YELLOW}Сайт работает на HTTP: http://$DOMAIN${NC}"
fi
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  ✓ Установка завершена!${NC}"
echo -e "${GREEN}========================================${NC}\n"

echo -e "Сайт должен быть доступен на:"
if certbot certificates 2>/dev/null | grep -q "$DOMAIN"; then
    echo -e "  ${GREEN}https://$DOMAIN${NC}"
else
    echo -e "  ${YELLOW}http://$DOMAIN${NC} (без SSL)"
fi
echo ""

echo -e "Полезные команды:"
echo -e "  ${YELLOW}sudo systemctl status nginx${NC}       - Статус nginx"
echo -e "  ${YELLOW}sudo systemctl restart nginx${NC}      - Перезапуск nginx"
echo -e "  ${YELLOW}sudo nginx -t${NC}                     - Проверка конфигурации"
echo -e "  ${YELLOW}sudo certbot renew${NC}                - Обновить SSL сертификат"
echo -e "  ${YELLOW}sudo certbot certificates${NC}         - Список сертификатов"
echo -e "  ${YELLOW}tail -f /var/log/nginx/tarrot.p4.lv.access.log${NC} - Логи доступа"
echo -e "  ${YELLOW}tail -f /var/log/nginx/tarrot.p4.lv.error.log${NC}  - Логи ошибок\n"

echo -e "Статус сервисов:"
systemctl status nginx --no-pager -l
