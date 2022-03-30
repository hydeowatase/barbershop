FROM node

WORKDIR /app

COPY package*.json ./
COPY dist ./dist
COPY ormconfig.json ./ormconfig.json

RUN yarn config set "strict-ssl" false -g
RUN yarn add reflect-metadata rxjs
# RUN yarn typeorm migration:run

EXPOSE 3333

CMD ["yarn", "start:docker"]
