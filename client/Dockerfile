FROM node:alpine
WORKDIR '/app'
ENV NODE_ENV=production
COPY './package.json' .
RUN npm install
COPY . /app
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
