export async function getFolders() {
  const folders = await fetch('http://localhost:4001/folders', {
    cache: 'no-cache',
  });

  if (!folders.ok) {
    throw new Error('No Aside found.');
  }

  return folders.json();
}
