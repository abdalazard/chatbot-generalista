# Imagem base com PHP 7.4 e Apache
FROM php:7.4-apache

# Instala extensões necessárias
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install curl zip pdo pdo_mysql

# Instala o cliente MySQL
RUN apt-get install -y mysql-client

# Copia os arquivos do projeto
COPY . /var/www/html

# Define o diretório de trabalho
WORKDIR /var/www/html

# Expõe a porta 80 para acesso externo
EXPOSE 80

# Comando para iniciar o servidor Apache
CMD ["apache2-foreground"]