# ⚡ Express.js Framework with TypeScript

### Routing | Middleware | Handling Requests

---

## 📘 Overview

**Express.js** is the most popular Node.js framework for building **web servers and RESTful APIs**.

In this guide, you’ll learn:

1. What Express.js is and why it’s needed
2. How to set up Express with TypeScript
3. How routing works
4. What middleware is and how it works
5. How to handle HTTP requests (GET, POST, PUT, DELETE)
6. How to send JSON responses and use status codes

---

## 🧠 What is Express.js?

**Express.js** is a **minimal and flexible Node.js framework** that simplifies the process of building web servers and APIs.

Without Express, you’d have to manually:

* Parse incoming requests
* Handle routes
* Set headers
* Manage errors

Express automates all of this for you.

---

### 🧩 Why We Need Express

Let’s compare **raw Node.js HTTP** vs **Express**:

| Feature              | Raw Node.js                                | Express.js                         |
| -------------------- | ------------------------------------------ | ---------------------------------- |
| Routing              | Manual route checking using `if (req.url)` | Built-in `app.get()`, `app.post()` |
| Request body parsing | Manual JSON parsing                        | `express.json()` middleware        |
| Readability          | Complex & long                             | Simple & structured                |
| Middleware support   | Manual handling                            | Built-in support                   |
| Scalability          | Hard to scale                              | Easy modular structure             |

✅ **In short:** Express.js saves time, organizes your code, and makes backend development beginner-friendly.

---

## ⚙️ Setting Up Express with TypeScript

### 📁 Folder Structure

```
express-ts-app/
├── src/
│   ├── server.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   └── middleware/
│       └── logger.ts
├── package.json
└── tsconfig.json
```

---

### 🧰 Step 1: Install Dependencies

```bash
npm init -y
npm install express
npm install -D typescript ts-node-dev @types/node @types/express
```

---

### 🧱 Step 2: Setup `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

### 🚀 Step 3: Create `src/server.ts`

```ts
import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// Built-in middleware to parse JSON
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Welcome to Express + TypeScript Server");
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
```

Now run it:

```bash
npx ts-node-dev src/server.ts
```

---

## 🧭 Understanding Express.js Core Concepts

---

## 1️⃣ Routing in Express

Routing defines how your app responds to client requests at specific URLs.

### ✳️ Syntax

```ts
app.METHOD(PATH, HANDLER)
```

Where:

* `METHOD` → HTTP method (`get`, `post`, `put`, `delete`)
* `PATH` → URL endpoint (`"/users"`, `"/products/:id"`)
* `HANDLER` → Function that handles the request

---

### 🔹 Example: Basic Routes

```ts
app.get("/users", (req: Request, res: Response) => {
  res.json([{ id: 1, name: "Rana" }]);
});

app.post("/users", (req: Request, res: Response) => {
  const newUser = req.body;
  res.status(201).json({ message: "User created", user: newUser });
});

app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `User ${id} updated` });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `User ${id} deleted` });
});
```

---

### 🔸 Dynamic Routes with Parameters

Use `req.params` for dynamic values.

Example:

```ts
app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `Fetching user with ID: ${id}` });
});
```

---

### 🔸 Query Parameters

Use `req.query` for optional filters.

Example:

```ts
app.get("/search", (req: Request, res: Response) => {
  const { keyword } = req.query;
  res.json({ message: `Searching for ${keyword}` });
});
```

---

## 2️⃣ Middleware in Express

Middleware are **functions that run between** receiving a request and sending a response.

### 🧠 Think of Middleware as:

> A checkpoint between request and response where you can **log**, **authenticate**, **validate**, or **modify** data.

---

### 🔹 Types of Middleware

| Type                  | Description                                 |
| --------------------- | ------------------------------------------- |
| **Application-level** | Runs for all routes (`app.use()`)           |
| **Router-level**      | Runs only on specific routes                |
| **Built-in**          | Provided by Express (like `express.json()`) |
| **Error-handling**    | Handles errors globally                     |
| **Third-party**       | External packages like `cors`, `morgan`     |

---

### 🔸 Example: Application-Level Middleware

```ts
app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next(); // Pass control to next middleware/route
});
```

---

### 🔸 Example: Custom Middleware (logger.ts)

```ts
// src/middleware/logger.ts
import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`📩 ${req.method} ${req.path}`);
  next();
};
```

Use it in `server.ts`:

```ts
import { logger } from "./middleware/logger";
app.use(logger);
```

---

### 🔸 Example: Router-Level Middleware

```ts
import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  console.log("User route middleware triggered");
  next();
});

router.get("/", (req, res) => res.send("All Users"));
export default router;
```

Import in `server.ts`:

```ts
import userRoutes from "./routes/userRoutes";
app.use("/users", userRoutes);
```

---

## 3️⃣ Handling Requests in Express

Each incoming HTTP request carries three key components:

| Part         | Description                | Example                                |
| ------------ | -------------------------- | -------------------------------------- |
| `req.params` | Dynamic route parameters   | `/users/:id` → `req.params.id`         |
| `req.query`  | Query string filters       | `/search?name=Rana` → `req.query.name` |
| `req.body`   | JSON body sent in POST/PUT | `{ "name": "Rana" }`                   |

---

### 🟩 Example: Reading `req.body`

```ts
app.post("/data", (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: "Data received", data });
});
```

---

### 🟨 Example: Reading `req.params`

```ts
app.get("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ID is ${id}` });
});
```

---

### 🟦 Example: Reading `req.query`

```ts
app.get("/filter", (req: Request, res: Response) => {
  const { category } = req.query;
  res.json({ message: `Filtering category: ${category}` });
});
```

---

## ⚙️ Sending Responses

Express provides multiple ways to send a response:

| Method                 | Description            |
| ---------------------- | ---------------------- |
| `res.send()`           | Sends text or HTML     |
| `res.json()`           | Sends JSON response    |
| `res.status(code)`     | Sets HTTP status code  |
| `res.sendStatus(code)` | Sends only status code |

**Example:**

```ts
res.status(200).json({ message: "Success" });
```

---

## 🧾 Common HTTP Status Codes

| Code | Meaning                  |
| ---- | ------------------------ |
| 200  | OK — Success             |
| 201  | Created — Resource added |
| 400  | Bad Request              |
| 401  | Unauthorized             |
| 404  | Not Found                |
| 500  | Internal Server Error    |

---

## 🧩 Error Handling Middleware

Express has a **special** type of middleware for catching errors.

### 🔹 Example:

```ts
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});
```

---

## 💪 Full Example: Combining All Concepts

```ts
import express, { Application, Request, Response } from "express";
import { logger } from "./middleware/logger";

const app: Application = express();
const PORT = 4000;

app.use(express.json());
app.use(logger);

// Routes
app.get("/", (req: Request, res: Response) => res.send("Welcome to Express + TS API"));
app.get("/users", (req: Request, res: Response) => res.json([{ id: 1, name: "Rana" }]));
app.post("/users", (req: Request, res: Response) => res.status(201).json(req.body));

// Error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
```

---

## 📚 Summary

| Concept              | Description                                      |
| -------------------- | ------------------------------------------------ |
| **Express.js**       | Node.js framework for building APIs easily       |
| **Routing**          | Defines how endpoints respond to requests        |
| **Middleware**       | Functions that run before/after request handling |
| **Request Handling** | Accessing params, query, and body data           |
| **Error Handling**   | Catch and manage application errors              |

---

## 🚀 Next Step

You now know how to:
✅ Create Express server with TypeScript
✅ Use routing and middleware
✅ Handle and send requests/responses

Next, you can learn:

> 🧱 **Building a Complete REST API (CRUD) using Express + TypeScript + Prisma (Database Integration)**

---