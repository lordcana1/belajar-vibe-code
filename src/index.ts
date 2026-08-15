import { Elysia, t } from "elysia";
import { db, users } from "./db";

const app = new Elysia()
  .get("/", () => ({
    status: "ok",
    message: "Server is running smoothly with ElysiaJS + Bun + Drizzle + MySQL!",
    timestamp: new Date().toISOString(),
  }))
  .group("/users", (app) =>
    app
      .get("/", async () => {
        try {
          const allUsers = await db.select().from(users);
          return {
            success: true,
            data: allUsers,
          };
        } catch (error) {
          return {
            success: false,
            message: "Failed to fetch users (check MySQL database connection).",
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      })
      .post(
        "/",
        async ({ body }) => {
          try {
            await db.insert(users).values({
              name: body.name,
              email: body.email,
            });
            return {
              success: true,
              message: "User created successfully",
            };
          } catch (error) {
            return {
              success: false,
              message: "Failed to create user",
              error: error instanceof Error ? error.message : "Unknown error",
            };
          }
        },
        {
          body: t.Object({
            name: t.String({ minLength: 1 }),
            email: t.String({ format: "email" }),
          }),
        }
      )
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
