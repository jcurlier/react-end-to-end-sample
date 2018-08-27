FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json semantic.json ./
COPY src/styles/semantic/src/theme.config src/styles/semantic/src/definitions ./src/styles/semantic/src/

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "build:start" ]
