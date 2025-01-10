FROM oven/bun:1
WORKDIR /usr/src/app

COPY package.json bun.lockb .
RUN bun install --frozen-lockfile

COPY . .

ENTRYPOINT [ "bun", "test" ]