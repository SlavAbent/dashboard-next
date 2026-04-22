export async function getSubHeaderData() {
  const filters = await fetch('http://localhost:4001/subheader', {
    cache: 'no-cache',
  });

  if (!filters.ok) {
    throw new Error('No subheader data found.');
  }

  return filters.json();
}
