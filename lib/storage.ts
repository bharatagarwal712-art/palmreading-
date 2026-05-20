export const storageBuckets = {
  palmUploads: "palm-uploads",
  readingArtifacts: "reading-artifacts",
} as const;

export function getPalmUploadPath(userId: string, readingId: string) {
  return `${userId}/readings/${readingId}/palm.jpg`;
}
