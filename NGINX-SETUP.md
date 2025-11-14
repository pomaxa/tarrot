# Nginx Setup для Cyberpunk Tarot Cards

Этот документ описывает настройку nginx для домена **tarrot.p4.lv** с SSL сертификатом от Let's Encrypt.

## Предварительные требования

1. **Сервер**: Ubuntu/Debian с правами root
2. **Домен**: tarrot.p4.lv должен указывать на IP сервера (A-запись в DNS)
3. **Порты**: Открыты порты 80 (HTTP) и 443 (HTTPS)
4. **PM2**: Приложение запущено на localhost:4444

## Быстрая установка

### Автоматическая установка (рекомендуется)

```bash
# Скопируйте файлы на сервер
scp tarrot.p4.lv.conf setup-nginx.sh your-server:/path/to/project/

# Подключитесь к серверу
ssh your-server

# Перейдите в директорию проекта
cd /path/to/project/

# Запустите скрипт с правами root
sudo ./setup-nginx.sh
```

Скрипт автоматически:
- ✅ Установит nginx (если не установлен)
- ✅ Установит certbot для Let's Encrypt
- ✅ Скопирует конфигурацию nginx
- ✅ Активирует конфигурацию
- ✅ Получит и настроит SSL сертификат
- ✅ Настроит автообновление сертификата
- ✅ Запустит nginx

### Ручная установка

```bash
# 1. Установка nginx
sudo apt-get update
sudo apt-get install -y nginx

# 2. Установка certbot
sudo apt-get install -y certbot python3-certbot-nginx

# 3. Копирование конфигурации
sudo cp tarrot.p4.lv.conf /etc/nginx/sites-available/tarrot.p4.lv

# 4. Активация конфигурации
sudo ln -s /etc/nginx/sites-available/tarrot.p4.lv /etc/nginx/sites-enabled/

# 5. Проверка конфигурации
sudo nginx -t

# 6. Перезапуск nginx
sudo systemctl restart nginx

# 7. Получение SSL сертификата
sudo certbot --nginx -d tarrot.p4.lv
```

## Что настроено

### HTTP → HTTPS Редирект
Все HTTP запросы автоматически перенаправляются на HTTPS.

### Проксирование
Nginx проксирует запросы на PM2 приложение (localhost:4444).

### SSL/TLS
- Протоколы: TLSv1.2, TLSv1.3
- Современные шифры
- HTTP/2 поддержка

### Безопасность
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Защита от XSS
- HTTPS enforcement

### Оптимизация
- Gzip сжатие для текстовых файлов
- Кэширование статических файлов (1 год)
- Keep-alive соединения

### Логирование
- Access log: `/var/log/nginx/tarrot.p4.lv.access.log`
- Error log: `/var/log/nginx/tarrot.p4.lv.error.log`

## Управление

### Nginx

```bash
# Статус
sudo systemctl status nginx

# Запуск
sudo systemctl start nginx

# Остановка
sudo systemctl stop nginx

# Перезапуск
sudo systemctl restart nginx

# Перезагрузка конфигурации (без остановки)
sudo systemctl reload nginx

# Проверка конфигурации
sudo nginx -t

# Просмотр логов
sudo tail -f /var/log/nginx/tarrot.p4.lv.access.log
sudo tail -f /var/log/nginx/tarrot.p4.lv.error.log
```

### SSL Сертификаты

```bash
# Просмотр сертификатов
sudo certbot certificates

# Обновление сертификата вручную
sudo certbot renew

# Тестирование обновления (dry-run)
sudo certbot renew --dry-run

# Отзыв сертификата
sudo certbot revoke --cert-path /etc/letsencrypt/live/tarrot.p4.lv/cert.pem

# Удаление сертификата
sudo certbot delete --cert-name tarrot.p4.lv
```

### Автообновление сертификата

Certbot автоматически настраивает systemd timer для обновления:

```bash
# Проверка статуса автообновления
sudo systemctl status certbot.timer

# Просмотр расписания
sudo systemctl list-timers certbot.timer
```

Сертификат будет автоматически обновляться за 30 дней до истечения.

## Обновление конфигурации

После изменения `tarrot.p4.lv.conf`:

```bash
# 1. Скопируйте обновленную конфигурацию
sudo cp tarrot.p4.lv.conf /etc/nginx/sites-available/tarrot.p4.lv

# 2. Проверьте конфигурацию
sudo nginx -t

# 3. Перезагрузите nginx
sudo systemctl reload nginx
```

## Устранение проблем

### Сайт не доступен

1. Проверьте статус nginx:
```bash
sudo systemctl status nginx
```

2. Проверьте статус PM2:
```bash
pm2 status
```

3. Проверьте логи:
```bash
sudo tail -n 50 /var/log/nginx/tarrot.p4.lv.error.log
```

### SSL сертификат не получен

1. Проверьте DNS (должен указывать на ваш сервер):
```bash
dig tarrot.p4.lv
# или
nslookup tarrot.p4.lv
```

2. Проверьте доступность портов:
```bash
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443
```

3. Попробуйте получить сертификат в ручном режиме:
```bash
sudo certbot --nginx -d tarrot.p4.lv
```

### 502 Bad Gateway

Проблема с подключением к PM2:

1. Проверьте PM2:
```bash
pm2 status
pm2 logs cyberpunk-tarot
```

2. Проверьте порт:
```bash
curl http://localhost:4444
```

3. Перезапустите PM2:
```bash
pm2 restart cyberpunk-tarot
```

### Nginx не запускается

1. Проверьте синтаксис конфигурации:
```bash
sudo nginx -t
```

2. Проверьте логи:
```bash
sudo journalctl -u nginx -n 50
```

## Файрвол (UFW)

Если используете UFW, разрешите HTTP и HTTPS:

```bash
sudo ufw allow 'Nginx Full'
# или
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

## Мониторинг

### Просмотр активных соединений

```bash
sudo nginx -c /etc/nginx/nginx.conf -t
```

### Статистика запросов

```bash
# Топ 10 IP адресов
sudo awk '{print $1}' /var/log/nginx/tarrot.p4.lv.access.log | sort | uniq -c | sort -rn | head -10

# Топ 10 страниц
sudo awk '{print $7}' /var/log/nginx/tarrot.p4.lv.access.log | sort | uniq -c | sort -rn | head -10
```

## Производительность

### Тюнинг для высокой нагрузки

Отредактируйте `/etc/nginx/nginx.conf`:

```nginx
worker_processes auto;
worker_connections 2048;

http {
    keepalive_timeout 65;
    keepalive_requests 100;

    # Увеличение buffer sizes
    client_body_buffer_size 128k;
    client_max_body_size 10m;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 4k;
    output_buffers 1 32k;
    postpone_output 1460;
}
```

## Безопасность

### Блокировка IP

```bash
# Добавьте в конфигурацию
sudo nano /etc/nginx/sites-available/tarrot.p4.lv

# Внутри server блока:
deny 1.2.3.4;  # Заблокировать IP
allow all;
```

### Rate Limiting

Добавьте в `/etc/nginx/nginx.conf`:

```nginx
http {
    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
}
```

И в конфигурацию сайта:

```nginx
location / {
    limit_req zone=one burst=20;
    # ... остальная конфигурация
}
```

## Резервное копирование

Регулярно делайте бэкапы:

```bash
# Конфигурация nginx
sudo cp -r /etc/nginx/sites-available/ ~/nginx-backup-$(date +%Y%m%d)/

# SSL сертификаты
sudo cp -r /etc/letsencrypt/ ~/letsencrypt-backup-$(date +%Y%m%d)/
```
