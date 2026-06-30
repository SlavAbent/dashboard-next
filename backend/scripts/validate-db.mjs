import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../db/db.json');

const errors = [];

const readDb = () => {
  try {
    return JSON.parse(readFileSync(dbPath, 'utf8'));
  } catch (error) {
    errors.push(`Failed to read db.json: ${error.message}`);
    return null;
  }
};

const assertUniqueIds = (items, label) => {
  const seen = new Set();

  for (const item of items) {
    if (!item?.id) {
      errors.push(`${label}: item without id`);
      continue;
    }

    if (seen.has(item.id)) {
      errors.push(`${label}: duplicate id "${item.id}"`);
    }

    seen.add(item.id);
  }
};

const assertUniqueOrders = (items, groupKey, label) => {
  const seenByGroup = {};

  for (const item of items) {
    const group = (seenByGroup[item[groupKey]] ??= new Set());

    if (group.has(item.order)) {
      errors.push(
        `${label}: duplicate order "${item.order}" within ${groupKey} "${item[groupKey]}"`
      );
    }

    group.add(item.order);
  }
};

const db = readDb();

if (db) {
  const menu = db.navigation?.menu ?? [];
  const columns = db.columns ?? [];
  const taskFolders = db.taskFolders ?? [];
  const tasks = db.tasks ?? [];
  const messages = db.messages ?? [];
  const users = db.users ?? [];

  if (!Array.isArray(menu) || menu.length === 0) {
    errors.push('navigation.menu must be a non-empty array');
  }

  assertUniqueIds(menu, 'navigation.menu');
  assertUniqueIds(columns, 'columns');
  assertUniqueIds(taskFolders, 'taskFolders');
  assertUniqueIds(tasks, 'tasks');
  assertUniqueIds(messages, 'messages');
  assertUniqueIds(users, 'users');

  assertUniqueOrders(taskFolders, 'columnId', 'taskFolders');
  assertUniqueOrders(tasks, 'taskFolderId', 'tasks');

  const columnIds = new Set(columns.map((column) => column.id));
  const folderIds = new Set(taskFolders.map((folder) => folder.id));
  const userIds = new Set(users.map((user) => user.id));

  for (const item of menu) {
    if (!item.slug || !item.name) {
      errors.push(`navigation.menu: item "${item.id}" must have slug and name`);
    }

    if (item.subheader?.grid && !Array.isArray(item.subheader.view)) {
      errors.push(
        `navigation.menu: item "${item.id}" has grid=true but no subheader.view`
      );
    }
  }

  for (const folder of taskFolders) {
    if (!folder.columnId || !columnIds.has(folder.columnId)) {
      errors.push(
        `taskFolders: folder "${folder.id}" references unknown column "${folder.columnId}"`
      );
    }

    if (typeof folder.order !== 'number') {
      errors.push(`taskFolders: folder "${folder.id}" must have numeric order`);
    }
  }

  for (const task of tasks) {
    if (!task.taskFolderId || !folderIds.has(task.taskFolderId)) {
      errors.push(
        `tasks: task "${task.id}" references unknown taskFolder "${task.taskFolderId}"`
      );
    }

    if (typeof task.order !== 'number') {
      errors.push(`tasks: task "${task.id}" must have numeric order`);
    }

    if (!task.createdAt) {
      errors.push(`tasks: task "${task.id}" must have createdAt`);
    }
  }

  for (const message of messages) {
    if (!message.userId || !userIds.has(message.userId)) {
      errors.push(
        `messages: message "${message.id}" references unknown user "${message.userId}"`
      );
    }
  }
}

if (errors.length > 0) {
  console.error('db.json validation failed:\n');
  errors.forEach((error) => console.error(`  - ${error}`));
  process.exit(1);
}

console.log('db.json validation passed');
