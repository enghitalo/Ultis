FROM node:current-alpine

WORKDIR /usr/src/app1

COPY package*.json ./
COPY ./app1 ./

CMD [ "node", "src/index.js"]