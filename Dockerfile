# Use a lightweight Node.js image
FROM node:20-bookworm-slim

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy the app source code
COPY src/ src/

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "src/app.js"]
