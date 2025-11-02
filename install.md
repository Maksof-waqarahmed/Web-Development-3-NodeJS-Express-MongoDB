# 📘 Setting up MongoDB: Installation and Basic Configuration

---

## 🧠 Introduction

Before we can start using MongoDB in our applications (like Node.js or Express), we first need to **install** and **configure** it properly.

This guide will help you understand:

* How to install MongoDB on your system
* How to start and stop MongoDB
* How to configure MongoDB for development
* How to connect and test your setup

After this, you’ll have a **fully working MongoDB environment** ready for local or cloud-based development 🚀

---

## ⚙️ What is MongoDB?

MongoDB is a **NoSQL document database** that stores data in **collections** (instead of tables) and **documents** (instead of rows).
It’s **schema-less**, flexible, and great for **modern applications** built with **JavaScript, Node.js, or TypeScript**.

---

## 💻 Step 1: Installing MongoDB

Let’s go step-by-step based on your operating system.

---

### 🪟 For Windows

#### 1. Download MongoDB

* Visit: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
* Select:

  * Version: Latest (e.g., MongoDB 8.x)
  * Platform: **Windows**
  * Package: **MSI Installer**

#### 2. Run the Installer

* Check ✅ **Complete Setup**
* Check ✅ “Install MongoDB as a Service” (recommended)
* Optionally check ✅ “Install MongoDB Compass” (GUI tool)

#### 3. Verify Installation

Open Command Prompt and run:

```bash
mongod --version
mongosh --version
```

If you see version info → 🎉 MongoDB is installed successfully.

---

### 🍎 For macOS

#### 1. Using Homebrew

If you have [Homebrew](https://brew.sh/) installed:

```bash
brew tap mongodb/brew
brew install mongodb-community@8.0
```

#### 2. Start MongoDB

```bash
brew services start mongodb-community@8.0
```

#### 3. Stop MongoDB

```bash
brew services stop mongodb-community@8.0
```

#### 4. Verify Installation

```bash
mongosh
```

You should see the MongoDB shell open.

---

### 🐧 For Linux (Ubuntu/Debian)

#### 1. Import the MongoDB public key

```bash
curl -fsSL https://pgp.mongodb.com/server-8.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
```

#### 2. Add MongoDB repository

```bash
echo "deb [signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
```

#### 3. Install MongoDB

```bash
sudo apt update
sudo apt install -y mongodb-org
```

#### 4. Start MongoDB service

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 5. Check Status

```bash
sudo systemctl status mongod
```

---

## 🧩 Step 2: Understanding MongoDB Components

When MongoDB is installed, it includes several key components:

| Component             | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| **mongod**            | The **MongoDB server process** (daemon). It handles database operations. |
| **mongosh**           | The **MongoDB shell**, used to interact with MongoDB through commands.   |
| **MongoDB Compass**   | A GUI tool to visualize and manage your database.                        |
| **MongoDB CLI Tools** | Command-line utilities for import/export, backups, etc.                  |

---

## ⚡ Step 3: Starting MongoDB

If MongoDB is installed as a service:

### ▶️ On Windows:

```bash
net start MongoDB
```

### ▶️ On macOS (Homebrew):

```bash
brew services start mongodb-community@8.0
```

### ▶️ On Linux:

```bash
sudo systemctl start mongod
```

To verify MongoDB is running:

```bash
mongosh
```

If you see:

```
test>
```

That means MongoDB is successfully running 🎉

---

## 🧠 Step 4: MongoDB Default Configuration

MongoDB has a configuration file named **`mongod.conf`**, usually located in:

* Windows → `C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg`
* macOS → `/usr/local/etc/mongod.conf`
* Linux → `/etc/mongod.conf`

---

### 📁 Example Configuration File

```yaml
# mongod.conf

systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true

storage:
  dbPath: /data/db
  journal:
    enabled: true

net:
  port: 27017
  bindIp: 127.0.0.1
```

| Key                | Description                                  |
| ------------------ | -------------------------------------------- |
| **systemLog.path** | Path where MongoDB stores logs.              |
| **storage.dbPath** | Folder where MongoDB stores your data files. |
| **net.port**       | Default port (27017).                        |
| **net.bindIp**     | `127.0.0.1` means local access only.         |

---

## 🧰 Step 5: Create Data Folder (if needed)

If MongoDB doesn’t start because it can’t find the data folder, manually create it:

### On Windows:

```bash
mkdir C:\data\db
```

### On macOS/Linux:

```bash
sudo mkdir -p /data/db
sudo chown -R `id -un` /data/db
```

---

## 🔐 Step 6: Configuring Access Control (Optional but Recommended)

By default, MongoDB allows local connections without authentication.
For production or secure setups, enable **access control**.

### 1. Edit the config file (`mongod.conf`):

```yaml
security:
  authorization: enabled
```

### 2. Restart MongoDB

```bash
sudo systemctl restart mongod
```

### 3. Create Admin User

```bash
mongosh
use admin
db.createUser({
  user: "admin",
  pwd: "myStrongPassword123",
  roles: [ { role: "root", db: "admin" } ]
})
```

Now MongoDB requires authentication.

---

## 🧪 Step 7: Testing MongoDB Connection

To test the connection:

```bash
mongosh
```

Or connect using:

```bash
mongosh "mongodb://localhost:27017"
```

### Create and test data:

```bash
use testDB
db.users.insertOne({ name: "Waqar", role: "Developer" })
db.users.find()
```

If it returns your data → ✅ MongoDB setup is successful!

---

## ☁️ Step 8: Using MongoDB Atlas (Cloud Setup)

If you prefer a **cloud-based MongoDB**, use **MongoDB Atlas** — it’s free for learning.

### Steps:

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create an account and a free cluster.
3. Add your IP address (0.0.0.0 for all access).
4. Get your connection URI (e.g.):

   ```
   mongodb+srv://waqar:<password>@cluster0.mongodb.net/myDatabase
   ```
5. Connect using Node.js or Compass.

---

## 🧩 Step 9: Connecting MongoDB with Node.js (Preview)

Once MongoDB is running, you can connect it to your backend app using **Mongoose**.

```ts
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/myDatabase")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));
```

---

## 🧭 Step 10: Useful Commands Summary

| Command                        | Description                      |
| ------------------------------ | -------------------------------- |
| `mongosh`                      | Start MongoDB shell              |
| `show dbs`                     | Show all databases               |
| `use myDB`                     | Switch to (or create) a database |
| `show collections`             | Show collections in DB           |
| `db.createCollection("users")` | Create a collection              |
| `db.users.find()`              | View all documents               |
| `exit`                         | Exit MongoDB shell               |

---

## 📋 Summary

| Step      | Description                    |
| --------- | ------------------------------ |
| 🧩 Step 1 | Install MongoDB                |
| ⚙️ Step 2 | Start MongoDB service          |
| 🧠 Step 3 | Understand `mongod.conf`       |
| 🔐 Step 4 | Secure MongoDB (optional)      |
| 🧪 Step 5 | Test connection                |
| ☁️ Step 6 | Optional — setup MongoDB Atlas |

---

## 🏁 Final Words

You’ve successfully learned how to **install, configure, and run MongoDB** on your system.
Now you’re ready to move to the next stage — **connecting MongoDB with Node.js** and performing CRUD operations using **Mongoose** or **native driver**.

MongoDB is now your foundation for building powerful, real-time, and scalable applications! 🚀

---