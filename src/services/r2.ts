import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

export const bucketName = process.env.R2_BUCKET_NAME || "";
export const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

// Configure the S3 client to point to Cloudflare R2
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
});

/**
 * Upload a file buffer to Cloudflare R2
 * @param fileBuffer The file data as a Buffer
 * @param fileName The target file name in the bucket
 * @param contentType The MIME type of the file
 * @returns The public CDN URL of the uploaded object
 */
export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
): Promise<string> {
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2 credentials are not fully configured in env variables.",
    );
  }
  if (!bucketName) {
    throw new Error("R2_BUCKET_NAME is not set");
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Eliminate double slashes if any
  const normalizedPublicUrl = publicUrl.endsWith("/")
    ? publicUrl.slice(0, -1)
    : publicUrl;
  return `${normalizedPublicUrl}/${fileName}`;
}
