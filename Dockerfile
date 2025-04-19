FROM node 

RUN mkdir /home/app

COPY package.json /home/app

WORKDIR /home/app

RUN npm install

COPY . /home/app

CMD ["npm","run" ,"start"]