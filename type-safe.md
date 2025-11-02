# 🧩 Type-Safe Request and Response Handling in Express.js + TypeScript

---

## 📘 Overview

In a JavaScript-based Node.js app, it’s easy to make mistakes like:

* Sending wrong data types
* Forgetting required fields in a request
* Getting `undefined` or invalid responses

TypeScript helps prevent all of that through **type safety** — ensuring both **request** and **response** data structures are correct *before* the code runs.

---

## 🎯 Objective

By the end of this guide, you’ll understand:

✅ What type safety means in backend APIs
✅ How to type `req.params`, `req.query`, and `req.body`
✅ How to define types and interfaces for request and response objects
✅ How to create reusable types for better scalability
✅ How to handle validation errors safely

---

## 🧠 What is Type Safety?

**Type safety** means that your code:

* Knows the **exact data type** of each variable
* Prevents you from using values incorrectly
* Helps catch **errors at compile-time**, not runtime

### 🧩 Example (Without TypeScript)

```js
app.post("/users", (req, res) => {
  const name = req.body.username; // ❌ Typo mistake (should be req.body.name)
  res.send(`User: ${name}`);
});
```

You’ll only discover this error **after running the code**, which can cause bugs.

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

Now TypeScript **statically checks** your request object — it will show a red underline if you use the wrong property or data type.

---

## 🧱 Setting Up TypeScript Types in Express

### Step 1️⃣ — Import Required Types

```ts
import express, { Request, Response, Application } from "express";
```

These imports allow you to use:

* `Request` — represents the incoming request
* `Response` — represents the outgoing response
* `Application` — the main Express app

---

### Step 2️⃣ — Define Request Interfaces

You can type different parts of the request using the generic format:

```ts
Request<Params, ResBody, ReqBody, Query>
```

| Type Argument | Description        | Example                         |
| ------------- | ------------------ | ------------------------------- |
| `Params`      | Route parameters   | `{ id: string }`                |
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

app.post(
  "/users",
  (req: Request<{}, {}, CreateUserRequest>, res: Response<CreateUserResponse>) => {
    const { name, email, age } = req.body;

    // Example validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { name, email, age },
    });
  }
);

app.listen(4000, () => console.log("✅ Server running on port 4000"));
```

✅ **What this does:**

* TypeScript ensures `name`, `email`, and `age` exist in the request body.
* If you mistype a field (`req.body.emai`), TypeScript will throw an error before you run the code.
* The response type is also checked — preventing accidental mismatches like returning a number instead of an object.

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

### ✅ What’s happening:

* `req.params.id` is **always a string**, so no need to check its type.
* `req.query.includePosts` is **optional** (`boolean | undefined`).
* The response will always match the `UserResponse` type — fully type-safe.

---

## 🧰 Reusable Type Patterns

To keep your code clean, move your interfaces to a separate folder:

```
src/
├── types/
│   ├── user.types.ts
│   ├── product.types.ts
└── routes/
    ├── user.routes.ts
```

Example (`user.types.ts`):

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

Now import and use them anywhere:

```ts
import { UserRequest, UserResponse } from "../types/user.types";
```

---

## 🧠 Bonus: Using Generics with Type Safety

Sometimes, you may want a **generic type** for API responses.

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

✅ Benefits:

* You can reuse `ApiResponse<T>` for any entity (`User`, `Product`, etc.)
* The response type changes dynamically depending on `T`
* Prevents you from sending incorrect data formats

---

## 🧩 Handling Errors Safely

You can create a **typed error handler** middleware.

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

✅ TypeScript guarantees the response follows the correct error shape.

---

## 📚 Summary

| Concept            | Description                                   | Example                             |
| ------------------ | --------------------------------------------- | ----------------------------------- |
| **Type Safety**    | Ensures variables and data have correct types | `name: string`, not `any`           |
| **Request Types**  | Define structure for incoming data            | `Request<Params, Res, Body, Query>` |
| **Response Types** | Define structure for outgoing JSON            | `Response<ApiResponse>`             |
| **Interfaces**     | Reusable type definitions                     | `interface User { name: string }`   |
| **Generics**       | Flexible reusable types                       | `ApiResponse<T>`                    |

---

## ✅ Benefits of Type-Safe APIs

* 💪 Fewer runtime errors
* 🧠 Better IntelliSense and autocompletion
* 🛡️ Strong contract between frontend and backend
* 🧩 Easy to refactor safely
* 🚀 Perfect for scalable applications

---

## 🔚 Final Words

TypeScript turns Express.js into a **strongly-typed backend framework** — helping you build APIs that are:

* **More reliable**
* **Self-documented**
* **Easier to maintain**

---