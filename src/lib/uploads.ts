const CONVEX_SITE_URL = import.meta.env.VITE_CONVEX_SITE_URL;

if (!CONVEX_SITE_URL) {
  console.error('[1DORUZ] VITE_CONVEX_SITE_URL is not set. Image uploads will produce broken URLs.');
}

export function storageUrl(storageId: string): string {
  return `${CONVEX_SITE_URL}/api/storage/${storageId}`;
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: `Invalid file type "${file.type}". Allowed: JPG, PNG, WebP.` };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: 10MB.` };
  }
  return { valid: true };
}

export async function uploadFile(file: File, uploadUrl: string): Promise<string> {
  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: { 'Content-Type': file.type },
    body: file,
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Upload failed (${response.status}): ${text}`);
  }
  const result = await response.json();
  return result.storageId as string;
}
