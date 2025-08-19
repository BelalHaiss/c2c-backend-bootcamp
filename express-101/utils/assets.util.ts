import path from 'node:path';
import { promises as fs } from 'fs';

export const deleteUploadedAsset = async (fileName: string) => {
  const filePath = path.join(__dirname, '../', 'uploads', fileName);
  await fs.unlink(filePath);
};
