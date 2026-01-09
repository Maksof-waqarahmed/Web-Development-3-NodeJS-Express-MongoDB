# 🔍 Validation & Security in Backend APIs

---

## 🧠 Introduction

Security and validation are **critical** for any backend API.

Every application must:

* Validate incoming data
* Protect against **malicious attacks**
* Ensure secure communication

This README covers:

* Input validation (Joi / Zod)
* Preventing SQL/NoSQL injection
* Using Helmet for HTTP headers
* Rate limiting requests
* CORS configuration
* Basic XSS protection

---

## 📝 Input Validation

Validating **incoming data** ensures users don’t send invalid or malicious data.

### Using **Joi**

```bash
npm install joi
```

**Example: User Registration Validation**

```ts
import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
```

**Middleware to Validate Request**

```ts
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};
```

**Usage in Route**

```ts
import express from "express";
import { validateRequest } from "../middlewares/validate.middleware";
import { registerSchema } from "../schemas/user.schema";
import { registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), registerUser);
```

✅ Ensures only valid data enters the database

---

### Using **Zod** (Alternative)

```bash
npm install zod
```

```ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});
```

---

## 🛡 Prevent SQL / NoSQL Injection

MongoDB queries can be vulnerable if user input is **directly used**.

**Bad Example (Vulnerable)**

```ts
const user = await User.findOne({ email: req.body.email });
```

✅ Mitigation:

* Always use **Mongoose / ODM methods**
* Validate input using **Joi / Zod**
* Avoid `$where` or raw queries
* Escape user input if necessary

---

## 🛡 Helmet – Secure HTTP Headers

**Helmet** sets various HTTP headers to improve security.

### Install

```bash
npm install helmet
```

### Usage

```ts
import helmet from "helmet";
app.use(helmet());
```

**Protects against:**

* Clickjacking
* MIME sniffing
* XSS via headers

---

## ⏱ Rate Limiting

Protect your API from **brute force or DDoS attacks**.

### Install

```bash
npm install express-rate-limit
```

### Example

```ts
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});

app.use(limiter);
```

---

## 🌐 CORS (Cross-Origin Resource Sharing)

CORS allows **frontend apps** from different origins to access your API.

### Install

```bash
npm install cors
```

### Usage

```ts
import cors from "cors";

app.use(
  cors({
    origin: ["http://localhost:3000", "https://myapp.com"], // allowed origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
```

---

## 💻 XSS (Cross-Site Scripting) Basics

XSS happens when **user input is rendered without sanitization**.

**Mitigation:**

* Validate input using **Joi / Zod**
* Escape output on frontend
* Use Helmet headers (`helmet.xssFilter()`)

```ts
app.use(helmet.xssFilter());
```

* Sanitize user inputs (optional library: `xss-clean`)

```bash
npm install xss-clean
```

```ts
import xss from "xss-clean";

app.use(xss());
```

---

## ✅ Best Practices

* Always **validate incoming requests**
* Use **prepared statements / Mongoose methods**
* Limit requests with **rate limiting**
* Secure HTTP headers with **Helmet**
* Configure **CORS** properly
* Sanitize inputs to prevent **XSS**

---

## 🏁 Summary

By applying these validation and security measures:

* APIs are protected from malicious attacks
* Data integrity is maintained
* Users get safer and more reliable applications

This is **mandatory** for backend beginners and **production-ready APIs**.