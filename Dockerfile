FROM node:19.4-bullseye AS build

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/app/.npm \
  npm set cache /app/.npm && \
  npm install

COPY . .

RUN npm run build

EXPOSE 443

CMD ["npm", "run", "start:prod"]
