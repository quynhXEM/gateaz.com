import { directus } from "@/libs/directus";
import { clearSession } from "@/utils/token";

export const loginHandle = async ({
  email,
  password,
}: {
  email: any;
  password: any;
}) => {
  try {
    const response = await directus.login({
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutHandle = async () => {
  try {
    // const response = await directus.logout();
    clearSession();
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
