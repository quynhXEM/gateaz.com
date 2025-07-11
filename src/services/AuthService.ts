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

export const registerHandle = async (data: any) => {
  try {
    const response = await fetch(
      `${window.location.origin}/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          data: data,
        }),
      }
    ).then(data => data.json())
    

    if (response?.ok) {
      return response?.result
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMeHandle = async () => {
  try {
    const response = await fetch(
      `${window.location.origin}/api/directus/request`,
      {
        method: "POST",
        body: JSON.stringify({
          type: "readMe",
        }),
      }
    )
      .then((data) => data.json())
      .then((data) => data);

    if (response?.ok) {
      return response?.result;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
