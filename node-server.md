# ⚙️ Building a Simple Node.js Server with TypeScript

In this section, you’ll learn how to create and run your **first backend server** using **Node.js** and **TypeScript**.
We’ll cover:

* What a server actually is 🧠
* How Node.js handles requests and responses ⚙️
* Step-by-step setup using TypeScript 🪜
* Example code with detailed explanation

---

## 🌍 What is a Server?

A **server** is a program that:

1. **Listens** for client requests (like from browsers or APIs)
2. **Processes** those requests
3. **Sends responses** back to the client

Example:

> You visit `https://creativebrain.dev`.
> Your browser sends a **request** to the server →
> The server processes it →
> Responds with an **HTML page**, **JSON data**, or **error message**.

---

## ⚡ Why Build a Server in Node.js?

Node.js allows developers to write **server-side applications** using **JavaScript or TypeScript**.

✅ Reasons to use Node.js:

* It’s **fast** (built on Chrome’s V8 engine)
* It’s **asynchronous** (non-blocking I/O)
* Perfect for **real-time applications** (like chat apps or APIs)
* Works **seamlessly with TypeScript**

---

## 🧩 Step 1: Prerequisites

Before creating your server, make sure you have:

* Node.js installed → [https://nodejs.org/](https://nodejs.org/)
* TypeScript project already initialized
  (i.e. you’ve already done `npm init -y` and `npx tsc --init`)

If not, follow your earlier setup steps for TypeScript configuration.

---

## 🧠 Step 2: Project Structure

Let’s organize our project like this:

```
project-folder/
│
├── src/
│   └── index.ts      # Our main TypeScript server file
│
├── dist/             # Compiled JavaScript files will go here
│
├── package.json
└── tsconfig.json
```

---

## 🧱 Step 3: Write Your First Server (Using Native Node.js)

Create a new file:
`src/index.ts`

Add this code:

```ts
import http from "http"; // Node.js built-in module

// Create a server
const server = http.createServer((req, res) => {
  // Set response header
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Handle different routes (URLs)
  if (req.url === "/") {
    res.end("Welcome to TypeScript Server 🚀");
  } else if (req.url === "/about") {
    res.end("This is the About Page 🌐");
  } else {
    res.statusCode = 404;
    res.end("404 - Page Not Found ❌");
  }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
```

---

## 🧩 Step 4: Explanation of Each Part

### 🧱 1. `import http from "http";`

* Node.js provides a **built-in `http` module** to create web servers.
* No need to install it separately.
* It allows you to **create, listen, and respond** to HTTP requests.

---

### ⚙️ 2. `http.createServer((req, res) => {...})`

This creates a new **HTTP server instance**.

* `req` → represents the **incoming request** (e.g., URL, headers, method)
* `res` → represents the **response** object (used to send data back)

Example:

```ts
req.url        // returns the requested path, e.g. "/about"
req.method     // returns the HTTP method, e.g. "GET"
```

---

### 🏷️ 3. `res.writeHead(200, { "Content-Type": "text/plain" });`

* Sets the **status code** and **response headers**.
* Status `200` means "OK".
* Header `Content-Type: text/plain` means we’re returning **plain text**.

Example of other types:

```ts
"Content-Type": "application/json" // for JSON data
"Content-Type": "text/html"        // for HTML pages
```

---

### 🔁 4. Handling Different Routes

We use `if` conditions to check which URL the client requested.

```ts
if (req.url === "/") {
  res.end("Home Page");
} else if (req.url === "/about") {
  res.end("About Page");
} else {
  res.statusCode = 404;
  res.end("Not Found");
}
```

This is called **basic routing** — responding differently based on URLs.

---

### 🎧 5. `server.listen(3000, callback)`

This **starts the server** on port `3000`.

* Port is like the “door number” for your application.
* Common development ports: `3000`, `4000`, `5000`.

Callback runs when the server is successfully started.

---

## ⚙️ Step 5: Compile and Run

### Option 1️⃣ – Using TypeScript Compiler

Manually compile and run:

```bash
npx tsc
node dist/index.js
```

### Option 2️⃣ – Using ts-node (direct execution)

Run without compiling:

```bash
npx ts-node src/index.ts
```

### Option 3️⃣ – Using tsx (modern, faster)

If you installed `tsx`, run:

```bash
npx tsx src/index.ts
```

---

## 🧭 Step 6: Test Your Server

Open your browser or use `curl` / `Postman`:

| URL                           | Response                        |
| ----------------------------- | ------------------------------- |
| `http://localhost:3000/`      | Welcome to TypeScript Server 🚀 |
| `http://localhost:3000/about` | This is the About Page 🌐       |
| `http://localhost:3000/hello` | 404 - Page Not Found ❌          |

---

## 🧰 Step 7: Add Script in package.json

To simplify running your project, add a script inside your `package.json`:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "tsx src/index.ts"
}
```

Now run:

```bash
npm run dev
```

✅ This automatically starts your TypeScript server using `tsx`.

---

## 🧾 Understanding HTTP Status Codes

| Code  | Meaning               | Example                       |
| ----- | --------------------- | ----------------------------- |
| `200` | OK                    | Successful request            |
| `201` | Created               | Resource created successfully |
| `400` | Bad Request           | Invalid data from client      |
| `404` | Not Found             | Resource doesn’t exist        |
| `500` | Internal Server Error | Unexpected error on server    |

---

## 🧩 Bonus: Send JSON Response

Instead of plain text, let’s send **JSON data** (commonly used in APIs):

```ts
if (req.url === "/user") {
  res.writeHead(200, { "Content-Type": "application/json" });
  const user = { name: "Waqar Rana", role: "Developer" };
  res.end(JSON.stringify(user));
}
```

### Output:

```json
{
  "name": "Waqar Rana",
  "role": "Developer"
}
```

---

## 💡 Summary

| Concept               | Description                            |
| --------------------- | -------------------------------------- |
| `http.createServer()` | Creates a Node.js HTTP server          |
| `req` / `res`         | Handle request and response            |
| `res.writeHead()`     | Set response headers and status code   |
| `res.end()`           | Send the response                      |
| `server.listen()`     | Start listening for client requests    |
| `tsx` / `ts-node`     | Tools to run TypeScript files directly |

---

## 🚀 Final Output

When you run:

```bash
npm run dev
```

Output in terminal:

```
✅ Server running at http://localhost:3000
```

Then, visiting `http://localhost:3000/` in your browser will show:

```
Welcome to TypeScript Server 🚀
```

---