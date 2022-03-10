FROM php:8.0-fpm

RUN apt update \
    && apt install -y zlib1g-dev g++ git zsh libicu-dev zip libzip-dev zip \
    && docker-php-ext-install intl opcache pdo pdo_mysql \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

WORKDIR /var/www/symfony_docker

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony/bin/symfony /usr/local/bin/symfony
RUN git config --global user.email "you@example.com" \ 
    && git config --global user.name "Your Name"

RUN touch /usr/local/etc/php/conf.d/uploads.ini \
    && echo "upload_max_filesize = 500M;" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 500M;" >> /usr/local/etc/php/conf.d/uploads.ini

# COPY php.ini /usr/local/etc/php/
ENV upload_max_filesize=500M
ENV post_max_size=500M

COPY composer.json .

RUN composer install

COPY . .

# CMD bash -c "composer install"