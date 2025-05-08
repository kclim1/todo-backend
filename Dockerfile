# Use a lightweight Node.js image
FROM node:24.0.0-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --production

# Install nodemon globally for development
RUN npm install -g nodemon

# Copy the app source code
COPY src/ src/

# Expose the port
EXPOSE ${PORT}

# Start the app
CMD ["npx", "nodemon", "src/app.js"]
