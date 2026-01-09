# 📤 File Uploads in Backend

---

## 🧠 Introduction

File uploading is a **very important backend feature**.
Almost every real-world application requires file uploads, such as:

* Profile picture uploads
* Product images
* Documents (PDFs, resumes, CVs)
* Certificates
* Blog images

In this README, we will cover:

* Multipart form data
* Multer basics
* Image uploading
* File size & type validation
* Cloud storage (Cloudinary / AWS S3 – introduction)

---

## 🌐 What is Multipart Form Data?

Normally, APIs accept **JSON data**.
However, when we want to send **files + text data**, we use:

👉 `multipart/form-data`

### Example (Frontend → Backend)

```text
name = "Ali"
email = "ali@gmail.com"
profileImage = image.jpg
```

This data is **split into multiple parts**, which is why it is called **multipart**.

📌 **Multer** handles this multipart data in the backend.

---

## 📦 Multer – File Upload Middleware

**Multer** is an Express middleware that:

* Handles `multipart/form-data`
* Saves files to the server
* Provides file information

---

## 📥 Install Required Packages

```bash
npm install multer
```

(Cloud support will require Cloudinary later)

---

## 🏗 Basic Project Structure

```text
src/
 ├── controllers/
 │    └── upload.controller.ts
 ├── middlewares/
 │    └── upload.middleware.ts
 ├── routes/
 │    └── upload.routes.ts
 ├── uploads/
 ├── app.ts
```

---

## ⚙️ Multer Basic Configuration

### File: `middlewares/upload.middleware.ts`

```ts
import multer from "multer";
import path from "path";
```

---

### 📁 Storage Configuration (Local)

```ts
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});
```

✔ Files will be saved in the `uploads/` folder
✔ Filenames will be unique

---

## 📏 File Size Validation

```ts
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});
```

❌ Files larger than 2MB will be rejected

---

## 🖼 File Type Validation (Images Only)

```ts
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: any
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Only images are allowed"), false);
  }

  cb(null, true);
};
```

---

### Final Multer Export

```ts
export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});
```

---

## 🚏 Upload Route

### File: `routes/upload.routes.ts`

```ts
import express from "express";
import { upload } from "../middlewares/upload.middleware";
import { uploadImage } from "../controllers/upload.controller";

const router = express.Router();

router.post(
  "/upload",
  upload.single("image"),
  uploadImage
);

export default router;
```

📌 `image` = field name (from Postman or frontend)

---

## 🎯 Upload Controller

### File: `controllers/upload.controller.ts`

```ts
import { Request, Response } from "express";

export const uploadImage = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    },
  });
};
```

---

## 🔐 Secure File Upload with Authentication

Always protect file upload routes so that **only authorized users** can upload files.

### Example: Protecting Upload Route

```ts
import { authenticate } from "../middlewares/auth.middleware";

router.post(
  "/upload",
  authenticate, // Only logged-in users
  upload.single("image"),
  uploadImage
);
```

✅ Benefits:

* Prevents **unauthorized users** from uploading files
* Ensures **security** in production apps

---

## 📂 Multiple File Upload

Sometimes, users need to upload **multiple files** at once, such as product images.

### Multer Example

```ts
router.post(
  "/upload-multiple",
  upload.array("images", 5), // Maximum 5 files
  async (req, res) => {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const fileInfos = (req.files as Express.Multer.File[]).map(
      (file) => ({
        filename: file.filename,
        path: file.path,
        size: file.size,
      })
    );

    res.json({ message: "Files uploaded", files: fileInfos });
  }
);
```

* `upload.array("images", 5)` → field name + max files
* Returns **array of uploaded file information**

---

## 🧪 Testing with Postman

1. Method: `POST`
2. URL: `/upload`
3. Body → `form-data`
4. Key: `image` (type = File)
5. Select image
6. Send request

✔ Image uploads successfully

---

## ☁️ Cloud Storage (Why Needed?)

Local storage ❌ is not recommended for production because:

* Server crash → files lost
* Scaling issues
* Performance problems

👉 Solution: **Cloud Storage**

---

## ☁️ Cloudinary (Beginner-Friendly)

Cloudinary is an **image hosting service**.

### Features

* Image upload
* Auto optimization
* CDN delivery
* Secure URLs

---

## 📦 Install Cloudinary

```bash
npm install cloudinary
```

---

## ⚙️ Cloudinary Configuration

### `.env`

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_secret
```

---

### File: `utils/cloudinary.ts`

```ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
```

---

## ☁️ Upload Image to Cloudinary

### Controller Update

```ts
import cloudinary from "../utils/cloudinary";

export const uploadImage = async (
  req: Request,
  res: Response
) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const result = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "uploads" }
  );

  res.json({
    message: "Uploaded to cloud",
    imageUrl: result.secure_url,
  });
};
```

✔ Image is now stored on **Cloudinary**
✔ You get a **public URL**

---

## ☁️ AWS S3 (Concept Only – Beginner)

Note for students:

* AWS S3 works similarly to Cloudinary
* Ideal for large files (videos, documents)
* Requires IAM setup, bucket, access keys
* Slightly advanced → can be taught later

---

## 🔐 Security Best Practices

✔ Always validate file type
✔ Limit file size
✔ Never trust filenames from the user
✔ Use cloud storage in production
✔ Protect upload routes with authentication

---

## 📌 Real-World Use Cases

* User profile pictures
* Product image uploads
* Resume uploads
* Certificates
* Blog thumbnails

---

## 🏁 Summary

This README covers:

✔ Multipart form data
✔ Multer basics
✔ Image upload
✔ File size & type validation
✔ Local storage
✔ Cloudinary integration
✔ Production best practices

This topic is **mandatory** for every backend beginner and is widely used in:

* Social media apps
* E-commerce platforms
* Admin dashboards
* SaaS systems