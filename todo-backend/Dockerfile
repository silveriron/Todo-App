FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

ARG KAKAO_API_VALUE \
    JWT_SECRET_VALUE 

ENV KAKAO_CLIENT_ID=$KAKAO_API_VALUE \
    JWT_SECRET=$JWT_SECRET_VALUE

RUN npm run build

CMD [ "npm", "start" ]