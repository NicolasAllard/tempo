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

# This CMD runs at RUNTIME, after .env variables are loaded
# 1. We run prisma generate *for api-main*
# 2. We then run the dev script *for api-main*
CMD ["sh", "-c", "pnpm --filter api-main exec prisma generate && pnpm --filter api-main run dev"]