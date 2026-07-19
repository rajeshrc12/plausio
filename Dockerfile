# ---------- Base ----------
FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable

# ---------- Pruner ----------
FROM base AS pruner

COPY . .

RUN pnpm dlx turbo prune upload-service --docker

# ---------- Builder ----------
FROM base AS builder

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN pnpm turbo run build --filter=upload-service

RUN pnpm deploy --legacy --filter=upload-service --prod /prod/upload-service
# ---------- Runtime ----------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /prod/upload-service .

EXPOSE 3000

CMD ["node", "dist/index.js"]