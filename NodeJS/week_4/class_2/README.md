# 📘 Advanced Querying and Filtering in MongoDB

---

## 🧠 Introduction

MongoDB allows **powerful querying and filtering** of data stored in collections. Advanced querying includes:

* Filtering documents based on multiple conditions
* Sorting and limiting results
* Projection (selecting specific fields)
* Using comparison, logical, and array operators
* Aggregation pipelines for complex data analysis

With **TypeScript**, you can ensure **type safety** while building REST APIs with Express.js.

---

## ⚡ Setting Up

### 1️⃣ Install Required Packages

```bash
npm install express mongoose dotenv
npm install --save-dev @types/express @types/mongoose typescript ts-node
```

* `express` → Node.js framework
* `mongoose` → MongoDB ODM
* `dotenv` → Load environment variables
* TypeScript packages → Type-safe development

---

### 2️⃣ Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/advancedDB
```

> Ensures credentials are not hard-coded and can be different per environment.

---

### 3️⃣ Connect Express with MongoDB

**File:** `server.ts`

```typescript
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 🏗 Define Mongoose Schema and TypeScript Interface

**File:** `models/Product.ts`

```typescript
import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  tags?: string[];
  createdAt?: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  inStock: { type: Boolean, default: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>("Product", productSchema);
```

> ✅ Using `IProduct` ensures **type safety** for requests and responses.

---

## 🔍 Basic Querying

### 1️⃣ Find All Documents

```typescript
import Product from "./models/Product";

const allProducts = await Product.find();
console.log(allProducts);
```

### 2️⃣ Find With Conditions

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

### 3️⃣ Logical Operators

| Operator | Description         | Example                                                    |
| -------- | ------------------- | ---------------------------------------------------------- |
| `$and`   | AND condition       | `{ $and: [{ price: { $gt: 50 }}, { inStock: true }] }`     |
| `$or`    | OR condition        | `{ $or: [{ category: "Books" }, { price: { $lt: 30 } }] }` |
| `$not`   | Negates a condition | `{ price: { $not: { $lt: 50 } } }`                         |
| `$nor`   | NOR (neither)       | `{ $nor: [{ price: { $lt: 50 } }, { inStock: false }] }`   |

---

### 4️⃣ Array Queries

```typescript
// Find products that have tag "popular"
const popularProducts = await Product.find({ tags: "popular" });

// Find products that have all specified tags
const multiTagged = await Product.find({ tags: { $all: ["popular", "new"] } });
```

**Array Operators:**

| Operator | Description                    | Example                                          |
| -------- | ------------------------------ | ------------------------------------------------ |
| `$in`    | Matches any value in the array | `{ category: { $in: ["Books","Electronics"] } }` |
| `$nin`   | Matches none of the values     | `{ category: { $nin: ["Clothing"] } }`           |
| `$all`   | Matches all specified elements | `{ tags: { $all: ["popular","new"] } }`          |
| `$size`  | Matches array length           | `{ tags: { $size: 2 } }`                         |

---

### 5️⃣ Sorting and Limiting

```typescript
// Sort by price ascending
const sortedProducts = await Product.find().sort({ price: 1 });

// Limit to 5 results
const topFive = await Product.find().limit(5);

// Pagination: skip first 10, next 5
const paginated = await Product.find().skip(10).limit(5);
```

---

### 6️⃣ Projection (Selecting Specific Fields)

```typescript
// Only select name and price
const projected = await Product.find({}, { name: 1, price: 1, _id: 0 });
```

---

## 🏗 Hands-On: Build a RESTful API with MongoDB and TypeScript

**File:** `routes/productRoutes.ts`

```typescript
import { Router, Request, Response } from "express";
import Product, { IProduct } from "../models/Product";

const router = Router();

// GET /products?category=Electronics&minPrice=50
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, inStock } = req.query;

    const filter: any = {};
    if (category) filter.category = category;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (inStock !== undefined) filter.inStock = inStock === "true";

    const products: IProduct[] = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

export default router;
```

**Integrate into `server.ts`:**

```typescript
import productRoutes from "./routes/productRoutes";
app.use("/products", productRoutes);
```

**Usage Examples:**

* `GET /products` → Returns all products
* `GET /products?category=Books` → Returns books
* `GET /products?minPrice=50&maxPrice=100` → Products between 50–100
* `GET /products?inStock=true` → Products in stock

---

## ✅ Best Practices

1. Always validate **query parameters** (TypeScript helps).
2. Use **indexes** for frequently queried fields like `category` or `price`.
3. Use **pagination** (`skip` + `limit`) for large datasets.
4. Keep projections small to reduce network payload.
5. Combine logical operators and comparison operators for advanced filtering.

---