# This build stage extracts dependencies and devDependencies from package.json ...
# ... so that version in package.json doesn't mess up layer caching
FROM endeveit/docker-jq AS deps

COPY package.json /tmp

RUN jq '{ dependencies, devDependencies, scripts }' < /tmp/package.json > /tmp/deps.json

FROM node:12.16-alpine

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 3000

# install bash in alpine
RUN apk add --no-cache bash

RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
WORKDIR /usr/src/app

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER node

# Copy package json without version from previous build stage
COPY --from=deps /tmp/deps.json ./package.json
COPY yarn.lock ./

# Don't create lockfile using --frozen-lockfile
RUN yarn install --frozen-lockfile

COPY . .

ENTRYPOINT ["bash", "docker-entrypoint.sh"]

CMD [ "node", "src/index.js" ]