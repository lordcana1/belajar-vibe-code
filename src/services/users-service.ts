import { eq } from "drizzle-orm";
import { db, users, userTokens } from "../db";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
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

export async function loginUser(input: LoginUserInput): Promise<string> {
  // 1. Find user by email
  const matchedUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);

  const user = matchedUsers[0];
  if (!user) {
    throw new Error("email / password salah");
  }

  // 2. Verify password with bcrypt
  const isPasswordValid = await Bun.password.verify(
    input.password,
    user.password,
    "bcrypt"
  );

  if (!isPasswordValid) {
    throw new Error("email / password salah");
  }

  // 3. Generate token using UUID v4
  const token = crypto.randomUUID();

  // 4. Save token to user_tokens table
  await db.insert(userTokens).values({
    token,
    userId: user.id,
  });

  return token;
}
