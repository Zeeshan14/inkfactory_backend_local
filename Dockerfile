# Use the official Node.js 16 image as a base
FROM node:16

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application source code and other necessary directories into the working directory inside the container
COPY ./src ./src
COPY ./bin ./bin
COPY ./uploads ./uploads

# Expose port 5000 to make the app accessible from outside the container
EXPOSE 5000

# Command to start the application
CMD ["node", "src/app.js"]
