import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parsePostgresUrl } from '../scripts/docker-compose.mjs';

test('parsePostgresUrl extracts and decodes Compose credentials', () => {
  assert.deepEqual(
    parsePostgresUrl(
      'postgresql://dashboard_user:p%40ssword@localhost:5432/dashboard%5Fdb?schema=public'
    ),
    {
      user: 'dashboard_user',
      password: 'p@ssword',
      database: 'dashboard_db',
    }
  );
});

test('parsePostgresUrl rejects malformed and incomplete URLs', () => {
  assert.throws(() => parsePostgresUrl('not-a-url'), /valid PostgreSQL URL/);
  assert.throws(
    () => parsePostgresUrl('mysql://user:password@localhost/database'),
    /postgres or postgresql protocol/
  );
  assert.throws(
    () => parsePostgresUrl('postgresql://user@localhost/database'),
    /include user, password and database name/
  );
});
