FROM node:lts-alpine

WORKDIR /backend/app.js

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]