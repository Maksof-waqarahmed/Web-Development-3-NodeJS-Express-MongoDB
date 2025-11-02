# 📦 Working with JSON Data in Node.js and TypeScript

When building **APIs** with **Node.js + TypeScript**, you’ll often send and receive **JSON (JavaScript Object Notation)** data.
JSON is the most common format for exchanging data between a **client (frontend)** and a **server (backend)**.

This guide covers:

1. What JSON is
2. How to parse JSON data from a client request
3. How to send JSON responses
4. Common errors and best practices
5. Full working example with Express + TypeScript

---

## 🧠 What is JSON?

**JSON (JavaScript Object Notation)** is a lightweight data format used to store and exchange data.

It looks like a JavaScript object but is **pure text**.

### ✅ Example of JSON:

```json
{
  "name": "Waqar Rana",
  "age": 25,
  "skills": ["JavaScript", "TypeScript", "Node.js"]
}
```

---

## ⚙️ Why Do We Use JSON?

1. 🌍 It’s **universal** — works in all programming languages.
2. ⚡ It’s **lightweight** — uses simple key-value pairs.
3. 🔁 It’s **easy to parse and stringify** (convert between object and text).
4. 🤝 It’s the **standard format** for APIs and web communication.

---

## 📥 Parsing JSON in Express (Receiving Data from Client)

When a client (like React or Postman) sends data to your server, it sends it as **JSON** in the request body.

To read that data in Express, we use a built-in middleware:

```ts
app.use(express.json());
```

This middleware automatically converts **JSON text** into a **JavaScript object**, so you can easily access it in your code.

---

### 🧩 Example: Receiving JSON Data

Create a file: `src/server.ts`

```ts
import express, { Request, Response } from "express";

const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.post("/user", (req: Request, res: Response) => {
  const userData = req.body; // Access parsed JSON data here
  console.log("Received data:", userData);

  res.status(200).json({
    message: "User data received successfully!",
    receivedData: userData,
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
```

### 🧠 Explanation:

* `app.use(express.json())` → Converts incoming JSON text into a JS object.
* `req.body` → Contains the parsed JSON data.
* `res.json()` → Sends a JSON response back to the client.

---

### 🧪 Test This API in Postman:

1. Open **Postman**
2. Set method to `POST`
3. URL: `http://localhost:3000/user`
4. Go to **Body → raw → JSON**
5. Paste this data:

   ```json
   {
     "name": "Waqar",
     "age": 22
   }
   ```
6. Click **Send**

✅ You’ll see:

```json
{
  "message": "User data received successfully!",
  "receivedData": {
    "name": "Waqar",
    "age": 22
  }
}
```

---

## 📤 Sending JSON Responses

Express provides a built-in method `res.json()` to send JSON data back to the client.

### Example:

```ts
app.get("/product", (req: Request, res: Response) => {
  const product = {
    id: 101,
    name: "Laptop",
    price: 150000,
  };

  res.status(200).json(product);
});
```

### 🔍 What Happens:

* The client sends a **GET** request.
* The server sends a **JSON** object back.
* Express automatically sets the correct **Content-Type: application/json** header.

---

## 🔄 Converting Between JSON and JavaScript Objects

Sometimes, you’ll manually convert between JSON and JS objects.

### 1. Convert JS Object → JSON String

```ts
const obj = { name: "Waqar", age: 22 };
const jsonString = JSON.stringify(obj);
console.log(jsonString);
```

🟩 Output:

```
{"name":"Waqar","age":22}
```

### 2. Convert JSON String → JS Object

```ts
const jsonData = '{"name":"Waqar","age":22}';
const parsedData = JSON.parse(jsonData);
console.log(parsedData.name);
```

🟩 Output:

```
Waqar
```

---

## 🚫 Common Errors

| Error                           | Cause                                     | Solution                                    |
| ------------------------------- | ----------------------------------------- | ------------------------------------------- |
| `SyntaxError: Unexpected token` | Invalid JSON format                       | Check for missing quotes or commas          |
| `req.body is undefined`         | Forgot to use `express.json()` middleware | Add `app.use(express.json())` before routes |
| Empty response                  | Forgot to send response                   | Always use `res.json()` or `res.send()`     |

---

## ⚡ Full Working Example

### `src/server.ts`

```ts
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// POST route to receive data
app.post("/api/data", (req: Request, res: Response) => {
  const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: "Name and city are required" });
  }

  res.status(200).json({
    message: `Hello ${name} from ${city}!`,
  });
});

// GET route to send data
app.get("/api/info", (req: Request, res: Response) => {
  const info = {
    app: "JSON Example",
    version: "1.0.0",
    author: "Waqar Rana",
  };
  res.json(info);
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
```

---

## 🧠 Summary

| Task                   | Method / Function     | Description                              |
| ---------------------- | --------------------- | ---------------------------------------- |
| Parse JSON             | `express.json()`      | Converts incoming JSON text to JS object |
| Send JSON response     | `res.json(data)`      | Sends JSON data with correct header      |
| Convert object to JSON | `JSON.stringify(obj)` | Converts JS object to JSON text          |
| Convert JSON to object | `JSON.parse(str)`     | Converts JSON string to JS object        |

---

## 💡 Best Practices

1. Always use `express.json()` before defining routes.
2. Validate data before using it (`if (!req.body.name) {...}`).
3. Return consistent response formats (`{ message, data, error }`).
4. Handle JSON parsing errors gracefully with try-catch.
5. Use TypeScript types/interfaces for safer data handling.

---