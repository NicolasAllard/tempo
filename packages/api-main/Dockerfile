FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root configs
COPY package.json pnpm-lock.yaml* ./

# Install pnpm and ALL dependencies from the root
RUN npm i -g pnpm && pnpm install

# Copy the entire monorepo source code
COPY . .

# Expose the port
EXPOSE 8000

# Copy and set permissions for the entrypoint script
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Use the entrypoint script
CMD ["./docker-entrypoint.sh"]