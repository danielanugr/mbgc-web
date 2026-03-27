import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Use dynamic access to prevent Next.js from inlining secret values at build time
function getEnv(key: string): string {
  return process.env[key] || "";
}

export const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";

let _r2Client: S3Client | null = null;

function getR2Client(): S3Client {
  if (!_r2Client) {
    _r2Client = new S3Client({
      region: "auto",
      endpoint: `https://${getEnv("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: getEnv("R2_ACCESS_KEY_ID"),
        secretAccessKey: getEnv("R2_SECRET_ACCESS_KEY"),
      },
    });
  }
  return _r2Client;
}

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
  const accountId = getEnv("R2_ACCOUNT_ID");
  const accessKeyId = getEnv("R2_ACCESS_KEY_ID");
  const secretAccessKey = getEnv("R2_SECRET_ACCESS_KEY");
  const bucketName = getEnv("R2_BUCKET_NAME");

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

  await getR2Client().send(command);

  // Eliminate double slashes if any
  const normalizedPublicUrl = publicUrl.endsWith("/")
    ? publicUrl.slice(0, -1)
    : publicUrl;
  return `${normalizedPublicUrl}/${fileName}`;
}
