import { v2 as cloudinary } from "cloudinary";
import { appConfig } from "../config/config";
import fs from "fs";
cloudinary.config({
  cloud_name: appConfig.CLOUDINARY_CLOUD_NAME,
  api_key: appConfig.CLOUDINARY_API_KEY,
  api_secret: appConfig.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (buffer: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `ecommerce/${folder}` },
        (error, uploadResult) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(new Error("Image upload failed"));
          }
          resolve(uploadResult?.secure_url || ""); 
        }
      );
      stream.end(buffer); 
    });
  };
  
