# ARG WEBROOT=/var/www/html/public
# FROM devilbox/php-fpm-8.1
# RUN curl -o /usr/sbin/supercronic https://github.com/aptible/supercronic/releases/download/v0.2.25/supercronic-linux-amd64 && chmod 755 /usr/sbin/supercronic
# COPY crontab crontab
ARG WEBROOT=/var/www/html/public
FROM richarvey/nginx-php-fpm:3.1.4
RUN curl -o /usr/sbin/supercronic https://github.com/aptible/supercronic/releases/download/v0.2.25/supercronic-linux-amd64 && chmod 755 /usr/sbin/supercronic
RUN rm index.php
RUN mkdir api
COPY api /var/www/html/api
COPY public /var/www/html