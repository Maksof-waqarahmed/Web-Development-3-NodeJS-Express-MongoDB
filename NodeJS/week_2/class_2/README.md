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

# 📚 Type-Safe Request and Response Handling

In a JavaScript-based Node.js app, developers can easily make mistakes such as:

* Sending wrong data types in responses
* Forgetting required fields in a request
* Returning incomplete or undefined data

These issues often go unnoticed until runtime, leading to **unexpected behavior and broken APIs**.
**TypeScript** solves this by providing **type safety**, ensuring that both the **request** and **response** structures are always correct *before* the code runs.

---

## 🧠 What is Type Safety?

**Type safety** means that your code understands the **data type of every variable**, function, and object being used.
It prevents you from assigning or using incompatible data, helping catch bugs during development instead of production.

### 🧩 Example (Without TypeScript)

```js
app.post("/users", (req, res) => {
  const name = req.body.username; // ❌ Typo mistake (should be req.body.name)
  res.send(`User: ${name}`);
});
```

In plain JavaScript, this typo will not trigger an error until runtime.
When you run the server, you’ll see `undefined` because `req.body.username` doesn’t exist.

---

### ✅ Example (With TypeScript)

```ts
interface UserRequestBody {
  name: string;
  age: number;
}

app.post("/users", (req: Request<{}, {}, UserRequestBody>, res: Response) => {
  const { name, age } = req.body;
  res.json({ message: `User ${name}, Age: ${age}` });
});
```

Here, TypeScript statically checks `req.body`.
If you try to access a property that doesn’t exist (`req.body.username`), TypeScript immediately shows an error in your editor — preventing runtime issues.

---

## 🧱 Setting Up TypeScript Types in Express

### Step 1️⃣ — Import Required Types

```ts
import express, { Request, Response, Application } from "express";
```

* `Request` → Represents the HTTP request (contains body, params, query, etc.)
* `Response` → Represents the HTTP response object
* `Application` → Represents the Express app instance

---

### Step 2️⃣ — Define Request Interfaces

You can define types for every part of a request using this pattern:

```ts
Request<Params, ResBody, ReqBody, Query>
```

| Type Argument | Description        | Example                         |
| ------------- | ------------------ | ------------------------------- |
| `Params`      | URL parameters     | `{ id: string }`                |
| `ResBody`     | Response body type | `{ message: string }`           |
| `ReqBody`     | Request body type  | `{ name: string, age: number }` |
| `Query`       | Query parameters   | `{ search?: string }`           |

---

### Step 3️⃣ — Example: Type-Safe POST Request

```ts
import express, { Request, Response, Application } from "express";

const app: Application = express();
app.use(express.json());

// Define request body interface
interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
}

// Define response body interface
interface CreateUserResponse {
  success: boolean;
  message: string;
  data?: CreateUserRequest;
}

// POST route with type safety
app.post(
  "/users",
  (req: Request<{}, {}, CreateUserRequest>, res: Response<CreateUserResponse>) => {
    const { name, email, age } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Valid response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { name, email, age },
    });
  }
);

app.listen(4000, () => console.log("✅ Server running on port 4000"));
```

### ✅ Explanation

* `Request<{}, {}, CreateUserRequest>` ensures your request body matches the interface
* If you forget a required field (like `email`), you’ll get a compile-time error
* The response structure is validated using `Response<CreateUserResponse>` — keeping both ends consistent

---

## 🧩 Example 2: Type-Safe Params and Query

```ts
interface UserParams {
  id: string;
}

interface UserQuery {
  includePosts?: boolean;
}

interface UserResponse {
  id: string;
  name: string;
  posts?: string[];
}

app.get(
  "/users/:id",
  (req: Request<UserParams, UserResponse, {}, UserQuery>, res: Response<UserResponse>) => {
    const { id } = req.params;
    const includePosts = req.query.includePosts === "true";

    const user = {
      id,
      name: "Rana",
      posts: includePosts ? ["Post 1", "Post 2"] : undefined,
    };

    res.json(user);
  }
);
```

✅ **Highlights:**

* `req.params.id` is automatically typed as a string
* Optional queries (`includePosts`) are type-safe
* The final response is always aligned with the defined `UserResponse` type

---

## 🧰 Reusable Type Patterns

Organize your type definitions for scalability:

```
src/
├── types/
│   ├── user.types.ts
│   ├── product.types.ts
└── routes/
    ├── user.routes.ts
```

`user.types.ts`:

```ts
export interface UserRequest {
  name: string;
  email: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
```

Usage:

```ts
import { UserRequest, UserResponse } from "../types/user.types";
```

---

## 🧠 Using Generics for Type Safety

To make your API reusable and consistent, define a generic type for responses.

```ts
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

app.get("/products", (req: Request, res: Response<ApiResponse<Product[]>>) => {
  const products: Product[] = [
    { id: 1, name: "Laptop", price: 1500 },
    { id: 2, name: "Mouse", price: 25 },
  ];

  res.json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
});
```

✅ **Advantages:**

* The `ApiResponse<T>` structure can be reused across all endpoints
* Enforces consistency for every response
* Reduces redundancy and human error

---

## 🧩 Type-Safe Error Handling

Global error handling with defined response structure:

```ts
import { NextFunction } from "express";

interface ErrorResponse {
  success: boolean;
  message: string;
}

app.use((err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});
```

✅ Guarantees:

* Errors always return the same shape
* Prevents leaking internal data
* Fully type-checked

---

## 📚 Summary

| Concept            | Description                       | Example                             |
| ------------------ | --------------------------------- | ----------------------------------- |
| **Type Safety**    | Ensures correct data types        | `name: string`, not `any`           |
| **Request Types**  | Enforces request structure        | `Request<Params, Res, Body, Query>` |
| **Response Types** | Defines response format           | `Response<ApiResponse>`             |
| **Interfaces**     | Reusable type definitions         | `interface User { name: string }`   |
| **Generics**       | Flexible reusable response models | `ApiResponse<T>`                    |

---

## ✅ Benefits of Type-Safe APIs

* 💪 Reduced runtime errors
* 🧠 Better IntelliSense & autocompletion
* 🛡️ Strong API contract between frontend & backend
* 🧩 Easier refactoring
* 🚀 Ideal for large, scalable projects

---

# 2️⃣ Working with JSON Data

### Parsing JSON Requests

Express provides a built-in middleware to automatically parse JSON bodies:

```ts
app.use(express.json());
```

This middleware converts `application/json` request data into JavaScript objects accessible via `req.body`.

---

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

✅ **Why This Matters:**

* Data is automatically parsed from JSON to JS objects
* No need for manual parsing
* Keeps routes clean and readable

---

## ✅ Benefits Recap

| Feature                          | Description                              |
| -------------------------------- | ---------------------------------------- |
| **Type-safe Requests/Responses** | Enforces strict structure and types      |
| **JSON Middleware**              | Auto-parses incoming JSON                |
| **Typed Error Handling**         | Consistent global error responses        |
| **Clean Architecture**           | Organized, reusable code with TS support |
| **Scalability**                  | Perfect for large applications           |

---

## 🏁 Conclusion

By integrating **TypeScript** with **Express.js**, you achieve:

* 🧠 Type-safe route handlers
* ⚙️ Consistent JSON parsing
* 🚨 Typed centralized error handling
* 🧩 Scalable and modular middleware setup

> 💡 **Pro Tip:** Always organize middleware in separate files like `logger.ts`, `auth.ts`, `errorHandler.ts` for better maintainability.

---

## 🧩 Hands-On Task

**Create a CRUD API for books using Express.js and TypeScript.**

---