FROM oven/bun:latest AS build

WORKDIR /app

COPY . .

RUN bun i

RUN bun run build-only

FROM nginx:alpine AS production

COPY --from=build /app/dist /var/www/html

CMD ["nginx", "-g", "daemon off;"]