# Use a compatible Node.js image
FROM node:21-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Expose Strapi’s default port
EXPOSE 1337

# Run Strapi
CMD ["pnpm", "develop"]
