FROM node:8.6-alpine

COPY . /site

WORKDIR /site

RUN rm -rf node_modules \
    && npm install \
    && npm run build

CMD ["npm", "run", "start"]