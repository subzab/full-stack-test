FROM node:14.0.0

WORKDIR /app


COPY package*.json ./

COPY tsconfig.json ./

COPY src /app/src

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "node", "./build/index.js" ]