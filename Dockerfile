FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

FROM node:20-alpine AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ .

FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache tini
COPY --from=server-build /app/server ./server
COPY --from=client-build /app/client/dist ./server/public
EXPOSE 5000
ENV NODE_ENV=production
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server/index.js"]
