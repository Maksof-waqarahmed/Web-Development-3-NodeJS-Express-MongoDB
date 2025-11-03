# 🧩 Basic TypeScript Syntax: Types, Interfaces, and Type Safety

Welcome to one of the most fundamental parts of TypeScript!
In this section, you’ll learn about:

* Basic syntax and typing in TypeScript
* How interfaces define object structure
* What “type safety” means and why it matters

---

## 🧠 What is TypeScript?

**TypeScript** is a *superset* of JavaScript that adds **static typing** and **type-checking** at compile time.

👉 It helps developers **catch errors early** — before the code even runs.

Example (JavaScript vs TypeScript):

```js
// JavaScript
let age = 25;
age = "twenty five"; // ❌ No error until runtime
```

```ts
// TypeScript
let age: number = 25;
age = "twenty five"; // 🚫 Error: Type 'string' is not assignable to type 'number'
```

✅ TypeScript detects this error **before execution**, ensuring type safety.

---

## 🧩 Basic TypeScript Syntax

TypeScript allows you to declare variables with **explicit types** — making your code safer and self-documenting.

When you assign a value, TypeScript automatically infers its type.
However, for better clarity and safety, you can explicitly define the type as shown below.

---

## 🧩 **Primitive Types**

Primitive types are **basic data types** that hold a single value.
They include: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, and `undefined`.

---

### 🟦 Example: Declaring Primitive Types

```ts
let firstName: string = "Waqar";
let age: number = 22;
let isDeveloper: boolean = true;
let largeNumber: bigint = 1234567890123456789012345678901234567890n;
let symbolValue: symbol = Symbol("id");
let emptyValue: null = null;
let emptyValue2: undefined = undefined;
let futureValue2: any = "Hello";
futureValue2 = "Hello";
futureValue2 = true;
```

---

### 📘 Explanation

| Type        | Description                                                     | Example                 |
| ----------- | --------------------------------------------------------------- | ----------------------- |
| `string`    | Represents text values                                          | `"Waqar"`, `'Hello'`    |
| `number`    | Represents integers and floating-point numbers                  | `25`, `3.14`            |
| `boolean`   | Represents logical values (true/false)                          | `true`, `false`         |
| `bigint`    | Represents very large integers beyond `Number.MAX_SAFE_INTEGER` | `12345678901234567890n` |
| `symbol`    | Represents unique values, often used as object keys             | `Symbol("id")`          |
| `null`      | Represents intentional absence of a value                       | `null`                  |
| `undefined` | Represents uninitialized variables                              | `undefined`             |
| `any`       | Disables type checking — can hold any type                      | `"Hello"`, `42`, `true` |

---

## ⚠️ `any` Type — Use with Care

`any` tells TypeScript to **turn off type checking** for that variable.

```ts
let randomValue: any = "Waqar";
randomValue = 123;     // ✅ OK
randomValue = true;    // ✅ OK
```

💡 It’s useful during **migrations from JavaScript** or when **type is unknown**,
but **try to avoid it** — it defeats the purpose of using TypeScript.

---

## 🧠 Safer Alternatives to `any`

| Type      | Description                                                                     | Example                   |
| --------- | ------------------------------------------------------------------------------- | ------------------------- |
| `unknown` | Like `any`, but **requires type checking** before using                         | see below                 |
| `never`   | Represents a value that **never occurs** (e.g., in functions that throw errors) | `throw new Error()`       |
| `void`    | Used for functions that **don’t return a value**                                | `function log(): void {}` |

---

### 🧩 Example: `unknown` Type

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe
}
```

`unknown` forces you to **check the type** before using it — unlike `any`.

---

### 🧩 Example: `never` Type

Used for functions that never return a value (e.g., infinite loops or errors).

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

---

If you omit the type, TypeScript will **infer** it automatically:

```ts
let city = "Karachi"; // inferred as string
// city = 123; ❌ Error: Type 'number' not assignable to type 'string'
```

---

# 🧱 **Non-Primitive (Reference) Types in TypeScript**

Non-primitive types — also called **reference types** — are data types that **store references (memory addresses)** instead of storing the actual value directly.

This means:

> When you assign one non-primitive variable to another, both variables point to the **same memory location**, not separate copies.

---

## 🔹 **1. Arrays in TypeScript**

An **array** is an ordered list of elements. In JavaScript, an array can hold any type of data, but in TypeScript, you can define **what type of data** an array should contain — adding structure and safety.

### ✅ **Two ways to define array types**

```ts
let numbers: number[] = [1, 2, 3, 4]; // Method 1
let fruits: Array<string> = ["Apple", "Banana", "Cherry"]; // Method 2
```

Both methods are valid and do the same thing.
However, `number[]` is shorter and more common.

### ⚙️ **Array with multiple types (Union Array)**

```ts
let mixedArray: (string | number)[] = ["Ali", 22, "Sara", 30];
```

Here, each element can either be a **string** or a **number**.

### 🔍 **Array of Objects Example**

```ts
let students: { name: string; age: number }[] = [
  { name: "Waqar", age: 22 },
  { name: "Rana", age: 25 },
];
```

If you try to add a property that’s not defined, TypeScript will give a compile-time error.

---

## 🔹 **2. Objects**

Objects are **key-value pairs** that can store complex data.
TypeScript allows you to define exactly what keys and value types an object must have.

### ✅ **Example**

```ts
let user: { name: string; age: number; isAdmin: boolean } = {
  name: "Waqar Rana",
  age: 25,
  isAdmin: true,
};
```

### 🧩 **Optional Properties**

Use `?` to make a property optional:

```ts
let person: { name: string; age?: number } = {
  name: "Ali",
};
```

Here, `age` is optional — meaning the object will still be valid if it’s missing.

### ⚠️ **Error Example**

```ts
let user: { name: string; age: number } = { name: "Sara" };
// ❌ Error: Property 'age' is missing
```

TypeScript ensures you don’t miss required data in your objects.

---

## 🔹 **3. Functions with Type Annotations**

Functions are the **heart of TypeScript’s type safety**.
You can define:

* the **type of each parameter**
* and the **type of the returned value**

### ✅ **Function Declaration Example**

```ts
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(10, 5)); // ✅ Output: 15
```

### ⚠️ **Error Example (Without Type Safety)**

```js
function add(a, b) {
  return a + b;
}

add("10", 5); // ❌ JavaScript allows this — results in "105"
```

In TypeScript, the compiler will stop you immediately:

```ts
add("10", 5); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

### 🏹 **Arrow Function Example**

```ts
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

This defines:

* `name` must be a **string**
* return value must also be a **string**

### 🧠 **Function Type Example**

You can define a variable to hold a specific type of function:

```ts
let multiply: (a: number, b: number) => number;

multiply = (a, b) => a * b;
console.log(multiply(3, 4)); // 12
```

---

## 🧱 **4. Type Aliases**

Type aliases let you create **custom reusable types** with the `type` keyword.
It’s useful when the same structure is used multiple times.

### ✅ **Example**

```ts
type User = {
  name: string;
  email: string;
  age?: number; // optional
};

const user1: User = { name: "Ali", email: "ali@gmail.com" };
const user2: User = { name: "Sara", email: "sara@gmail.com", age: 21 };
```

This makes your code **cleaner** and easier to maintain.

---

## 🧩 **5. Interfaces in TypeScript**

An **interface** defines the *shape* of an object.
Think of it as a contract — if you use an interface, your object must follow its rules.

### ✅ **Example**

```ts
interface Person {
  name: string;
  age: number;
  address?: string;
}

const person1: Person = {
  name: "Waqar",
  age: 25,
};

const person2: Person = {
  name: "Rana",
  age: 28,
  address: "Karachi, Pakistan",
};
```

### ⚙️ **Why Use Interfaces?**

* Great for defining object structures.
* Can be **extended** to create hierarchical models.
* Used heavily in large projects and APIs.

---

## 🔄 **Extending Interfaces**

You can create a new interface by building on top of another.

```ts
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: string;
}

const admin: Admin = {
  id: 1,
  name: "Waqar",
  role: "Super Admin",
};
```

✅ The `Admin` interface now includes both `id`, `name`, and `role`.

---

## ⚔️ **6. Interface vs Type Alias**

| Feature                             | Interface        | Type Alias                    |
| ----------------------------------- | ---------------- | ----------------------------- |
| **Extends other types**             | ✅ Yes            | ✅ Yes (using `&`)             |
| **Can merge declarations**          | ✅ Yes            | ❌ No                          |
| **Can represent primitives/unions** | ❌ No             | ✅ Yes                         |
| **Best for**                        | Object structure | Primitive/unions/combinations |

### Example

```ts
// Interface
interface Developer {
  name: string;
  language: string;
}

// Type Alias for Unions
type Status = "active" | "inactive";
```

Both serve similar purposes, but **interfaces** are more common for defining object shapes.

---

## 🧩 **7. Type Safety**

**Type Safety** means TypeScript ensures you use the correct data types.
It prevents bugs and improves code reliability by **catching mistakes early** — before the code even runs.

### ❌ **JavaScript (No Type Safety)**

```js
function multiply(a, b) {
  return a * b;
}
console.log(multiply("5", 2)); // "10" (unexpected)
```

### ✅ **TypeScript (Type Safe)**

```ts
function multiply(a: number, b: number): number {
  return a * b;
}
// multiply("5", 2); // 🚫 Error
console.log(multiply(5, 2)); // ✅ 10
```

TypeScript checks every variable, argument, and return type — saving you from runtime surprises.

---

## ⚙️ **8. Union & Literal Types**

### 🧩 **Union Type**

Allows a variable to have **multiple possible types**.

```ts
let value: string | number;

value = "Hello"; // ✅
value = 100;     // ✅
value = true;    // ❌ Error
```

### 🔸 **Literal Type**

Restricts a variable to a **specific set of values**.

```ts
type Role = "admin" | "user" | "guest";

let myRole: Role = "admin"; // ✅
myRole = "manager"; // ❌ Error
```

This prevents invalid assignments and ensures strict value control.

---

## 🧮 **9. Example Program**

```ts
interface Student {
  name: string;
  rollNo: number;
  isPassed: boolean;
}

function showResult(student: Student): string {
  return `${student.name} (Roll #${student.rollNo}) has ${
    student.isPassed ? "passed ✅" : "failed ❌"
  } the exam.`;
}

const student1: Student = { name: "Rana", rollNo: 101, isPassed: true };

console.log(showResult(student1));
```

### 🖥️ **Output**

```
Rana (Roll #101) has passed ✅ the exam.
```

---

## 🧾 **10. Summary Table**

| Concept             | Description                      | Example                           |
| ------------------- | -------------------------------- | --------------------------------- |
| **Type Annotation** | Define variable types            | `let age: number = 20`            |
| **Interface**       | Define object structure          | `interface User { name: string }` |
| **Type Alias**      | Reusable type definition         | `type ID = number`                |
| **Type Safety**     | Prevents invalid type usage      | Compile-time checking             |
| **Union Types**     | Allow multiple possible types    | `let val: string \| number`       |
| **Literal Types**   | Restrict values to fixed options | `type Role = "admin" \| "user"`   |

---

## 🧠 **Key Takeaways**

✅ Arrays, Objects, and Functions form the core of TypeScript typing.

✅ Use **Type Aliases** or **Interfaces** to define object structure clearly.

✅ TypeScript provides **Type Safety**, reducing runtime bugs.

✅ Use **Union** and **Literal Types** for flexibility with control.

✅ Interfaces are ideal for **defining data models and APIs**.

---

## 💡 Tip:

> Always enable `"strict": true` in your `tsconfig.json` for **maximum type safety**.
> It helps TypeScript detect even minor mistakes in types, improving code quality.

---

# ⚙️ Building a Simple Node.js Server with TypeScript

In this section, you’ll learn how to create and run your **first backend server** using **Node.js** and **TypeScript** — from zero to a running application.

We’ll cover:

* 🧠 What a Server Actually Is
* ⚙️ How Node.js Handles Requests & Responses
* 🪜 Step-by-Step Server Setup Using TypeScript
* 💻 Example Code with Complete Explanation
* 📡 Routing, Paths, and JSON Responses
* 🧩 Bonus: Understanding Headers, Ports, and Status Codes

---

## 🌍 What Is a Server?

> ❓ Common Confusion: “Is a server a computer or a program?”

✅ **Answer:**
A **server** can refer to both:

1. The **hardware (computer)** that stores and delivers data.
2. The **software (program)** that listens for and responds to requests.

So when we say “create a server in Node.js,” we mean **creating a server program** that runs on a machine and responds to client requests.

### 🧠 Simple Definition:

A **server** is a program that:

1. **Listens** for client requests (like from browsers, mobile apps, or APIs)
2. **Processes** those requests
3. **Sends back** a response — data, HTML, JSON, or error messages

**Example:**
When you visit `https://banoqabil.pk/`:

* Your browser sends a **request** to the server.
* The server processes it.
* Then sends back an **HTML page**, **JSON data**, or **error response**.

---

## ⚡ Why Build a Server with Node.js?

Node.js allows you to build **server-side applications** using **JavaScript or TypeScript** — the same language used for frontend.

Here’s why it’s so powerful:

| Feature                      | Description                                                          |
| ---------------------------- | -------------------------------------------------------------------- |
| 🚀 **Fast Performance**      | Runs on Google Chrome’s V8 JavaScript engine.                        |
| ⚙️ **Non-blocking I/O**      | Handles multiple requests simultaneously without waiting.            |
| 🔁 **Asynchronous Nature**   | Doesn’t freeze when waiting for tasks like file reads or DB queries. |
| 💬 **Real-time Support**     | Ideal for chat apps, APIs, and live dashboards.                      |
| 🧩 **TypeScript Compatible** | Gives type safety and better scalability.                            |

---

## 🧩 Step 1: Prerequisites

Before creating your server, ensure you have:

* ✅ **Node.js** installed → [https://nodejs.org/](https://nodejs.org/)
* ✅ **TypeScript** initialized

  ```bash
  npm init -y
  npm install typescript @types/node --save-dev
  npx tsc --init
  ```

This creates a `tsconfig.json` file for TypeScript configuration.

---

## 🧠 Step 2: Project Structure

Organize your project like this:

```
project-folder/
│
├── src/
│   └── index.ts        # Main TypeScript file (server code)
│
├── dist/               # Compiled JavaScript files (auto-generated)
│
├── package.json
└── tsconfig.json
```

---

## 🧱 Step 3: Create a Basic Server

Create a new file:
`src/index.ts`

Add this code:

```ts
import http, { IncomingMessage, ServerResponse } from "http";

// Create a server
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // Set response header
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Welcome to TypeScript Server 🚀");
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
```
When using TypeScript with Node.js, both `req` (request) and `res` (response) objects have specific **TypeScript types** that describe their structure and available properties.
These types come from Node.js’ built-in `@types/node` package.

---

### 🔹 `IncomingMessage`

```ts
import { IncomingMessage } from "http";
```

#### 🧾 Definition:

`IncomingMessage` is the **TypeScript type** that represents the **data coming from the client** — i.e., the **HTTP request**.

Whenever a client (like a browser or Postman) sends a request to your server, Node.js automatically wraps that request in an object of type `IncomingMessage`.

#### 🧩 Common Properties:

| Property                  | Type                  | Description                                                                                   |                                                         |
| ------------------------- | --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `req.url`                 | `string               | undefined`                                                                                    | The URL path requested (e.g., `/about`, `/home`).       |
| `req.method`              | `string               | undefined`                                                                                    | The HTTP method (e.g., `GET`, `POST`, `PUT`, `DELETE`). |
| `req.headers`             | `IncomingHttpHeaders` | The request headers (like `Content-Type`, `Authorization`, etc.).                             |                                                         |
| `req.statusCode`          | `number               | undefined`                                                                                    | Status code (usually used internally).                  |
| `req.on(event, listener)` | Function              | Allows listening to request events like `"data"` and `"end"` (used for reading request body). |                                                         |

#### 🧠 Example:

```ts
if (req.method === "GET" && req.url === "/") {
  console.log("Received a GET request at the home page!");
}
```

So `IncomingMessage` ensures TypeScript knows **which properties exist** and **what types they hold** — giving you **autocompletion and error checking**.

---

### 🔹 `ServerResponse`

```ts
import { ServerResponse } from "http";
```

#### 🧾 Definition:

`ServerResponse` is the **TypeScript type** for the **response object** that the server sends back to the client.
It represents the **outgoing HTTP response**.

This object allows you to:

* Set headers
* Define a status code
* Send text or JSON data
* End the response

#### 🧩 Common Methods:

| Method                               | Description                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| `res.writeHead(statusCode, headers)` | Sets HTTP status and headers. Example: `res.writeHead(200, { "Content-Type": "text/html" })`. |
| `res.statusCode = 200`               | Sets the response status manually.                                                            |
| `res.setHeader(name, value)`         | Adds or modifies a single HTTP header.                                                        |
| `res.write(data)`                    | Sends a chunk of the response body.                                                           |
| `res.end(data?)`                     | Signals that the response is complete (must be called once).                                  |

#### 🧠 Example:

```ts
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify({ message: "Hello from TypeScript Server 🚀" }));
```

Here, `ServerResponse` ensures you can only call methods that exist on a valid Node.js response object — protecting you from typos or misuse.

---

## 🔍 Step 4: Explanation of Each Part

### 1️⃣ `import http, { IncomingMessage, ServerResponse } from "http";`

* Node.js provides a **built-in `http` module** — no installation required.
* It allows you to **create servers, send requests, and manage responses**.

---

### 2️⃣ `http.createServer((req: IncomingMessage, res: ServerResponse) => {...})`

* This method **creates an HTTP server** that listens for requests.
* It takes a callback with two parameters:

  * `req` → represents the **incoming request**
  * `res` → represents the **response** object

Example:

```ts
req.url    // The requested path, e.g., "/about"
req.method // The HTTP method, e.g., "GET" or "POST"
```

---

### 3️⃣ `res.writeHead(200, { "Content-Type": "text/plain" });`

* This sets the **status code** and **headers** for the response.

| Concept         | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| **Status Code** | Tells the client whether the request succeeded (e.g., 200 OK, 404 Not Found). |
| **Headers**     | Provide meta-information about the response (like format, length, encoding).  |

Example:

```ts
"Content-Type": "text/plain"      // plain text
"Content-Type": "application/json" // JSON data
"Content-Type": "text/html"        // HTML content
```

**💡 Why headers are important?**
If you don’t specify the content type, the browser won’t know how to interpret the data — it might display it incorrectly or even trigger download behavior.

---

### 4️⃣ `res.end("Welcome...")`

* Ends the response and sends data back to the client.
* Without `res.end()`, the server keeps waiting and the page won’t load.

---

### 5️⃣ `server.listen(3000, callback)`

* Starts the server on **port 3000** (like your app’s “door number”).
* You can access it via:
  `http://localhost:3000`

**Common Ports:**

| Port | Usage                       |
| ---- | --------------------------- |
| 3000 | React / Node.js development |
| 4000 | API servers                 |
| 5000 | Custom backend              |

---

## 🧮 Step 5: Compile and Run

### Option 1 – Manual Compilation

```bash
npx tsc
node dist/index.js
```

### Option 2 – Using ts-node (direct execution)

```bash
npx ts-node src/index.ts
```

### Option 3 – Using tsx (recommended)

```bash
npx tsx src/index.ts
```

---

## 📡 Step 6: Handling Multiple Routes

Now let’s serve different pages based on the request URL.

```ts
import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/") {
    res.end("🏠 Home Page");
  } else if (req.url === "/about") {
    res.end("ℹ️ About Page");
  } else {
    res.statusCode = 404;
    res.end("❌ Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
```

---

### 🧭 Understanding Path, URL, and Endpoint

| Term         | Meaning                     | Example                     |
| ------------ | --------------------------- | --------------------------- |
| **URL**      | Full address of a resource  | `https://example.com/about` |
| **Path**     | The part after the domain   | `/about`                    |

So in the above example:

* `/` → Home route
* `/about` → About route

---

## ⚙️ Sending JSON Responses

If you want to send structured data (like APIs), use **JSON** format.

```ts
if (req.url === "/user") {
  res.writeHead(200, { "Content-Type": "application/json" });
  const user = { name: "Waqar Rana", role: "Developer" };
  res.end(JSON.stringify(user));
}
```

### ❓Why use `JSON.stringify()`?

Because the `res.end()` method only sends **text data**, not objects.
`JSON.stringify()` converts a JavaScript object into a **JSON string** that the client can understand.

Example:

```json
{
  "name": "Waqar Rana",
  "role": "Developer"
}
```

---

## 🧰 Step 7: Add Scripts in package.json

To simplify running your app, edit your `package.json`:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "npx tsx src/index.ts"
}
```

Now you can run:

```bash
npm run dev
```

---

## 🧾 Summary

| Concept               | Description                                   |
| --------------------- | --------------------------------------------- |
| `http.createServer()` | Creates a new Node.js HTTP server             |
| `req` / `res`         | Handle incoming request and outgoing response |
| `res.writeHead()`     | Set status code and headers                   |
| `res.end()`           | Send and finish the response                  |
| `server.listen()`     | Starts the server and listens on a port       |
| `tsx` / `ts-node`     | Run TypeScript directly without compiling     |

---

## 🚀 Final Output

Run the server:

```bash
npm run dev
```

Terminal Output:

```
✅ Server running at http://localhost:3000
```

Browser Output:

```
Welcome to TypeScript Server 🚀
```

---

## 🧩 Bonus Tip: From Native to Frameworks

Once you understand **native Node.js servers**, you can easily move to frameworks like:

| Framework      | Description                                      |
| -------------- | ------------------------------------------------ |
| **Express.js** | Most popular Node.js framework for APIs          |
| **NestJS**     | Enterprise-grade framework built with TypeScript |
| **Fastify**    | Lightweight and performance-focused alternative  |

They build on top of what you just learned — handling routes, requests, and responses automatically.

---

## 🧩 Hands On Practice:

1. Hands-on: Create a TypeScript-powered Node.js server including different routes and responses.