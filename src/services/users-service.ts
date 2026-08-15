import { eq } from "drizzle-orm";
import { db, users } from "../db";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(input: RegisterUserInput): Promise<void> {
  // 1. Check if email already exists
  const existingUsers = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  if (existingUsers.length > 0) {
    throw new Error("email sudah terdaftar");
  }

  // 2. Hash password with bcrypt using Bun's built-in password hasher
  const hashedPassword = await Bun.password.hash(input.password, {
    algorithm: "bcrypt",
    cost: 10,
  });

  // 3. Insert new user into database
  await db.insert(users).values({
    name: input.name,
    email: input.email,
    password: hashedPassword,
  });
}
