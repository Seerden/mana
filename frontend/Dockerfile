FROM node:alpine

WORKDIR /mana/frontend

COPY package*.json .

RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "serve"]