FROM node:current-alpine

WORKDIR /usr/src/app2

COPY package*.json ./
COPY ./app2 ./

CMD [ "node", "src/index.js"]