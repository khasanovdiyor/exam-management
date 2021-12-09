import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export class ImageUploadService {
  private storage: CloudinaryStorage;
  public upload: any;

  constructor() {
    this.setupCloudinary();

    this.storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: "exam-management",
      },
    });

    this.upload = multer({ storage: this.storage });
  }

  setupCloudinary() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
}
