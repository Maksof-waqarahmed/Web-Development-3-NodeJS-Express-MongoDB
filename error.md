# ⚠️ Error Handling with TypeScript Types

When building applications with **Node.js and TypeScript**, things can go wrong — for example:

* The client sends invalid data
* A database query fails
* An API endpoint is not found

That’s where **error handling** comes in.
TypeScript helps us catch many of these issues **before runtime** by using **types**, and we can combine that with **Express.js error handlers** to make our apps safe and reliable.

---

## 🎯 What You’ll Learn

1. Why error handling is important
2. How TypeScript improves error safety
3. Types of errors (runtime vs compile-time)
4. Using `try...catch` with proper types
5. Creating a custom `Error` class
6. Centralized error handling middleware (Express + TS)
7. Example: full working server

---

## 🧠 1. Why Error Handling Matters

Without proper error handling:

* Your app might **crash unexpectedly**.
* Users may get **confusing or unsafe** error messages.
* Debugging becomes hard.

With **typed error handling**, you can:

* Catch problems early during compilation.
* Give **clear messages** to users.
* Keep your API **consistent and secure**.

---

## ⚙️ 2. TypeScript’s Role in Error Safety

TypeScript helps you:

* Detect incorrect function usage.
* Define what type of error can occur.
* Ensure you always return the correct data shape.

Example:

```ts
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

console.log(divide(10, 2)); // ✅ Works fine
console.log(divide(10, 0)); // ❌ Throws error
```

🔍 Here, TypeScript ensures both `a` and `b` are numbers before execution.

---

## ⚡ 3. Types of Errors

| Type                    | Description                                  | Example                          |
| ----------------------- | -------------------------------------------- | -------------------------------- |
| **Compile-time errors** | Caught by TypeScript before running the code | Missing types, wrong parameter   |
| **Runtime errors**      | Occur during code execution                  | Dividing by zero, file not found |

---

## 🧩 4. Handling Errors with `try...catch`

`try...catch` allows you to handle exceptions gracefully.

### Example:

```ts
try {
  const result = divide(10, 0);
  console.log(result);
} catch (error) {
  if (error instanceof Error) {
    console.error("❌ Error:", error.message);
  } else {
    console.error("Unknown error occurred");
  }
}
```

🧠 **Explanation:**

* Code inside `try` executes normally.
* If an error is thrown, it jumps to `catch`.
* The `instanceof Error` check ensures **type safety**.

---

## 🏗️ 5. Creating Custom Error Classes

Sometimes you want more **meaningful error messages** (e.g., `ValidationError`, `NotFoundError`, etc.)

### Example:

```ts
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateUserInput(age: number) {
  if (age < 18) {
    throw new ValidationError("User must be at least 18 years old");
  }
  return "Validation passed ✅";
}

try {
  console.log(validateUserInput(16));
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("⚠️ Validation Error:", error.message);
  } else {
    console.error("Unknown Error:", error);
  }
}
```

🧠 **Why custom errors?**

* Easier debugging
* More readable API responses
* Helps maintain consistent error handling in Express

---

## 🌐 6. Centralized Error Handling in Express + TypeScript

Let’s handle all errors in **one place** (a middleware).

### 🗂️ Folder structure:

```
src/
├── server.ts
├── errors/
│   └── ApiError.ts
└── middleware/
    └── errorHandler.ts
```

---

### 🧱 `src/errors/ApiError.ts`

```ts
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
```

---

### ⚙️ `src/middleware/errorHandler.ts`

```ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Default fallback for unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
```

---

### 🚀 `src/server.ts`

```ts
import express, { Request, Response, NextFunction } from "express";
import { ApiError } from "./errors/ApiError";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

// ✅ Example route
app.get("/divide", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { a, b } = req.query;
    const numA = Number(a);
    const numB = Number(b);

    if (isNaN(numA) || isNaN(numB)) {
      throw new ApiError(400, "Invalid input: both a and b must be numbers");
    }

    if (numB === 0) {
      throw new ApiError(400, "Division by zero is not allowed");
    }

    const result = numA / numB;
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

// Register error handler middleware
app.use(errorHandler);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
```

---

## 🧪 Test with Postman

**GET** → `http://localhost:3000/divide?a=10&b=2`
✅ Response:

```json
{
  "success": true,
  "result": 5
}
```

**GET** → `http://localhost:3000/divide?a=10&b=0`
❌ Response:

```json
{
  "success": false,
  "message": "Division by zero is not allowed"
}
```

---

## 📘 Summary Table

| Concept            | Description                  | Example                        |
| ------------------ | ---------------------------- | ------------------------------ |
| `try...catch`      | Handles runtime exceptions   | `try { ... } catch(e) { ... }` |
| `instanceof`       | Ensures correct error type   | `if (error instanceof Error)`  |
| Custom Error Class | Creates readable error types | `class ApiError extends Error` |
| Express Middleware | Centralized error handling   | `app.use(errorHandler)`        |
| Status Codes       | Tell client what went wrong  | `400`, `404`, `500`            |

---

## 💡 Best Practices

✅ Always use custom error classes (e.g. `ApiError`, `ValidationError`)
✅ Handle both runtime and logic errors
✅ Never expose internal error details to clients
✅ Always end with `app.use(errorHandler)` in Express
✅ Use `next(error)` to pass errors to middleware
✅ Add meaningful status codes (`400`, `404`, `500`)

---

## 🧱 Example Error Types for Real Projects

| Error Class       | Status Code | Use Case                      |
| ----------------- | ----------- | ----------------------------- |
| `ApiError`        | Custom      | Base class for all app errors |
| `ValidationError` | 400         | Invalid user input            |
| `NotFoundError`   | 404         | Data or route not found       |
| `AuthError`       | 401         | Unauthorized request          |
| `ServerError`     | 500         | Unexpected internal issue     |

---