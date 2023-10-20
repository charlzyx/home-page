FROM oven/bun:latest AS base

FROM base AS builder
WORKDIR /app
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

ENV API_URL http://localhost:3000

ENV NEXT_PUBLIC_ONEDRIVE_CLIENT_ID 23020e85-55d0-49bc-bb27-9620d91892ba
ENV NEXT_PUBLIC_ONEDRIVE_CLIENT_SECRET e4f8Q~pMXjRLkiZfrjFq4Ry0QCOFg4sg4HyOBbcj

RUN bun install && bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

ENV NEXT_PUBLIC_HOME_TWITTER https://twitter.com/nextjs
ENV NEXT_PUBLIC_HOME_BLOG https://nextjs.org/blog

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1


ENV TZ=Asia/Shanghai

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY ./conf/services.json ./conf/services.json

EXPOSE 3000
VOLUME [ "/app/conf" ]

CMD ["bun", "run", "server.js"]
