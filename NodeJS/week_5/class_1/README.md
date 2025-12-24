# 📌 Input Validation with Zod

## 📖 Introduction

Input validation ensures that the data coming from users (request body, query params, URL params, forms, APIs) is **correct, safe, and expected**.

❌ Without validation:

* App crashes
* Invalid data saved in database
* Security vulnerabilities
* Hard-to-debug bugs

✅ With validation:

* Clean & trusted data
* Better error messages
* Safer APIs
* Production-ready backend

**Zod** is a **TypeScript-first schema validation library** that validates data at runtime **and** provides static types.

---

## 🚀 Why Zod?

| Feature                             | Benefit                 |
| ----------------------------------- | ----------------------- |
| TypeScript-first                    | Auto type inference     |
| Runtime validation                  | Prevents invalid data   |
| Easy syntax                         | Readable & maintainable |
| Custom errors                       | Better UX               |
| Works with Express / Next.js / tRPC | Industry standard       |

---

## 📦 Installation

```bash
npm install zod
```

---

## 🧱 Basic Zod Schema

```ts
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number()
});
```

### Validate data

```ts
const user = userSchema.parse({
  name: "Rana",
  age: 22
});
```

❌ Invalid data throws error
✅ Valid data returns parsed object

---

## 🔍 Safe Parsing (Recommended)

```ts
const result = userSchema.safeParse(req.body);

if (!result.success) {
  return res.status(400).json({
    errors: result.error.errors
  });
}

const validatedData = result.data;
```

✔ Prevents app crashes
✔ Graceful error handling

---

## 📚 Common Zod Data Types

```ts
z.string();
z.number();
z.bigint();
z.boolean();
z.symbol();
z.undefined();
z.null();
```

### String

```ts
z.string()
z.string().min(3)
z.string().max(20)
z.string().email()
z.string().url()
```

### Number

```ts
z.number()
z.number().min(1)
z.number().max(100)
z.number().int()
```

### Boolean

```ts
z.boolean()
```

### Array

```ts
z.array(z.string())
```

### Optional & Nullable

```ts
z.string().optional()
z.string().nullable()
```

---

## 🧪 Example: User Registration Schema

```ts
const registerSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6),
  age: z.number().min(18),
  skills: z.array(z.string()).optional()
});
```

---

## 🔗 Using Zod with Express.js

```ts
app.post("/register", (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors
    });
  }

  res.status(201).json({
    message: "User registered",
    data: result.data
  });
});
```

---

## 🧠 Custom Error Messages

```ts
z.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string"
})
```

---

## 🔀 Refinements (Advanced Validation)

### Password confirmation

```ts
const schema = z.object({
  password: z.string(),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
```

---

## 🧩 Transforming Data

```ts
z.string().transform(val => val.trim().toLowerCase())
```

Example:

```ts
email: z.string().email().transform(v => v.toLowerCase())
```

---

## 🛡️ Validation for Params & Query

### URL Params

```ts
const paramSchema = z.object({
  id: z.string().length(24)
});

paramSchema.parse(req.params);
```

### Query Params

```ts
const querySchema = z.object({
  page: z.string().transform(Number).default("1")
});
```

---

## 🧬 Zod + MongoDB (Mongoose)

```ts
const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user"]).default("user")
});
```

✔ Prevents invalid MongoDB documents
✔ Cleaner database

---

## 🧱 Zod + TypeScript Types

```ts
type UserInput = z.infer<typeof userSchema>;
```

✔ No duplicate interfaces
✔ Always in sync

---

## 📦 Partial & Pick

```ts
userSchema.partial(); // All optional
userSchema.pick({ name: true });
userSchema.omit({ password: true });
```

---

## ⚠️ Error Format Example

```json
[
  {
    "path": ["email"],
    "message": "Invalid email"
  }
]
```

Perfect for frontend forms.

---

## 🏆 Best Practices

✔ Always use `safeParse()`
✔ Validate before DB save
✔ Keep schemas in `/validators` folder
✔ Reuse schemas for frontend & backend
✔ Combine with Mongoose validation

---

## 🔚 Conclusion

Zod is:

* ✅ Simple
* ✅ Powerful
* ✅ Type-safe
* ✅ Production-ready

If you are building **APIs, SaaS apps, dashboards, or full-stack projects**, Zod should be your **default validation library**.

---

## 📚 Official Docs

👉 [https://zod.dev](https://zod.dev)

---
