# Belajar Vibe Code (Bun + ElysiaJS + Drizzle + MySQL)

A modern, lightweight, and blazing-fast backend starter boilerplate built with **Bun**, **ElysiaJS**, and **Drizzle ORM** connected to **MySQL**.

---

## 🛠️ Tech Stack

- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** [ElysiaJS](https://elysiajs.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** [MySQL](https://www.mysql.com/) (via `mysql2`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
bun install
```

### 2. Environment Variables
Copy `.env.example` to `.env` and adjust the database credentials:
```bash
cp .env.example .env
```

Set your `DATABASE_URL` in `.env`:
```env
PORT=3000
DATABASE_URL="mysql://root:password@localhost:3306/belajar_vibe_code"
```

### 3. Database Migration & Schema Sync
- Generate migrations from schema:
  ```bash
  bun run db:generate
  ```
- Push schema directly to MySQL database:
  ```bash
  bun run db:push
  ```
- Open Drizzle Studio UI:
  ```bash
  bun run db:studio
  ```

### 4. Running the Development Server
```bash
bun run dev
```

The server will start at `http://localhost:3000`.

---

## 📡 API Endpoints

- `GET /` - Health check & server status.
- `GET /users` - Fetch all users from MySQL.
- `POST /users` - Create a new user (`name`, `email`).
