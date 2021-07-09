FROM node:14.14.0-alpine as base
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .


FROM base as builder
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /app ./
RUN yarn run build


FROM node:14.14.0-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /build/package*.json ./
COPY --from=builder /build ./
CMD ["yarn", "run", "start"]