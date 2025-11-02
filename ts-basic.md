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

Let’s start with TypeScript’s **core syntax elements**.

---

### 🔹 Variable Declarations with Types

You can explicitly specify the type of a variable:

```ts
let firstName: string = "Waqar";
let age: number = 22;
let isDeveloper: boolean = true;
```

If you omit the type, TypeScript will **infer** it automatically:

```ts
let city = "Karachi"; // inferred as string
// city = 123; ❌ Error: Type 'number' not assignable to type 'string'
```

---

### 🔹 Arrays

You can type an array in two ways:

```ts
let numbers: number[] = [1, 2, 3, 4];
let fruits: Array<string> = ["Apple", "Banana", "Cherry"];
```

---

### 🔹 Objects

You can define object types directly:

```ts
let user: { name: string; age: number; isAdmin: boolean } = {
  name: "Waqar Rana",
  age: 25,
  isAdmin: true,
};
```

If you miss a property or use a wrong type, TypeScript will throw an error.

---

### 🔹 Functions

Functions can have **typed parameters** and **return types**:

```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 5)); // ✅ 15
// add("10", "5"); ❌ Error
```

Arrow function example:

```ts
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

---

## 🧱 Type Aliases

When you need to reuse the same type multiple times, use a **type alias**.

```ts
type User = {
  name: string;
  email: string;
  age?: number; // optional property
};

const user1: User = { name: "Ali", email: "ali@gmail.com" };
const user2: User = { name: "Sara", email: "sara@gmail.com", age: 21 };
```

✅ The `?` after `age` means the property is optional.

---

## 🧩 Interfaces in TypeScript

An **interface** defines the *shape* of an object — what properties it should have and their types.

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

---

### 🧠 Interface vs Type

| Feature                           | Interface     | Type                         |
| --------------------------------- | ------------- | ---------------------------- |
| Extends other types               | ✅ Yes         | ✅ Yes (using intersections)  |
| Can merge declarations            | ✅ Yes         | ❌ No                         |
| Can represent primitives & unions | ❌ No          | ✅ Yes                        |
| Preferred for                     | Object shapes | Union/primitive combinations |

Example showing difference:

```ts
// Interface
interface Developer {
  name: string;
  language: string;
}

// Type
type Status = "active" | "inactive";
```

---

### 🔄 Extending Interfaces

Interfaces can **extend** other interfaces:

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

---

## 🧩 Type Safety Explained

**Type safety** ensures that variables and functions are used with the correct types — avoiding runtime errors.

### ❌ Without Type Safety (JavaScript)

```js
function multiply(a, b) {
  return a * b;
}

console.log(multiply("5", 2)); // "10" (unexpected result)
```

### ✅ With Type Safety (TypeScript)

```ts
function multiply(a: number, b: number): number {
  return a * b;
}

// multiply("5", 2); // 🚫 Compile-time error
console.log(multiply(5, 2)); // ✅ 10
```

TypeScript enforces **type contracts**, preventing bugs before execution.

---

## ⚙️ Union & Literal Types

You can allow **multiple possible types** using the union (`|`) operator:

```ts
let value: string | number;

value = "Hello"; // ✅
value = 100; // ✅
value = true; // ❌ Error
```

Or restrict values to **specific options** (literals):

```ts
type Role = "admin" | "user" | "guest";

let myRole: Role = "admin"; // ✅
myRole = "manager"; // ❌ Error
```

---

## 🧮 Example Program

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

### 🖥️ Output:

```
Rana (Roll #101) has passed ✅ the exam.
```

---

## 🧾 Summary

| Concept             | Description                 | Example                           |         |
| ------------------- | --------------------------- | --------------------------------- | ------- |
| **Type Annotation** | Define variable types       | `let age: number = 20`            |         |
| **Interface**       | Define object structure     | `interface User { name: string }` |         |
| **Type Alias**      | Reusable type definition    | `type ID = number                 | string` |
| **Type Safety**     | Prevents invalid type usage | Compile-time checks               |         |
| **Union Types**     | Allow multiple types        | `let value: string                | number` |

---

## 💡 Tip:

> Always enable `"strict": true` in your `tsconfig.json` for **maximum type safety**.
> It helps TypeScript detect even minor mistakes in types, improving code quality.

---