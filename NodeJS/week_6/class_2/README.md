## ⏰ Cron Jobs (Scheduled Background Tasks)

In real-world applications, some tasks **should run automatically on a schedule**, without user interaction.
These tasks are handled using **Cron Jobs**.

### Common Use Cases

Cron jobs are commonly used for:

* Sending **scheduled emails**
* Cleaning **expired tokens**
* Deleting **inactive users**
* Running **daily reports**
* Clearing **temporary data**
* Sending **reminder notifications**

---

## 🧠 What is a Cron Job?

A **cron job** is a task that runs automatically at a specified time or interval.

Examples:

* Every day at midnight
* Every 5 minutes
* Every Sunday
* Once per hour

---

## 🛠 Cron Jobs in Node.js

In Node.js, the most popular library for cron jobs is:

👉 **node-cron**

---

## 📦 Install node-cron

```bash
npm install node-cron
```

---

## ⏱ Cron Syntax (Basic Understanding)

```text
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of week (0 - 7)
│ │ │ │
│ │ │ └──── Month (1 - 12)
│ │ │
│ │ └──────── Day of month (1 - 31)
│ │
│ └──────────── Hour (0 - 23)
│
└──────────────── Minute (0 - 59)
```

### Examples

| Schedule              | Expression  |
| --------------------- | ----------- |
| Every minute          | `* * * * *` |
| Every day at midnight | `0 0 * * *` |
| Every hour            | `0 * * * *` |
| Every Sunday          | `0 0 * * 0` |

---

## 🏗 Project Structure for Cron Jobs

```text
src/
 ├── cron/
 │    └── cleanup.cron.ts
 ├── models/
 ├── utils/
 ├── app.ts
 └── server.ts
```

---

## 🧹 Example 1: Delete Unverified Users (Cron Job)

### Use Case

Delete users who:

* Are **not verified**
* Were created **more than 24 hours ago**

---

### Cron Job File

**File:** `cron/cleanup.cron.ts`

```ts
import cron from "node-cron";
import User from "../models/User";

cron.schedule("0 * * * *", async () => {
  console.log("Running cleanup cron job...");

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  await User.deleteMany({
    isVerified: false,
    createdAt: { $lt: oneDayAgo },
  });

  console.log("Unverified users cleaned up");
});
```

🕒 Runs **every hour**

---

## 📧 Example 2: Send Reminder Emails Using Cron Job

### Use Case

Send reminder emails to users who:

* Registered
* But did not verify their email

---

### Cron Job with Email

```ts
import cron from "node-cron";
import User from "../models/User";
import { transporter } from "../utils/mailer";

cron.schedule("0 9 * * *", async () => {
  console.log("Sending verification reminders...");

  const users = await User.find({ isVerified: false });

  for (const user of users) {
    await transporter.sendMail({
      to: user.email,
      subject: "Reminder: Please verify your email",
      html: `<p>Hello ${user.name}, please verify your email.</p>`,
    });
  }

  console.log("Reminder emails sent");
});
```

🕘 Runs **daily at 9 AM**

---

## 🔌 Register Cron Jobs in App

Cron jobs must be **imported once**, usually in `server.ts` or `app.ts`.

```ts
import "./cron/cleanup.cron";
```

⚠️ Important:
If this file is not imported, **cron jobs will NOT run**.

---

## 🔐 Cron Jobs with Database Connection

Make sure MongoDB is connected **before cron starts**.

```ts
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("DB Connected");
    require("./cron/cleanup.cron");
  });
```

---

## ⚠️ Important Notes (Production)

* Cron jobs **run only while server is running**
* For production:

  * Use **PM2**
  * Use **Docker**
  * Or use **cloud schedulers** (AWS EventBridge, GitHub Actions, etc.)

---

## ✅ Best Practices for Cron Jobs

* Keep cron jobs **lightweight**
* Add **logs**
* Handle errors properly
* Avoid running heavy jobs every minute
* Use environment-based schedules (dev vs prod)

---

## 🏁 Cron Jobs Summary

This section covers:

✔ What cron jobs are
✔ node-cron setup
✔ Real-world examples
✔ MongoDB cleanup tasks
✔ Email automation
✔ Proper project structure

Cron jobs are essential for **scalable, production-grade applications** such as:

* SaaS platforms
* Admin dashboards
* Notification systems
* Background maintenance tasks

---