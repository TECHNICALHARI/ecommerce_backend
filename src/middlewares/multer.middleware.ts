import multer from "multer";

const storage = multer.memoryStorage();

const imageFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG, JPG, and PNG formats are allowed"), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export const uploadSingleImage = upload.single("thumbnail");
export const uploadMultipleImages = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "imageUrls", maxCount: 5 },
]);
