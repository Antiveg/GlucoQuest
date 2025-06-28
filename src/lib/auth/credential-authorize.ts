import { UserCredentials } from "@/app/auth/signin/page";
import { validateUserCredentials } from "@/lib/services/user/user-auth-services";

const authorizeWithCredentials = async (credentials : UserCredentials) => {
  try {
    const user = await validateUserCredentials(credentials.email, credentials.password);
    return user;
  } catch (error) {
    return null;
  }
}

export { authorizeWithCredentials }
