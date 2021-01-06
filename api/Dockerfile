FROM node:14.0-alpine

WORKDIR /app


COPY package*.json ./

COPY tsconfig.json ./

COPY src /app/src

RUN npm install

RUN npm run build

EXPOSE 5000

CMD [ "node", "./build/index.js" ]