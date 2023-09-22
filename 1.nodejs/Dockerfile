# Use an official Node.js runtime as the base image
FROM node:latest

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application listens on (e.g., 3000)
EXPOSE 4000

# Define the command to start your Node.js application
CMD [ "npm", "start" ]
