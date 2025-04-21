FROM node

RUN mkdir /home/app

WORKDIR /home/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm","run", "dev"]

