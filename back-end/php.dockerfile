# استخدام صورة PHP
FROM php:8.2-fpm

# تثبيت الحزم المطلوبة
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# إعداد البيئة
RUN echo "display_errors=On" >> /usr/local/etc/php/conf.d/error_display.ini && \
    echo "display_startup_errors=On" >> /usr/local/etc/php/conf.d/error_display.ini && \
    echo "error_reporting=E_ALL" >> /usr/local/etc/php/conf.d/error_display.ini

# تحديد المجلد العامل
WORKDIR /var/www/html
