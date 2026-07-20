# -----------------------
# Builder
# -----------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy dependency files (and workspace file if you use one)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

# Auto-approve build scripts for headless environment, then install
RUN pnpm approve-builds --all && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Generate Prisma Client
RUN pnpm db:generate

# Build TypeScript
RUN pnpm build

# Remove dev dependencies (Prisma needs to stay for runtime engine binaries)
RUN pnpm prune --prod

# -----------------------
# Runtime
# -----------------------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "dist/src/index.js"]
