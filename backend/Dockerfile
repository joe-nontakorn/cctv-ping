FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY backend /app/backend

RUN npm run build

COPY frontend/build frontend/public

EXPOSE 3000

CMD ["npm", "start"]