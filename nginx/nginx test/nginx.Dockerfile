FROM nginx:alpine

COPY nginx/default.conf.template /etc/nginx/templates/
COPY nginx/nginx.conf /etc/nginx/