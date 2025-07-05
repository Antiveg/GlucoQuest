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

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/glucoquest.git
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
