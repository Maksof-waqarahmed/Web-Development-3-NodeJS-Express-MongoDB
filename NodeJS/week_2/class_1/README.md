# 🌐 Understanding HTTP Status Codes in Node.js & TypeScript

HTTP status codes are **three-digit numbers** returned by a server to tell the client (like a browser, mobile app, or API) **what happened** after making a request.

Every time you send a request — for example, visiting a page, submitting a form, or fetching API data — the server replies with a **status code** that helps describe the **result** of that operation.

---

## ⚙️ What is an HTTP Status Code?

An **HTTP Status Code** is part of the **response message** sent from the server to the client.
It informs the client whether the request was successful, redirected, failed, or caused an error.

### Example:

```bash
GET /home HTTP/1.1
Host: localhost:3000
```

Server response:

```bash
HTTP/1.1 200 OK
Content-Type: text/html
```

Here:

* `200` → is the **status code**
* `OK` → is the **status message**

---

## 🧭 The 5 Categories of HTTP Status Codes

| Category | Range   | Meaning                                                      |
| -------- | ------- | ------------------------------------------------------------ |
| **1xx**  | 100–199 | Informational – Request received, continuing process         |
| **2xx**  | 200–299 | Success – Request was successfully received and processed    |
| **3xx**  | 300–399 | Redirection – Further action needed (e.g., new URL)          |
| **4xx**  | 400–499 | Client Error – The request had an issue from client-side     |
| **5xx**  | 500–599 | Server Error – The server failed to complete a valid request |

---

## 🧩 1xx – Informational Responses

These are **rarely used** in modern applications.
They simply mean *“the request has started processing”*.

| Code | Name                | Brief Meaning                                                                               |
| ---- | ------------------- | ------------------------------------------------------------------------------------------- |
| 100  | Continue            | Server received initial part of request; client should continue. ([iana.org][1])            |
| 101  | Switching Protocols | Server will switch protocols (e.g., to WebSocket) as requested. ([iana.org][1])             |
| 102  | Processing          | Server received request and is processing it, but not yet a final response. ([iana.org][1]) |
| 103  | Early Hints         | Used to send preliminary headers (e.g., Link) before full response. ([Wikipedia][2])        |

---

## ✅ 2xx – Success Codes

These indicate that the client’s request was **successfully received, understood, and accepted**.

| Code | Name                          | Brief Meaning                                                                                                                                                      |
| ---- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 200  | OK                            | Standard success for GET, POST etc. ([iana.org][1])                                                                                                                |
| 201  | Created                       | Request succeeded and a new resource was created. ([iana.org][1])                                                                                                  |
| 202  | Accepted                      | Request accepted but processing not yet complete. ([iana.org][1])                                                                                                  |
| 203  | Non-Authoritative Information | Response from a proxy rather than the origin server. ([iana.org][1])                                                                                               |
| 204  | No Content                    | Success but no content to send back. ([iana.org][1])                                                                                                               |
| 205  | Reset Content                 | Success; client should reset view. ([iana.org][1])                                                                                                                 |
| 206  | Partial Content               | Partial data sent in response to a “Range” request. ([iana.org][1])                                                                                                |
| 207  | Multi-Status                  | WebDAV: multiple responses for multiple operations. ([iana.org][1])                                                                                                |
| 208  | Already Reported              | WebDAV: members of a DAV binding list already reported. ([iana.org][1])                                                                                            |
| 226  | IM Used                       | The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations. ([iana.org][1]) |

### 🧠 Example:

```ts
res.writeHead(201, { "Content-Type": "application/json" });
res.end(JSON.stringify({ message: "User created successfully ✅" }));
```

---

## 🔁 3xx – Redirection Codes

These codes tell the client that the **requested resource has moved** to another URL or location.

| Code | Name                                 | Brief Meaning                                                               |
| ---- | ------------------------------------ | --------------------------------------------------------------------------- |
| 300  | Multiple Choices                     | Multiple options for the resource; user or agent to choose. ([iana.org][1]) |
| 301  | Moved Permanently                    | Resource permanently moved to new URI. ([Wikipedia][3])                     |
| 302  | Found (formerly “Moved Temporarily”) | Resource temporarily at a different URI. ([iana.org][1])                    |
| 303  | See Other                            | Response to request can be found under another URI by GET. ([iana.org][1])  |
| 304  | Not Modified                         | Resource not modified since last request; use cache. ([iana.org][1])        |
| 305  | Use Proxy                            | Requested resource available only via proxy. ([iana.org][1])                |
| 306  | (Unused)                             | Previously “Switch Proxy”, now unused. ([Wikipedia][2])                     |
| 307  | Temporary Redirect                   | Like 302 but method must not change. ([iana.org][1])                        |
| 308  | Permanent Redirect                   | Like 301 but method cannot change. ([iana.org][1])                          |

### 🧠 Example:

```ts
res.writeHead(301, { Location: "/new-page" });
res.end();
```

This sends a **redirect** to the client, taking them automatically to `/new-page`.

---

## ⚠️ 4xx – Client Error Codes

These indicate problems with the **client’s request** — such as wrong data, missing authorization, or invalid routes.

| Code | Name                                         | Brief Meaning                                                                                               |
| ---- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request                                  | Client sent invalid request. ([REST API Tutorial][4])                                                       |
| 401  | Unauthorized                                 | Authentication required and has failed or not yet provided. ([iana.org][1])                                 |
| 402  | Payment Required                             | Reserved for future use / digital payments. ([iana.org][1])                                                 |
| 403  | Forbidden                                    | Server understands request but refuses to authorize. ([Wikipedia][5])                                       |
| 404  | Not Found                                    | Requested resource not found. ([REST API Tutorial][4])                                                      |
| 405  | Method Not Allowed                           | Method not supported for the resource. ([REST API Tutorial][4])                                             |
| 406  | Not Acceptable                               | Server cannot generate content acceptable by client. ([REST API Tutorial][4])                               |
| 407  | Proxy Authentication Required                | Client must authenticate with proxy. ([REST API Tutorial][4])                                               |
| 408  | Request Timeout                              | Server timed out waiting for request. ([iana.org][1])                                                       |
| 409  | Conflict                                     | Request conflicts with current state of server. ([iana.org][1])                                             |
| 410  | Gone                                         | Resource no longer available and no forwarding address. ([REST API Tutorial][4])                            |
| 411  | Length Required                              | Server refuses to accept request without Content-Length header. ([iana.org][1])                             |
| 412  | Precondition Failed                          | One or more conditions given in request headers failed. ([iana.org][1])                                     |
| 413  | Payload Too Large / Request Entity Too Large | Request is larger than server is willing/able to process. ([REST API Tutorial][4])                          |
| 414  | URI Too Long                                 | URI requested is too long. ([iana.org][1])                                                                  |
| 415  | Unsupported Media Type                       | Request entity has a media type the server does not support. ([REST API Tutorial][4])                       |
| 416  | Range Not Satisfiable                        | Requested range cannot be fulfilled. ([iana.org][1])                                                        |
| 417  | Expectation Failed                           | Server cannot meet the requirements of the Expect header. ([iana.org][1])                                   |
| 418  | I’m a Teapot (RFC 2324)                      | Easter-egg code; server refuses to brew coffee. ([Wikipedia][2])                                            |
| 421  | Misdirected Request                          | Request directed at a server that is not able to produce a response. ([iana.org][1])                        |
| 422  | Unprocessable Entity                         | WebDAV: request was well-formed but unable to process. ([iana.org][1])                                      |
| 423  | Locked                                       | WebDAV: resource is locked. ([iana.org][1])                                                                 |
| 424  | Failed Dependency                            | WebDAV: failure in previous request dependency. ([iana.org][1])                                             |
| 425  | Too Early                                    | Indicates that the server is unwilling to risk processing a request that might be replayed. ([iana.org][1]) |
| 426  | Upgrade Required                             | Client should switch to a different protocol. ([iana.org][1])                                               |
| 428  | Precondition Required                        | Request must be conditional. ([iana.org][1])                                                                |
| 429  | Too Many Requests                            | Client sent too many requests in a given amount of time ("rate limiting"). ([iana.org][1])                  |
| 431  | Request Header Fields Too Large              | Server refuses because headers are too large. ([iana.org][1])                                               |
| 451  | Unavailable For Legal Reasons                | Resource unavailable for legal/censorship reason. ([WIRED][6])                                              |

### 🧠 Example:

```ts
if (req.url !== "/home") {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 - Page Not Found ❌");
}
```

---

## 💣 5xx – Server Error Codes

These indicate that the **server failed** to fulfill a valid request due to internal issues.

| Code | Name                            | Brief Meaning                                                                                            |
| ---- | ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 500  | Internal Server Error           | Generic server error when no more specific code fits. ([iana.org][1])                                    |
| 501  | Not Implemented                 | Server does not support functionality required to fulfill request. ([iana.org][1])                       |
| 502  | Bad Gateway                     | Server, while acting as gateway/proxy, received invalid response from upstream server. ([Wikipedia][7])  |
| 503  | Service Unavailable             | Server currently unavailable (overloaded/maintenance). ([iana.org][1])                                   |
| 504  | Gateway Timeout                 | Gateway or proxy did not get response in time. ([iana.org][1])                                           |
| 505  | HTTP Version Not Supported      | Server does not support HTTP protocol version used in request. ([iana.org][1])                           |
| 506  | Variant Also Negotiates         | Internal server error; transparent content negotiation loop. ([iana.org][1])                             |
| 507  | Insufficient Storage            | WebDAV: Server unable to store representation needed to complete request. ([iana.org][1])                |
| 508  | Loop Detected                   | WebDAV: Server detected infinite loop while processing a request with “Depth: infinity”. ([iana.org][1]) |
| 510  | Not Extended                    | Further extensions to the request are required for server to fulfil it. ([iana.org][1])                  |
| 511  | Network Authentication Required | Client needs network authentication (e.g., captive portal) before accessing network. ([iana.org][1])     |

### 🧠 Example:

```ts
try {
  throw new Error("Unexpected failure");
} catch (error) {
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Internal Server Error 💥" }));
}
```

---

### 📌 Notes:

* For most typical API/back-end work, you’ll mainly use a subset: **200, 201, 204, 301, 400, 401, 403, 404, 422, 429, 500, 503** etc.

---

## 💡 Why Status Codes Are Important

| Benefit                    | Explanation                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| 🧠 **Clear Communication** | Helps the client know whether the request was successful or failed. |
| ⚙️ **Debugging**           | Developers can easily identify what went wrong.                     |
| 🔒 **Security**            | Proper use of codes prevents exposing sensitive info.               |
| 🌍 **Standardization**     | Every system (browser, mobile, backend) understands these codes.    |

---

## 🧩 Complete Example in TypeScript

Here’s a small **Node.js + TypeScript** server demonstrating multiple status codes:

```ts
import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("✅ Home Page - Status: 200 OK");
  } 
  else if (req.url === "/create") {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Resource created successfully" }));
  } 
  else if (req.url === "/redirect") {
    res.writeHead(301, { Location: "/new-location" });
    res.end();
  } 
  else if (req.url === "/error") {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("💥 Internal Server Error");
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("❌ Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
```

---

## 🧭 Output Summary

| URL         | Status Code | Response                     |
| ----------- | ----------- | ---------------------------- |
| `/`         | 200         | ✅ Home Page - OK             |
| `/create`   | 201         | JSON: Resource created       |
| `/redirect` | 301         | Redirects to `/new-location` |
| `/error`    | 500         | 💥 Internal Server Error     |
| `/random`   | 404         | ❌ Page Not Found             |

---

## 🧱 Quick Tips for Professionals

✅ Always use **meaningful status codes** in APIs (never send 200 for all cases).
✅ Combine with proper **JSON responses** like `{ "success": false, "message": "Not Found" }`.
✅ Log `500` errors on the server — they usually mean code bugs.
✅ Use tools like **Postman** or **curl** to test different response scenarios.
✅ Keep your API consistent — always return standard formats.

---

## 🧩 Practice Tasks (For Students)

1. Create a simple server that:

   * Returns `200` for `/`
   * Returns `201` for `/create`
   * Returns `404` for `/notfound`
   * Returns `500` for `/error`
2. Log the status code and URL in the console each time a request is made.
3. Try returning JSON responses instead of plain text.

---

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

### Visual Representation

<img src="./images/api-works" alt="API Communication" />

Example:
When you open Instagram:

* The mobile app calls the **Instagram API** on the backend.
* That API sends back your profile data, images, and likes.

In backend development:

> APIs allow frontend apps (React, mobile, etc.) to **communicate** with your Node.js server.

---

## 🔁 How API Communication Works

### Visual Representation

<img src="./images/rest3.png" alt="API Flow" />

---

## ⚙️ What is REST?

**REST** stands for **Representational State Transfer**.
It’s not a programming language or a framework — it’s an **architectural style** or **set of rules** for building scalable, maintainable, and efficient **web APIs**.

A **RESTful API** is an API that **follows REST principles** and communicates over the **HTTP protocol**.

---

## 🧠 Simple Understanding

Imagine a restaurant 🍽️:

* You (the client) request a dish from the waiter.
* The waiter (the API) takes your request to the chef.
* The chef (the server/database) prepares your food and sends it back through the waiter.

Similarly:

* The **client** sends an HTTP request.
* The **server** processes it and sends back a **response**.
* The **API** is the medium connecting both.

That’s **REST in action** — simple, consistent, and stateless communication between client and server.

---

A **RESTful API** follows these principles:

| Principle             | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| **Client-Server**     | Frontend (client) and backend (server) are separate                         |
| **Stateless**         | Each request contains all info needed — server doesn’t store previous state |
| **Uniform Interface** | Consistent endpoints and formats                                            |
| **Resource-Based**    | Data (like users, posts, products) are called *resources*                   |
| **HTTP Methods**      | Uses standard HTTP methods for CRUD operations                              |
  
---

### Visual Representation

<img src="./images/rest4.png" alt="RESTful API" />

<img src="./images/rest2.jpg" alt="RESTful API" />


## 🌐 Understanding HTTP Methods in Backend Development

HTTP methods (also known as **HTTP verbs**) define the **type of action** you want to perform on a resource (data) in a web server.

These methods tell the server **what you want to do** — such as:

* Fetch data
* Create new data
* Update existing data
* Delete data

---

## ⚙️ What is HTTP?

**HTTP (HyperText Transfer Protocol)** is the foundation of data communication on the web.
It defines **how clients (like browsers or apps)** and **servers** communicate.

When you visit a website or call an API:

1. Your browser (client) sends an **HTTP request**.
2. The server processes it and sends back an **HTTP response**.

Each request includes:

* **Method** (e.g., GET, POST)
* **URL/Endpoint**
* **Headers**
* **Body** (for methods like POST or PUT)

### Visual Representation

<img src="./images/method.gif" alt="RESTful API" />

## 🧩 Common HTTP Methods Explained

### 🟩 1. **GET — Retrieve Data**

**Purpose:** Used to **fetch or read data** from the server.
It **never modifies** data — just requests information.

**Key Points:**

* Safe and idempotent (can be called multiple times safely)
* Sends data through the **URL** (query parameters)
* Usually used to **display or fetch lists, details, or search results**

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

### 🟦 2. **POST — Create Data**

**Purpose:** Used to **add new data** to the server.

**Key Points:**

* Sends data inside the **request body**.
* The server processes and stores it.
* Returns confirmation or the created object.

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

### 🟨 3. **PUT — Full Update**

**Purpose:** Used to **update an existing resource completely**.
If some fields are missing, they will be **replaced** or **overwritten**.

**Key Points:**

* Idempotent (same result no matter how many times you send it)
* Replaces the entire resource with new data

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

### 🟥 4. **DELETE — Remove Data**

**Purpose:** Used to **delete** data from the server.

**Key Points:**

* Removes the specified resource
* Usually requires an ID or identifier in the URL

**Example:**

```bash
DELETE /books/2
```

**Response:**

```json
{ "message": "Book deleted successfully!" }
```

---

### 🟧 5. **PATCH — Partial Update**

**Purpose:** Used to **update only specific fields** of an existing resource.
Unlike PUT, it doesn’t replace the whole object.

**Example:**

```bash
PATCH /books/1
```

**Request Body:**

```json
{ "author": "James Clear" }
```

**Response:**

```json
{ "message": "Book partially updated!" }
```

---

## 💬 PUT vs PATCH — Key Difference

| Method    | Purpose        | Behavior                      |
| --------- | -------------- | ----------------------------- |
| **PUT**   | Full update    | Replaces the entire resource  |
| **PATCH** | Partial update | Updates only specified fields |

**Example:**

✅ PUT replaces everything

```json
{ "title": "New Title" }
```

✅ PATCH changes only one field

```json
{ "author": "New Author" }
```

---

## 🌍 How a Typical API Uses HTTP Methods

| Method     | Example Endpoint | Purpose                  |
| ---------- | ---------------- | ------------------------ |
| **GET**    | `/users`         | Fetch all users          |
| **GET**    | `/users/1`       | Fetch a single user      |
| **POST**   | `/users`         | Add a new user           |
| **PUT**    | `/users/1`       | Replace an existing user |
| **PATCH**  | `/users/1`       | Update specific fields   |
| **DELETE** | `/users/1`       | Delete a user            |

---

## 🧠 Summary

| Method     | Action           | Safe? | Idempotent? | Request Body |
| ---------- | ---------------- | ----- | ----------- | ------------ |
| **GET**    | Read             | ✅ Yes | ✅ Yes       | ❌ No         |
| **POST**   | Create           | ❌ No  | ❌ No        | ✅ Yes        |
| **PUT**    | Update (Full)    | ❌ No  | ✅ Yes       | ✅ Yes        |
| **PATCH**  | Update (Partial) | ❌ No  | ✅ Yes       | ✅ Yes        |
| **DELETE** | Delete           | ❌ No  | ✅ Yes       | ❌ No         |

---

## 🎯 Key Takeaways

* HTTP methods define **how you interact** with a resource (CRUD operations).
* Each method has a **specific purpose** — don’t mix them up.
* Always return **meaningful status codes** (e.g., 200 OK, 201 Created, 404 Not Found).
* **TypeScript** helps enforce type safety when handling requests and responses.

---