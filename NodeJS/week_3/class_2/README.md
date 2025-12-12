# 📘 **DATABASE SYSTEMS**

---

# 🧩 **1. What is Data?**

**Data** is raw, unorganized facts that do not have any meaningful context.

### **Examples:**

* Numbers: 45, 89, 102
* Words: “Ali”, “Laptop”, “Blue”
* Dates: 12-02-2024

➡️ **Data = Raw facts**

---

# 🧠 **2. What is Information?**

**Information** is processed, organized, and meaningful data.

### **Examples:**

* “Ali is 20 years old.”
* “Laptop price is Rs. 85,000.”
* “Today’s temperature is 32°C.”

➡️ **Information = Processed Data**

---

# 🗄️ **3. What is a Database?**

A **database** is a structured and organized collection of related data stored electronically.

### **Examples:**

* **School Database:** Students, Teachers, Classes
* **E-commerce:** Products, Orders, Customers
* **Hospital:** Patients, Doctors, Appointments

➡️ A database stores data in **tables (rows + columns)**.

---

# 📝 **4. What is Metadata?**

**Metadata** means “data about data”.

It describes:

* Data types
* Table structure
* Column names
* Constraints
* Size, format

### **Example Metadata for column “Age”:**

* Type: INT
* Range: 1–120
* Required: YES

➡️ Metadata helps DBMS understand **how** data should be stored.

---

# 🖥️ **5. What is DBMS?**

**DBMS (Database Management System)** is a software that creates, manages, and controls access to the database.

### Examples:

* MySQL
* PostgreSQL
* Oracle
* MongoDB
* SQL Server

<img src="./images/DB Environment.PNG" alt="DBMS">

---

# 🔧 **6. Functionalities of DBMS**

## **1) Define**

Describes:

* Structure (tables)
* Data types
* Keys
* Constraints

Example:
Creating table Student with **id INT PRIMARY KEY**.

---

## **2) Construct**

Storing actual data on storage media.

Example:
Inserting new record into Student table.

---

## **3) Manipulate**

Operations performed on data:

* Retrieve (SELECT)
* Update
* Delete
* Generate reports

Example:
“Show all students with marks ≥ 80”

---

## **4) Share**

Multiple users can access the database at the same time.

Example:
Teacher, Admin, and Accountant using same school database.

---

# 🥇 **7. Difference Between Database & DBMS**

| **Database**         | **DBMS**                         |
| -------------------- | -------------------------------- |
| Collection of tables | Software used to manage database |
| Stores data only     | Performs operations (CRUD)       |
| Cannot enforce rules | Enforces constraints             |
| Cannot query         | Allows SQL queries               |
| Passive              | Active                           |

---

# 🧑‍💼 **8. Database Users**

Database users are divided into **two categories**:

---

# **A) Actors on the Scene (Direct Users)**

## **1) Database Administrator (DBA)**

Responsible for:

* Installation & configuration
* Security
* Backup & recovery
* Performance tuning

---

## **2) Database Designers**

They design:

* Tables
* Relationships
* Keys
* Constraints

They create **ERDs**.

---

## **3) End Users**

People who use applications.

Types of end users:

* Casual Users (ad-hoc queries)
* Naive Users (ATM, POS)
* Sophisticated Users (Engineers)
* Standalone Users (Excel, Access)

---

## **4) System Analysts & Software Engineers**

They design:

* Applications
* APIs
* Frontends
* Backend logic

They interact with DB using SQL.

---

# **B) Workers Behind the Scene**

## **1) System Designers & Implementers**

Build:

* Storage engines
* Query processors
* Database architecture

---

## **2) Tool Developers**

Develop:

* Admin tools
* Performance tools
* Monitoring tools
* Backup utilities

---

## **3) Operators & Maintenance Personnel**

Responsible for:

* Running jobs
* Server maintenance
* Restarting services
* Fixing hardware issues

---

# ⭐ **9. Advantages of DBMS**

* Reduces data redundancy
* Ensures consistency
* Improved data sharing
* Security and access control
* Backup and recovery
* Enforces data integrity
* Concurrent access
* Better decision-making with reports

---

# ⚠️ **10. Disadvantages of DBMS**

* Expensive software & hardware
* Requires trained staff
* Complex management
* Failure affects entire system
* More system resources needed

---

# 🏛️ **11. History of Database Applications**

## **1) Early DB Applications (1960s–1980s)**

Based on 3 models:

1. **Hierarchical Model**

<img src="./images/Hierarchical System.PNG" alt="Hierarchical Model">

2. **Network Model**

<img src="./images/Network System.PNG" alt="Network Model">

3. **Inverted File System**

### **Drawbacks**

* Only programming interface
* No SQL
* Hard to reorganize
* Rigid structure

Famous & widely used models: **Hierarchical & Network**

---

## **2) Relational DBMS (RDBMS) – 1970s–1980s**

Introduced by **E. F. Codd**
Organizes data into **tables**.

### **Advantages**

* Easy to write new queries
* High-level language (SQL)
* Flexible
* Easy to rearrange

Early systems were slow → improved with:

* Indexing
* Optimizers
* Better storage techniques

---

# 🧱 **12. ERD (Entity–Relationship Diagram)**

ERD is used to model real-world systems using:

* Entities
* Attributes
* Relationships

---

# 🔤 **13. ERD Terminologies**

## **1) Entity**

A real-world object with independent existence.

Examples:

* Student
* Car
* Product
* Teacher

---

## **2) Attributes**

Properties of entities.

---

### **a) Simple Attributes**

Cannot be divided.

* Age
* Salary

---

### **b) Composite Attributes**

Can be divided.

* Name → (First, Middle, Last)
* Address → (City, Country)

---

### **c) Single-Valued Attributes**

Only one value.

* Age
* Roll number

---

### **d) Multivalued Attributes**

More than one value.

* Degrees {BS, MS}
* Languages {English, Urdu, Arabic}

Notation: **Double ellipse**

---

### **e) Derived Attributes**

Derived from another attribute.

* Age derived from DOB

Notation: **Dashed ellipse**

---

### **f) Stored Attributes**

The original value from which others are derived.

* DOB

---

### **g) Complex Attributes**

Composite + multivalued.

Example:
{Degree(Name, College, Passing Year)}

---

### **h) Null Values**

Unknown or not applicable.

---

# 🗂️ **14. Entity Type & Entity Set**

## **Entity Type**

A definition of similar entities (like a class).

Example:

* Entity Type: Student
* Attributes: id, name, age

## **Entity Set**

Collection of all entities at a time.

Example:

* Student Set = All students currently enrolled.

---

# 🔑 **15. Key Attribute**

Uniquely identifies an entity.

Examples:

* Roll Number
* CNIC
* Email (unique)

---

# 🧩 **16. Weak Entity**

Cannot exist without another entity.

Example:
Employee → Dependent (weak entity)

Dependent has:

* No unique attribute
* Identified by **Employee + DependentName**

Requires **Identifying Relationship**.

---

# 🏗️ **17. Database Design Process**

1. Requirement Collection
2. Analysis
3. Conceptual Design (ERD)
4. Logical Design (Tables)
5. Physical Design
6. Implementation
7. Maintenance

---

# 🔗 **18. Relationship Degree**

### **1) Unary**

Relationship within same entity.

Example:

* Employee manages Employee

<img src="./images/r1.PNG" alt="Unary Relationship">

### **2) Binary**

Between two entities.

Example:

* Student — Enrolls — Course

<img src="./images/r2.PNG" alt="Binary Relationship">

### **3) Ternary**

Between three entities.

Example:

* Supplier — Supplies — Product — To Store

<img src="./images/r3.PNG" alt="Ternary Relationship">

---

# 🔒 **19. Relationship Constraints**

## **1) Cardinality Ratio**

| Type  | Meaning      |
| ----- | ------------ |
| 1 : 1 | One to one   |
| 1 : N | One to many  |
| N : 1 | Many to one  |
| M : N | Many to many |

<img src="./images/r4.PNG" alt="Cardinality Ratio">

---

## **2) Participation Constraints**

### **Total Participation**

* Must participate
  Notation: **Double line**

### **Partial Participation**

* May or may not participate
  Notation: **Single line**

<img src="./images/r5.PNG" alt="Participation Constraints">

---

# 🟥 **20. ER Diagram Symbols (Very Important)**

| Symbol                | Meaning                         |
| --------------------- | ------------------------------- |
| ▢ Rectangle           | Entity                          |
| ⃝ Ellipse             | Attribute                       |
| ⃝⃝ Double Ellipse     | Multivalued Attribute           |
| ⃝ (Dashed)            | Derived Attribute               |
| ◆ Diamond             | Relationship                    |
| ◆◆ Double Diamond     | Identifying Relationship        |
| ▢▢ Double Rectangle   | Weak Entity                     |
| Line with double bars | Total participation             |
| Line with arrow →     | One side                        |
| No arrow              | Many                            |
| Triangle (ISA)        | Generalization / Specialization |

<img src="./images/symbol 1.PNG" alt="ER Diagram Symbols">
<img src="./images/symbol 2.PNG" alt="ER Diagram Symbols">
<img src="./images/symbol 3.PNG" alt="ER Diagram Symbols">

---

<img src="./images/ER company DB.PNG" alt="ER Diagram Company">

---

# 📘 **Normalization & Denormalization**

---

# 🧩 **What is Normalization?**

**Normalization** is a database design technique used to:
✔ remove data redundancy
✔ avoid data anomalies
✔ organize a database into well-structured tables
✔ ensure data dependency is logical

➡️ **Goal:** Make the database **efficient**, **consistent**, and **free from duplication**.

---

# ❓ Why do we need Normalization?

Without normalization, we get problems like:

### **1. Insertion Anomaly**

You cannot insert data because some other data is missing.

### **2. Deletion Anomaly**

Deleting one record accidentally removes important related data.

### **3. Update Anomaly**

You need to update the same data in many places.

Normalization solves all these issues.

---

# 🎯 **Normalization Example (Before Normalization)**

Suppose we store student and course info in **one table**:

| StudentID | StudentName | Course | Instructor |
| --------- | ----------- | ------ | ---------- |
| 1         | Ali         | DBMS   | Ahmed      |
| 1         | Ali         | OOP    | Bilal      |
| 2         | Sara        | DBMS   | Ahmed      |

### ❌ Problems:

* **Redundancy:** Instructor “Ahmed” appears multiple times
* **Update anomaly:** If Ahmed changes name, update all rows
* **Insertion anomaly:** New course cannot be added unless a student enrolls
* **Deletion anomaly:** If student leaves, course info is lost

➡️ **Normalization fixes all this.**

---

# 🏛️ **Types / Forms of Normalization (Normal Forms)**

Main types:

1. **1NF – First Normal Form**
2. **2NF – Second Normal Form**
3. **3NF – Third Normal Form**
4. **BCNF – Boyce Codd Normal Form**
5. *(Higher forms exist but rarely used)*

Let’s explain each one clearly. 👇

---

# 🔰 **1NF – First Normal Form**

A table is in 1NF if:

✔ All values are **atomic** (no multivalues)
✔ No repeating groups
✔ Each field has a single value

---

### ❌ Before 1NF:

| StudentID | Name | Courses   |
| --------- | ---- | --------- |
| 1         | Ali  | DBMS, OOP |
| 2         | Sara | DBMS      |

## ✔ After 1NF (Atomic values):

| StudentID | Name | Course |
| --------- | ---- | ------ |
| 1         | Ali  | DBMS   |
| 1         | Ali  | OOP    |
| 2         | Sara | DBMS   |

---

# 🟦 **2NF – Second Normal Form**

A table is in 2NF if:

✔ It is already in **1NF**
✔ No **partial dependency**
✔ Non-key attributes depend on **whole primary key**

(Applicable when composite key exists)

---

### ❌ Example (Before 2NF)

Order table:

| OrderID                             | ProductID | ProductName | Price |
| ----------------------------------- | --------- | ----------- | ----- |
| Primary Key = (OrderID + ProductID) |           |             |       |

Here:

* ProductName & Price depend **only on ProductID**, not on the full key.

➡️ **Partial dependency → Bad**

## ✔ After 2NF:

### **Orders**

| OrderID | ProductID |
| ------- | --------- |

### **Products**

| ProductID | ProductName | Price |

Now each attribute depends on the whole primary key.

---

# 🟩 **3NF – Third Normal Form**

A table is in 3NF if:

✔ Already in **2NF**
✔ No **transitive dependency**
(non-key attribute depends on another non-key attribute)

---

### ❌ Before 3NF:

| StudentID | Name | City | ZIP |
| --------- | ---- | ---- | --- |

Here:
City depends on ZIP → **transitive dependency**

## ✔ After 3NF:

### Students:

| StudentID | Name | ZIP |

### ZIP Codes:

| ZIP | City |

No transitive dependency.

---

# 🟥 **BCNF – Boyce–Codd Normal Form**

Stronger version of 3NF.

A table is in BCNF if:

✔ For every functional dependency
✔ Left side is a **super key**

Used when:

* A table has **multiple candidate keys**
* Overlapping keys cause issues

---

# 🎉 **Summary Table of Normal Forms**

| Form     | Removes                | Requirement                                   |
| -------- | ---------------------- | --------------------------------------------- |
| **1NF**  | Multivalued attributes | Atomic values                                 |
| **2NF**  | Partial dependency     | No attribute depends on part of composite key |
| **3NF**  | Transitive dependency  | Non-key attributes depend only on primary key |
| **BCNF** | Complex anomalies      | Every determinant must be a key               |

---

# 🧱 **What is Denormalization?**

**Denormalization** is the process of **combining normalized tables** to:

✔ improve performance
✔ reduce joins
✔ speed up queries

➡️ It **adds redundancy intentionally** for faster read operations.

Used in:

* Data warehouses
* Search-heavy systems
* OLAP systems

---

# ❓ Why Denormalization?

Normalization → good structure, fewer anomalies
BUT
Too much normalization = too many tables = too many joins = slower performance

Denormalization fixes performance issues.

---

# 📌 **Example of Denormalization**

Suppose we normalized data like this:

### **Customers**

| CustomerID | CustomerName |

### **Orders**

| OrderID | CustomerID | Amount |

To show customer + order data, we must join tables.

If system is read-heavy (lots of SELECT queries), we **denormalize**:

### **Denormalized Table**

| OrderID | CustomerName | Amount |

✔ Faster reads
❌ Some redundancy

---

# 🔥 **Difference Between Normalization & Denormalization**

| Normalization            | Denormalization          |
| ------------------------ | ------------------------ |
| Removes redundancy       | Adds redundancy          |
| More tables              | Fewer tables             |
| Reduces anomalies        | Improves performance     |
| Best for OLTP            | Best for OLAP            |
| Slow SELECT, fast UPDATE | Fast SELECT, slow UPDATE |

---

# 🧠 **When to Normalize?**

* When data consistency is important
* When system performs many inserts/updates
* Banking systems
* School systems
* Inventory systems

---

# ⚡ When to Denormalize?

* When READ performance is priority
* Reporting systems
* Search systems
* Analytics
* E-commerce product listing pages

---

# 🛍️ **21. E-Commerce Database Design**

### **Entities:**

* Customer
* Product
* Order
* OrderItems
* Category
* Payment
* Address

### **Possible Relationships:**

* Customer places Order
* Order contains Products
* Product belongs to Category
* Order has Payment
* Customer has Address

---