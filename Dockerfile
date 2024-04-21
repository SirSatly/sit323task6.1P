# Import node image
FROM node:16

# Create directory in docker for the app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into docker so it know what node modules to install
COPY package*.json ./

# Install required node modules into docker
RUN npm install

# Copy server.js into docker
COPY server.js .

# When the image is run ru nthe command npm start
CMD ["npm", "start"]