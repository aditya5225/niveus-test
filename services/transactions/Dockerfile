FROM node

WORKDIR /app/transactions

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["node", "index.js"]
