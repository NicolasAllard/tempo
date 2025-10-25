FROM node:18-alpine

# Set up the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm i -g pnpm && pnpm install

# Copy the rest of the app's source code
COPY . .

# Expose Vite port and run
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]
