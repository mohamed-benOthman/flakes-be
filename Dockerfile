FROM node:14.17-alpine as node

WORKDIR /flakes-be-directory
COPY package.json /flakes-be
RUN npm install

COPY . /flakes-be-directory
CMD [ "npm" , "start" ]

