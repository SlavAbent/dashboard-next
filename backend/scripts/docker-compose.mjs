import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';

import nextEnv from '@next/env';

const { loadEnvConfig } = nextEnv;

export const parsePostgresUrl = (databaseUrl) => {
  let url;

  try {
    url = new URL(databaseUrl);
  } catch {
    throw new Error('DATABASE_URL must be a valid PostgreSQL URL');
  }

  if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
    throw new Error(
      'DATABASE_URL must use the postgres or postgresql protocol'
    );
  }

  const user = decodeURIComponent(url.username);
  const password = decodeURIComponent(url.password);
  const database = decodeURIComponent(url.pathname.replace(/^\//, ''));

  if (!user || !password || !database) {
    throw new Error(
      'DATABASE_URL must include user, password and database name'
    );
  }

  return { user, password, database };
};

const composeArguments = {
  start: ['compose', 'up', '-d', '--wait', '--wait-timeout', '60', 'postgres'],
  stop: ['compose', 'stop', 'postgres'],
  logs: ['compose', 'logs', '-f', 'postgres'],
};

const run = () => {
  loadEnvConfig(process.cwd());

  const command = process.argv[2];
  const args = composeArguments[command];

  if (!args) {
    throw new Error('Expected one of: start, stop, logs');
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL is not defined');

  const postgres = parsePostgresUrl(databaseUrl);
  const child = spawn('docker', args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      POSTGRES_USER: postgres.user,
      POSTGRES_PASSWORD: postgres.password,
      POSTGRES_DB: postgres.database,
    },
  });

  child.on('error', (error) => {
    console.error(`Failed to start Docker Compose: ${error.message}`);
    process.exitCode = 1;
  });
  child.on('exit', (code, signal) => {
    process.exitCode = code ?? (signal ? 1 : 0);
  });
};

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  run();
}
