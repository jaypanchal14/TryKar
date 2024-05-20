FROM node:20-alpine
WORKDIR /peerjs

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 9001

CMD ["node", "index.js"]