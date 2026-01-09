# 📄 Pagination, Filtering & Sorting in Backend

---

## 🧠 Introduction

When building APIs that return **large datasets**, sending all data at once is **inefficient**.

Users usually need:

* Small chunks of data (pagination)
* Ability to search for specific items
* Filter by categories or properties
* Sort by date, name, price, etc.

This README covers:

* Query parameters (`?page=1&limit=10`)
* Pagination logic
* Searching with keywords
* Filtering by fields
* Sorting results

---

## 🌐 Query Parameters

APIs often accept **query parameters** for pagination, filtering, and sorting.

Example URL:

```text
GET /products?page=2&limit=5&search=shoes&category=men&sort=price_desc
```

**Explanation:**

| Param      | Meaning                                  |
| ---------- | ---------------------------------------- |
| `page`     | Current page number                      |
| `limit`    | Number of items per page                 |
| `search`   | Keyword search in name or description    |
| `category` | Filter by category                       |
| `sort`     | Sort results (`price_asc`, `price_desc`) |

---

## 🏗 Pagination Logic

Pagination splits results into **pages**.

### Example Controller

```ts
import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  const products = await Product.find()
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments();

  res.json({
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    data: products,
  });
};
```

**Explanation:**

* `skip` → how many documents to skip
* `limit` → how many documents to fetch per page
* `totalPages` → total number of pages

---

## 🔍 Search Logic

Search allows users to find items by keywords.

### Example: Search by Name

```ts
const search = req.query.search as string;

const query: any = {};

if (search) {
  query.name = { $regex: search, $options: "i" }; // case-insensitive
}

const products = await Product.find(query)
  .skip(skip)
  .limit(limit);
```

* `$regex` → allows partial match
* `$options: "i"` → case-insensitive

---

## 🧩 Filters

Filtering allows narrowing results by certain fields.

### Example: Filter by Category & Price Range

```ts
const category = req.query.category as string;
const minPrice = parseFloat(req.query.minPrice as string);
const maxPrice = parseFloat(req.query.maxPrice as string);

if (category) query.category = category;

if (minPrice && maxPrice) {
  query.price = { $gte: minPrice, $lte: maxPrice };
}

const products = await Product.find(query)
  .skip(skip)
  .limit(limit);
```

* `$gte` → greater than or equal
* `$lte` → less than or equal

---

## 🔢 Sorting

Sorting allows ordering results by a specific field.

### Example: Sort by Price or Date

```ts
const sort = req.query.sort as string; // e.g., price_asc, price_desc

let sortOption: any = {};

if (sort === "price_asc") sortOption.price = 1;
else if (sort === "price_desc") sortOption.price = -1;
else if (sort === "date_desc") sortOption.createdAt = -1;

const products = await Product.find(query)
  .sort(sortOption)
  .skip(skip)
  .limit(limit);
```

* `1` → ascending order
* `-1` → descending order

---

## 📌 Combined Example: Pagination + Search + Filter + Sort

```ts
const page = parseInt(req.query.page as string) || 1;
const limit = parseInt(req.query.limit as string) || 10;
const skip = (page - 1) * limit;

const search = req.query.search as string;
const category = req.query.category as string;
const sort = req.query.sort as string;

const query: any = {};

if (search) query.name = { $regex: search, $options: "i" };
if (category) query.category = category;

let sortOption: any = {};
if (sort === "price_asc") sortOption.price = 1;
else if (sort === "price_desc") sortOption.price = -1;

const products = await Product.find(query)
  .sort(sortOption)
  .skip(skip)
  .limit(limit);

const total = await Product.countDocuments(query);

res.json({
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  totalItems: total,
  data: products,
});
```

---

## 🧪 Testing with Postman

1. Method: `GET`
2. URL: `/products?page=1&limit=5&search=shoes&category=men&sort=price_asc`
3. Send request

✔ Returns paginated, filtered, searched, and sorted results

---

## ✅ Best Practices

* Always provide **default page & limit**
* Validate **query parameters**
* Allow **optional search and filters**
* Limit `limit` to a **reasonable maximum** (e.g., 50)
* Combine pagination + filtering + sorting for better UX

---

## 🏁 Summary

With Pagination, Filtering, and Sorting:

* Users can navigate large datasets efficiently
* APIs remain **fast and scalable**
* Frontend can request exactly what it needs
* You can combine **search, filters, and sorting** for flexible queries

This is a **core feature** in:

* E-commerce apps
* Admin dashboards
* Blog listing APIs
* SaaS platforms