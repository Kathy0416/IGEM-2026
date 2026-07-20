FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80

LABEL org.opencontainers.image.title="iGEM 2026 - Strength Over Time"
LABEL org.opencontainers.image.description="iGEM Wiki for the Strength Over Time project"
LABEL org.opencontainers.image.version="1.0.0"
