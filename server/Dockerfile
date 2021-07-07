FROM node:14.14.0-alpine
WORKDIR "/app"
COPY package.json ./
RUN yarn install
ENV NODE_ENV=production
COPY . .
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]