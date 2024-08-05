# Use an official Node.js 19 base image
FROM node:19

# Define working directory
WORKDIR /usr/src/app

# Copy the files package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the application for production
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ARG REACT_APP_CLOUDINARY_CLOUD_NAME
ENV REACT_APP_CLOUDINARY_CLOUD_NAME=$REACT_APP_CLOUDINARY_CLOUD_NAME
ARG REACT_APP_CLOUDINARY_API_KEY
ENV REACT_APP_CLOUDINARY_API_KEY=$REACT_APP_CLOUDINARY_API_KEY

RUN npm run build

# Install 'serve' to serve the application
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start application
CMD ["serve", "-s", "build"]