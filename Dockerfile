FROM node:8.7.0-alpine

WORKDIR /app

ADD . /app
RUN npm install

CMD npm start