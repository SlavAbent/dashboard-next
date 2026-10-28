FROM node:24-alpine

WORKDIR /app

RUN corepack enable

ENV HUSKY=0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY frontend/package.json ./frontend/package.json
COPY packages ./packages

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
