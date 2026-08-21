import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState } from 'react';
import { uploadFile, validateImageFile } from '../lib/uploads';

export function useImageUpload() {
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const [isUploading, setIsUploading] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const callerId = user._id || user.id;

  const upload = async (file: File): Promise<string> => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    if (!callerId) {
      throw new Error('Sign in as admin to upload files.');
    }
    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl({ callerId });
      const storageId = await uploadFile(file, uploadUrl);
      return storageId;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<string[]> => {
    const storageIds: string[] = [];
    for (const file of files) {
      const id = await upload(file);
      storageIds.push(id);
    }
    return storageIds;
  };

  return { upload, uploadMultiple, isUploading };
}
