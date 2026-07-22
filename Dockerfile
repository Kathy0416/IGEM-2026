FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:1.27-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/teamname

EXPOSE 80

LABEL org.opencontainers.image.title="iGEM 2026 - Strength Over Time"
LABEL org.opencontainers.image.description="Local preview of the iGEM React/Vite wiki"
LABEL org.opencontainers.image.version="2.0.0-migration"
