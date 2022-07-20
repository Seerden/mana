FROM node:alpine

WORKDIR /mana/backend

COPY package*.json .

RUN npm install
COPY . .

# RUN npm run build # don't need to build in development

EXPOSE 5000

ENV GIT_WORK_TREE=/mana/backend GIT_DIR=/mana/.git

CMD ["npm", "run", "start-dev"]