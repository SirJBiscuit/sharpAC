FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY client/package*.json ./client/
RUN cd client && npm ci

COPY . .
RUN cd client && npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/client/dist ./client/dist
COPY server ./server

ENV NODE_ENV=production
ENV PORT=5004

EXPOSE 5004

CMD ["node", "server/index.js"]
