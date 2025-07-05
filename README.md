# GlucoQuest

**GlucoQuest** is a user-centric web application designed to empower individuals living with Type 1 diabetes in effectively managing their condition. By providing intuitive tools for tracking glucose levels, medications, meals, and daily tasks, GlucoQuest simplifies diabetes care and promotes healthier, more consistent habits.

---

## 🌟 Key Features

| Feature                  | Description                                                                 | Benefit                                                             |
| ------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Log Glucose Readings** | Manually enter and track blood glucose levels.                              | Monitor trends and share with healthcare providers for better care. |
| **Meal Planner**         | Plan meals, calculate carbs, and estimate insulin dosage.                   | Supports proper nutrition and accurate insulin dosing.              |
| **Daily Tasks**          | A checklist of key diabetes-related actions (e.g., glucose check, insulin). | Helps reduce cognitive burden and maintain consistency.             |
| **Analytics**            | Visualizes trends in glucose, meals, insulin, and activity.                 | Enables smarter, data-driven decisions.                             |
| **CGM Integration**      | Syncs with Continuous Glucose Monitors (CGMs).                              | Improves data accuracy and enables real-time glucose tracking.      |

---

## 🧩 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **Database:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)

---

## 🧭 Purpose & Vision

People with Type 1 diabetes face numerous daily challenges, such as monitoring blood sugar to managing insulin doses and planning meals. **GlucoQuest** serves as a digital companion, helping users:

* Reduce the mental burden of care routines
* Gain insights into their health through clear data visualization
* Make informed decisions alongside their healthcare team
* Develop long-term healthy habits

---

## 🎥 Demo & 📄 Proposal

* 📽️ [Watch the Demo Video](https://binusianorg-my.sharepoint.com/personal/nathaniel_alexander_binus_ac_id/_layouts/15/guestaccess.aspx?share=EWgUNbrraKxLtU7By0_YKewBUlLqGnwN_dX-sksMmb51hg&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D&e=ZrcjJ2)
* 📘 [Read the Project Proposal](https://docs.google.com/document/d/1b2IzKehUlfrC5O4tOgTIOG2H4hZYEy4e1CgMe7uaZiU/edit?usp=sharing)

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Antiveg/GlucoQuest.git
   cd glucoquest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root of your project with the following values:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=yourSecureRandomSecret
   DATABASE_URL="postgresql://postgres:[password]@localhost:5432/[dbname]?schema=public"
   ```

   * Replace `[password]` with your PostgreSQL password.
   * Replace `[dbname]` with your PostgreSQL database name.

4. **Run the development server**

   ```bash
   npm run dev
   ```