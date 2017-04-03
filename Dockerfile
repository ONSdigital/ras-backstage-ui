FROM node

RUN npm install -g gulp

WORKDIR /app

COPY . .

RUN npm install

RUN gulp prod

CMD ["gulp", "server:prod"]
