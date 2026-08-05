const CONVEX_URL = import.meta.env.VITE_CONVEX_URL!;

export function storageUrl(storageId: string): string {
  return `${CONVEX_URL}/api/storage/${storageId}`;
}

export async function uploadFile(file: File, uploadUrl: string): Promise<string> {
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }
  const result = await response.json();
  return result.storageId as string;
}
