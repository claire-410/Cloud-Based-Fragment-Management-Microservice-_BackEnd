# Use an official Node.js runtime as the parent image
# Use multi-stage builds to reduce the final image size
FROM node:18 AS build

LABEL maintainer="Reziyemu Sulaiman <reziyemu.sulaiman@gmail.com>"
LABEL description="Fragments node.js microservice"

# Set environment variables
ENV PORT=8080 \
    NPM_CONFIG_LOGLEVEL=warn \
    NPM_CONFIG_COLOR=false

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application (if necessary)
RUN npm run build

# Use a smaller Node.js runtime for the final image
FROM node:18-slim

LABEL maintainer="Reziyemu Sulaiman <reziyemu.sulaiman@gmail.com>"
LABEL description="Fragments node.js microservice"

# Set environment variables
ENV PORT=8080 \
    NPM_CONFIG_LOGLEVEL=warn \
    NPM_CONFIG_COLOR=false

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app .

# Expose the port the service will run on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]

