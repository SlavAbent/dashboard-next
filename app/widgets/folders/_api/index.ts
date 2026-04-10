export async function getFolders() {
  const folders = await fetch("http://localhost:4001/folders", {
    cache: "no-cache",
  });

  if (!folders.ok) {
    throw new Error("No folders found.");
  }

  return folders.json();
}
