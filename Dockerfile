# Using a Node.js image for the build phase
FROM node:19.0.0-alpine as build

# Define working directory
WORKDIR /usr/src/app

# Copy the files package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the application for production
RUN npm run build

# Use a Nginx image to serve built files
FROM nginx:alpine

# Copy build files from previous step
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]