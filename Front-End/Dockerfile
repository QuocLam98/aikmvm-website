FROM oven/bun:latest AS build

WORKDIR /app

COPY . .

RUN bun i

RUN bun run build-only

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]