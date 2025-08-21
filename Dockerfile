# ---------- Stage 1: deps ----------
FROM node:22-alpine AS deps
WORKDIR /app
# Compatibilidad glibc (sharp/ópticas de imágenes)
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci --include=dev

# ---------- Stage 2: build ----------
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Si usas variables de build (p.ej. NEXT_PUBLIC_API_URL), pásalas con --build-arg o ENV
RUN npm run build

# En el stage builder (después de npm run build):
RUN test -d .next/standalone || (echo "❌ Falta .next/standalone. ¿output:'standalone' en next.config.js?" && exit 1)

# ---------- Stage 3: runtime ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Usuario no-root
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copiamos el output standalone + estáticos
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Puerto
ENV PORT=3000
EXPOSE 3000
USER nextjs
CMD ["node", "server.js"]
