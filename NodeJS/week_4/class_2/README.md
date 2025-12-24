# 📘 Advanced Querying & Filtering in MongoDB (Complete Guide)

---

## 🧠 1️⃣ Introduction

MongoDB allows **powerful querying and filtering** of data stored in collections. Advanced querying includes:

* Data filter
* Conditions
* Sorting & pagination
* Specific fields select
* Array & nested object queries
* Performance optimization (indexes)
* Advanced data analysis (aggregation)

With TypeScript:

* **Type safety**
* **Auto-completion**
* **Runtime bugs kam**

---

## ⚡ 2️⃣ Project Setup

### 📦 Install Required Packages

```bash
npm install express mongoose dotenv
npm install --save-dev typescript ts-node @types/express @types/mongoose
```

**Packages explanation:**

* `express` → API banane ke liye
* `mongoose` → MongoDB ODM
* `dotenv` → env variables
* TypeScript → strong typing

---

### 🌱 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=<Your URI>
```

---

### 🔌 MongoDB Connection (`server.ts`)

```ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () =>
  console.log("Server running")
);
```

---

## 🏗 3️⃣ Schema & TypeScript Interface

```ts
import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  tags?: string[];
  createdAt?: Date;
}
```

👉 Interface = **Type safety**

---

### 📐 Schema Definition

```ts
const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, min: 0 },
  inStock: { type: Boolean, default: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>("Product", productSchema);
```

👉 Schema = **Database validation**

---

# 🟢 4️⃣ BASIC READ QUERIES

## 🔹 `find()`

```js
db.users.find()
```

👉 Collection's **all documents**

```js
db.users.find({ name: "Rana" })
```

👉 Matching documents only

---

## 🔹 `findOne()`

```js
db.users.findOne({ email: "rana@gmail.com" })
```

👉 First matching document

---

## 🔹 `findById()`

```js
User.findById("64fae...")
```

👉 `_id` indexed hota hai → **fastest query**

---

## 🔹 Projection (Fields Select)

```js
db.users.find(
  { role: "user" },
  { name: 1, email: 1, _id: 0 }
)
```

👉 only required fields

---

## 🔹 `select()` (Mongoose)

```js
User.find().select("name email -_id")
```

---

# 🟢 5️⃣ CREATE QUERIES

## 🔹 `create()`

```js
User.create({
  name: "Rana",
  email: "rana@gmail.com"
})
```

---

## 🔹 `insertOne()`

```js
db.users.insertOne({
  name: "Rana",
  age: 22
})
```

---

## 🔹 `insertMany()`

```js
db.users.insertMany([
  { name: "Ali", age: 20 },
  { name: "Ahmed", age: 25 }
])
```

---

# 🟡 6️⃣ UPDATE QUERIES

## 🔹 `updateOne()`

```js
User.updateOne(
  { email: "rana@gmail.com" },
  { $set: { experience: 3 } }
)
```

👉 First matching document update

---

## 🔹 `updateMany()`

```js
User.updateMany(
  { role: "user" },
  { $set: { active: true } }
)
```

---

## 🔹 `findByIdAndUpdate()`

```js
User.findByIdAndUpdate(
  id,
  { experience: 5 },
  { new: true, runValidators: true }
)
```

👉 Updated document return

---

## 🔹 `findOneAndUpdate()`

```js
User.findOneAndUpdate(
  { email: "rana@gmail.com" },
  { role: "admin" },
  { new: true }
)
```

---

# 🔴 7️⃣ DELETE QUERIES

```js
User.deleteOne({ email: "test@gmail.com" })
User.deleteMany({ active: false })
User.findByIdAndDelete(id)
User.findOneAndDelete({ email: "test@gmail.com" })
```

---

# 🔵 8️⃣ QUERY HELPERS

## 🔹 `sort()`

```js
User.find().sort({ createdAt: -1 })
```

---

## 🔹 `limit()` & `skip()`

```js
User.find().skip(10).limit(5)
```

👉 Pagination

---

## 🔹 `lean()`

```js
User.find().lean()
```

👉 Plain JS object → **fast**

---

# 🟣 9️⃣ CONDITIONAL FILTERING

## 🔹 Comparison Operators

```typescript
// Find products in category "Electronics"
const electronics = await Product.find({ category: "Electronics" });

// Find products with price > 50
const expensiveProducts = await Product.find({ price: { $gt: 50 } });
```

**Comparison Operators:**

| Operator | Description           | Example                          |
| -------- | --------------------- | -------------------------------- |
| `$eq`    | Equals                | `{ price: { $eq: 50 } }`         |
| `$ne`    | Not equals            | `{ category: { $ne: "Books" } }` |
| `$gt`    | Greater than          | `{ price: { $gt: 50 } }`         |
| `$lt`    | Less than             | `{ price: { $lt: 100 } }`        |
| `$gte`   | Greater than or equal | `{ price: { $gte: 50 } }`        |
| `$lte`   | Less than or equal    | `{ price: { $lte: 200 } }`       |

---

## 🔹 Logical Operators

```ts
Product.find({
  $and: [{ price: { $gt: 50 } }, { inStock: true }]
})
```

| Operator | Description         | Example                                                    |
| -------- | ------------------- | ---------------------------------------------------------- |
| `$and`   | AND condition       | `{ $and: [{ price: { $gt: 50 }}, { inStock: true }] }`     |
| `$or`    | OR condition        | `{ $or: [{ category: "Books" }, { price: { $lt: 30 } }] }` |
| `$not`   | Negates a condition | `{ price: { $not: { $lt: 50 } } }`                         |
| `$nor`   | NOR (neither)       | `{ $nor: [{ price: { $lt: 50 } }, { inStock: false }] }`   |

---

# 🟤 1️⃣0️⃣ ARRAY QUERIES

```typescript
// Find products that have tag "popular"
const popularProducts = await Product.find({ tags: "popular" });

// Find products that have all specified tags
const multiTagged = await Product.find({ tags: { $all: ["popular", "new"] } });
```

| Operator | Description                    | Example                                          |
| -------- | ------------------------------ | ------------------------------------------------ |
| `$in`    | Matches any value in the array | `{ category: { $in: ["Books","Electronics"] } }` |
| `$nin`   | Matches none of the values     | `{ category: { $nin: ["Clothing"] } }`           |
| `$all`   | Matches all specified elements | `{ tags: { $all: ["popular","new"] } }`          |
| `$size`  | Matches array length           | `{ tags: { $size: 2 } }`                         |

---

# 🔍 1️⃣1️⃣ REGEX SEARCH

```js
db.users.find({
  name: { $regex: "^Ra", $options: "i" }
})
```

👉 Starts with "Ra", case-insensitive

---

# 🔢 1️⃣2️⃣ COUNT & EXISTS

```js
db.users.countDocuments({ role: "user" })
db.users.find({ phone: { $exists: true } })
```

---

# ⚙️ 1️⃣3️⃣ PERFORMANCE & DEBUGGING

## 🔹 Explain Query

```js
db.users.find({ email: "rana@gmail.com" })
  .explain("executionStats")
```

| Result     | Meaning    |
| ---------- | ---------- |
| `IXSCAN`   | Index used |
| `COLLSCAN` | Slow scan  |

---

## 🏗 Hands-On: Build a RESTful API with MongoDB and TypeScript