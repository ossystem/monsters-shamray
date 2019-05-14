FROM node:8.16.0 as node

WORKDIR /var/www

COPY package.json package.json

RUN npm i -s

COPY . .

#RUN npm run build

CMD ["npm", "run", "start:production"]
