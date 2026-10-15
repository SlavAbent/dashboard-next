const dataApi =
  typeof window === 'undefined'
    ? (process.env.JSON_SERVER_URL ?? 'http://localhost:4001')
    : '/mock-api';

export const navigationApi = `${dataApi}/navigation`;
export const columnsApi = `${dataApi}/columns`;
export const tasksApi = `${dataApi}/tasks`;
export const taskFoldersApi = `${dataApi}/taskFolders`;
export const messagesApi = `${dataApi}/messages`;
