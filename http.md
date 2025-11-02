# 🌐 Introduction to RESTful APIs and HTTP Methods

## 📘 Overview

Modern web and mobile apps need a way to **communicate** with servers to exchange data — that’s where **APIs** come in.
In backend development, the most common type of API is the **RESTful API**.

This guide covers:

* What an API is 🧠
* What REST means ⚙️
* HTTP methods (GET, POST, PUT, DELETE)
* How REST APIs work in Node.js
* Example with TypeScript

---

## 🧠 What is an API?

**API** stands for **Application Programming Interface**.

In simple terms:

> It’s a way for two applications (or systems) to talk to each other.

Example:
When you open Instagram:

* The mobile app calls the **Instagram API** on the backend.
* That API sends back your profile data, images, and likes.

In backend development:

> APIs allow frontend apps (React, mobile, etc.) to **communicate** with your Node.js server.

---

## 🔁 How API Communication Works

Here’s the simple client–server flow:

```
Frontend (React / Browser) → Sends Request → Backend Server (Node.js)
Backend → Processes Request → Sends Response (JSON)
```

Example:

```
GET /users → returns all users
POST /users → creates a new user
PUT /users/1 → updates user with ID 1
DELETE /users/1 → deletes user with ID 1
```

---

## ⚙️ What is REST?

**REST** stands for **Representational State Transfer**.
It’s an **architectural style** for designing APIs.

A **RESTful API** follows these principles:

| Principle             | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| **Client-Server**     | Frontend (client) and backend (server) are separate                         |
| **Stateless**         | Each request contains all info needed — server doesn’t store previous state |
| **Uniform Interface** | Consistent endpoints and formats                                            |
| **Resource-Based**    | Data (like users, posts, products) are called *resources*                   |
| **HTTP Methods**      | Uses standard HTTP methods for CRUD operations                              |

---

## 📦 Example of a RESTful Resource

Let’s say we’re building an API for managing books.

| Action            | HTTP Method | Endpoint     | Description              |
| ----------------- | ----------- | ------------ | ------------------------ |
| Create a new book | `POST`      | `/books`     | Adds a new book          |
| Get all books     | `GET`       | `/books`     | Retrieves all books      |
| Get single book   | `GET`       | `/books/:id` | Retrieves one book by ID |
| Update a book     | `PUT`       | `/books/:id` | Updates book info        |
| Delete a book     | `DELETE`    | `/books/:id` | Removes a book           |

---

## 🧩 Common HTTP Methods Explained

### 🟩 1. **GET**

* Used to **read/fetch** data.
* Doesn’t change anything on the server.

**Example:**

```bash
GET /books
```

**Response:**

```json
[
  { "id": 1, "title": "Atomic Habits" },
  { "id": 2, "title": "Deep Work" }
]
```

---

### 🟦 2. **POST**

* Used to **create** a new resource.
* Data is sent in the **request body**.

**Example:**

```bash
POST /books
```

**Request Body:**

```json
{ "title": "The Alchemist" }
```

**Response:**

```json
{ "message": "Book added successfully!" }
```

---

### 🟨 3. **PUT**

* Used to **update** an existing resource.
* Replaces the entire object (not partial updates).

**Example:**

```bash
PUT /books/2
```

**Request Body:**

```json
{ "title": "Deep Work (Updated Edition)" }
```

**Response:**

```json
{ "message": "Book updated successfully!" }
```

---

### 🟥 4. **DELETE**

* Used to **remove** a resource.

**Example:**

```bash
DELETE /books/2
```

**Response:**

```json
{ "message": "Book deleted successfully!" }
```

---

## 💬 Bonus: PATCH vs PUT

| Method    | Usage          | Behavior                     |
| --------- | -------------- | ---------------------------- |
| **PUT**   | Full update    | Replaces the entire resource |
| **PATCH** | Partial update | Updates only specific fields |

**Example (PATCH):**

```bash
PATCH /books/1
```

**Request Body:**

```json
{ "author": "James Clear" }
```

---

## 🧠 REST API Example in Node.js + TypeScript

Let’s build a simple RESTful API with Node’s `http` module (no Express yet).

### 📁 Folder Structure

```
project/
├── src/
│   └── server.ts
├── package.json
└── tsconfig.json
```

### ✨ Code: `src/server.ts`

```ts
import http, { IncomingMessage, ServerResponse } from "http";

let books = [
  { id: 1, title: "Atomic Habits" },
  { id: 2, title: "Deep Work" }
];

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/books") {
    res.end(JSON.stringify(books));
  } 
  else if (req.method === "POST" && req.url === "/books") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const newBook = JSON.parse(body);
      books.push({ id: books.length + 1, ...newBook });
      res.statusCode = 201;
      res.end(JSON.stringify({ message: "Book added successfully!" }));
    });
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
```

---

## ⚙️ How It Works

1. `req.method` checks the HTTP method (GET, POST, etc.)
2. `req.url` checks which route was hit
3. For `POST`, we collect incoming data chunks, parse them as JSON, and update our array
4. Responses are sent in JSON format

---

## 🧭 Test the API

Use **Postman**, **cURL**, or browser:

| Method | Endpoint                      | Description                 |
| ------ | ----------------------------- | --------------------------- |
| GET    | `http://localhost:3000/books` | Get all books               |
| POST   | `http://localhost:3000/books` | Add a book (send JSON body) |

Example POST body:

```json
{ "title": "Rich Dad Poor Dad" }
```

---

## 📦 Output Example

### ➤ GET /books

```json
[
  { "id": 1, "title": "Atomic Habits" },
  { "id": 2, "title": "Deep Work" },
  { "id": 3, "title": "Rich Dad Poor Dad" }
]
```

### ➤ POST /books

```json
{ "message": "Book added successfully!" }
```

---

## 📚 Summary

| Term             | Meaning                                        |
| ---------------- | ---------------------------------------------- |
| **API**          | Interface for communication between systems    |
| **REST**         | Architecture style for APIs                    |
| **Resource**     | Data entity (user, book, post, etc.)           |
| **HTTP Methods** | Standard CRUD actions (GET, POST, PUT, DELETE) |
| **Status Codes** | Indicate success or error of requests          |

---

## 🧾 Common HTTP Status Codes

| Code | Meaning               | Description                   |
| ---- | --------------------- | ----------------------------- |
| 200  | OK                    | Request successful            |
| 201  | Created               | Resource created successfully |
| 400  | Bad Request           | Client sent invalid data      |
| 404  | Not Found             | Resource doesn’t exist        |
| 500  | Internal Server Error | Something broke on the server |

---

## 🚀 Next Step

Now that you understand RESTful APIs and HTTP methods,
the **next step** is to implement them using **Express.js with TypeScript**,
which simplifies routing and request handling dramatically.

---