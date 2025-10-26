#!/bin/sh

# Exit on error
set -e

echo "🔄 Generating Prisma Client..."
pnpm --filter api-main exec prisma generate

echo "🔄 Running migrations..."
pnpm --filter api-main exec prisma migrate reset --force

echo "🚀 Starting application..."
pnpm --filter api-main run dev