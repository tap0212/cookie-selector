FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy configuration files
COPY tsconfig.json ./

# Copy all TypeScript files and folders
COPY *.ts ./
COPY config ./config
COPY routes ./routes
COPY models ./models
COPY jobs ./jobs
COPY types ./types

EXPOSE 8080

CMD ["npm", "run", "dev"]
