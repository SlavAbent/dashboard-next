export async function getFilters() {
  const filters = await fetch('http://localhost:4001/filters', {
    cache: 'no-cache',
  });

  if (!filters.ok) {
    throw new Error('No filters found.');
  }

  return filters.json();
}
