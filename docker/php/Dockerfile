FROM php:8.3-fpm

# Evitar prompts interactivos
ENV DEBIAN_FRONTEND=noninteractive

# Dependencias base (SIN sqlite, porque usarás MongoDB)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        git \
        unzip \
        curl \
        libzip-dev \
    && docker-php-ext-install zip \
    && rm -rf /var/lib/apt/lists/*

# Node.js (NodeSource – requerido para Vite/React)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensión MongoDB
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www

# Permisos correctos para Laravel
RUN chown -R www-data:www-data /var/www

USER www-data
