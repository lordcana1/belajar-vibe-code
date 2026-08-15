import { Elysia, t } from "elysia";
import { registerUser, loginUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api/users" })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        await registerUser({
          name: body.name,
          email: body.email,
          password: body.password,
        });

        set.status = 200;
        return {
          data: "OK",
        };
      } catch (error) {
        set.status = 400;
        const errorMessage =
          error instanceof Error ? error.message : "Terjadi kesalahan pada server";
        return {
          error: errorMessage,
        };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, error: "Nama harus diisi" }),
        email: t.String({ format: "email", error: "Format email tidak valid" }),
        password: t.String({ minLength: 1, error: "Password harus diisi" }),
      }),
    }
  )
  .post(
    "/login",
    async ({ body, set }) => {
      try {
        const token = await loginUser({
          email: body.email,
          password: body.password,
        });

        set.status = 200;
        return {
          data: token,
        };
      } catch (error) {
        set.status = 400;
        const errorMessage =
          error instanceof Error ? error.message : "Terjadi kesalahan pada server";
        return {
          error: errorMessage,
        };
      }
    },
    {
      body: t.Object({
        email: t.String({ format: "email", error: "Format email tidak valid" }),
        password: t.String({ minLength: 1, error: "Password harus diisi" }),
      }),
    }
  );
