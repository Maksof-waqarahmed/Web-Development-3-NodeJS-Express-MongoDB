# ⚡ Express.js with TypeScript — Middleware & Type-Safe Backend Development

## 📘 What is Middleware?

In simple terms:

> **Middleware** are functions that execute **between** the request coming into the server and the response being sent to the client.

## 🧠 Visual Example

<img src="./images/img4.jpg" alt="Middleware" />

---

Every middleware function has access to:

* The **Request** (`req`)
* The **Response** (`res`)
* The **next()** function (which passes control to the next middleware)

### 🧩 Analogy:

Think of middleware as **security checkpoints** or **filters** in an airport:

* One checks your passport 🛂
* One checks your luggage 🎒
* One checks boarding pass 🎫

Similarly, in Express:

* One middleware might log your request
* Another might verify your token
* Another might handle errors

---

## 🧠 Visual Example

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

<img src="./images/middleware1.png" alt="Middleware concept" />

---

## ⚙️ Why Middleware?

Middleware allows you to:

✅ Log every incoming request

✅ Authenticate users before accessing certain routes

✅ Validate incoming data

✅ Handle errors globally

✅ Serve static files

✅ Add custom logic (e.g., API limits, request transformation)

Without middleware, you’d have to manually code these for every route — which becomes unmanageable.


<img src="./images/img3.png" alt="Middleware" />

---

## 🧰 Step 1: Project Setup

### Folder Structure

```
express-ts-app/
├── src/
│   ├── server.ts
│   └── middleware/
│       └── logger.ts
├── package.json
└── tsconfig.json
```

---

## ⚙️ Step 2: Install Dependencies

```bash
npm init -y
npm install express
npm install -D typescript tsx @types/node @types/express
```

* `express` → main framework
* `typescript` → enables static typing
* `tsx` → runs TS files directly in dev mode
* `@types/express` → adds type definitions for Express
* `@types/node` → adds Node.js type support

---

## 🧱 Step 3: TypeScript Configuration

Create a file named `tsconfig.json`:

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

This ensures TypeScript compiles code properly for Node.js.

---

## 🚀 Step 4: Create a Basic Express Server

`src/server.ts`

```ts
import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// Built-in middleware for JSON parsing
app.use(express.json());

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Welcome to Express + TypeScript Server");
});

// Start the server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
```

Run it:

```bash
npx tsx src/server.ts
```

---

## 🧠 Understanding Middleware Flow

Every request goes through middleware **in the order they are defined**.

```
Request → Middleware 1 → Middleware 2 → Route → Response
```

If a middleware doesn’t call `next()`, the request stops there — no further handlers will execute.

---

## 🔹 Types of Middleware

| Type                  | Description                           | Example                         |
| --------------------- | ------------------------------------- | ------------------------------- |
| **Application-level** | Runs for all routes using `app.use()` | Logging, authentication         |
| **Router-level**      | Runs for specific routes              | User route validation           |
| **Built-in**          | Provided by Express                   | `express.json()`                |
| **Error-handling**    | Handles app-wide errors               | Catch and respond to exceptions |
| **Third-party**       | External packages                     | `cors`, `morgan`, `helmet`      |

---

## 🔸 Example 1: Application-Level Middleware

```ts
app.use((req: Request, res: Response, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`);
  next(); // Pass control to next middleware/route
});
```

This will log **every request** that hits your server.

---

## 🔸 Example 2: Custom Middleware

Let’s create our own **logger middleware** in `src/middleware/logger.ts`:

```ts
import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`📩 ${req.method} ${req.path}`);
  next();
};
```

Now import and use it in your server:

```ts
import { logger } from "./middleware/logger";
app.use(logger);
```

---

## 🔸 Example 3: Router-Level Middleware

`src/routes/userRoutes.ts`

```ts
import express from "express";
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
  console.log("👥 User route middleware triggered");
  next();
});

// Routes
router.get("/", (req, res) => res.send("All Users"));
router.post("/", (req, res) => res.send("User Created"));

export default router;
```

Import into `server.ts`:

```ts
import userRoutes from "./routes/userRoutes";
app.use("/users", userRoutes);
```

Now any request to `/users` passes through the router-level middleware first.

---

## 🔸 Example 4: Error-Handling Middleware

Error-handling middleware has **four parameters** — `(err, req, res, next)`:

```ts
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});
```

Even if something crashes inside your route, this middleware will **gracefully handle it** instead of breaking the server.

---

## 💪 Full Example — Combining Everything

```ts
import express, { Application, Request, Response } from "express";
import { logger } from "./middleware/logger";

const app: Application = express();
const PORT = 4000;

app.use(express.json()); // Built-in middleware
app.use(logger); // Custom middleware

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

## 🧩 Real-World Use Cases of Middleware

| Middleware Type    | Purpose                      | Example                            |
| ------------------ | ---------------------------- | ---------------------------------- |
| **Logging**        | Track API usage              | Custom logger or `morgan`          |
| **Authentication** | Verify JWT tokens            | Check user before accessing routes |
| **Validation**     | Validate incoming data       | Using `express-validator`          |
| **CORS**           | Handle cross-origin requests | `cors` package                     |
| **Error Handling** | Catch global exceptions      | Custom error middleware            |

---

## 1️⃣ Type-Safe Request and Response Handling

With TypeScript, you can define **types for parameters, body, and response**, ensuring your API is fully type-safe.

### Example:

```ts
import { Request, Response } from "express";

interface User {
  id: number;
  name: string;
  email: string;
}

// Define route with types
app.post("/user", (req: Request<{}, {}, User>, res: Response<User>) => {
  const newUser: User = req.body;
  res.status(201).json(newUser);
});
```

✅ Benefits:

* Prevents sending wrong data types
* Autocomplete support for request & response
* Reduces runtime errors

---

## 2️⃣ Working with JSON Data

### Parsing JSON Requests

Express provides a built-in middleware:

```ts
app.use(express.json());
```

It automatically converts incoming JSON data into JavaScript objects.

### Example: Sending & Receiving JSON

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

let products: Product[] = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Phone", price: 500 },
];

// GET all products
app.get("/products", (req: Request, res: Response<Product[]>) => {
  res.json(products);
});

// POST new product
app.post("/products", (req: Request<{}, {}, Product>, res: Response) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json({ message: "Product Added", data: newProduct });
});
```

✅ Benefits:

* Automatically parses `application/json`
* Reduces boilerplate
* Perfect for RESTful APIs

---

## 3️⃣ Error Handling with TypeScript Types

TypeScript helps ensure errors are handled safely with proper typing.

### Example:

```ts
import { Request, Response, NextFunction } from "express";

class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

// Example route throwing error
app.get("/error", (req, res, next) => {
  next(new ApiError("Something went wrong!", 400));
});

app.use(errorHandler);
```

✅ Benefits:

* Custom error classes
* Proper error typing
* Centralized error management

---

## 🧪 Test Using Postman

### 1️⃣ Send GET Request:

```
GET http://localhost:4000/products
```

→ Returns all products (JSON)

### 2️⃣ Send POST Request:

```
POST http://localhost:4000/products
Content-Type: application/json
{
  "id": 3,
  "name": "Tablet",
  "price": 600
}
```

→ Returns:

```json
{
  "message": "Product Added",
  "data": {
    "id": 3,
    "name": "Tablet",
    "price": 600
  }
}
```

### 3️⃣ Trigger Error:

```
GET http://localhost:4000/error
```

→ Returns:

```json
{
  "success": false,
  "message": "Something went wrong!"
}
```

---

## ✅ Benefits Recap

| Feature                          | Description                               |
| -------------------------------- | ----------------------------------------- |
| **Type-safe Requests/Responses** | Reduces errors by enforcing types         |
| **JSON Middleware**              | Automatically parses JSON data            |
| **Custom Error Types**           | Strongly typed centralized error handling |
| **Middleware Architecture**      | Clean and scalable codebase               |
| **TypeScript Integration**       | Enhanced readability and maintainability  |

---

## 🏁 Conclusion

By combining **Express.js** and **TypeScript**, you achieve:

* Type-safe route handling
* Consistent JSON data management
* Centralized and typed error handling
* Scalable middleware architecture

> 💡 **Pro Tip:** As your project grows, separate middlewares into their own files like `logger.ts`, `auth.ts`, `errorHandler.ts` for better organization.

---

### 🏁 Hands On: Create a CRUD API for books using Express.js and TypeScript.