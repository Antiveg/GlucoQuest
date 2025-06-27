import { queryUserByEmail } from "@/lib/data-layers/users";
import bcrypt from "bcryptjs";

export async function validateUserCredentials(email: string, password: string) {
  const user = await queryUserByEmail(email);
  if (!user || !user.password) throw new Error("Invalid email or password");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid email or password");

  return {
    id: String(user.id),
    name: user.name,
    image: user.image,
    email: user.email,
  };
}
