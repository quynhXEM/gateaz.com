export const POST = async (request: Request) => {
  try {
    const { data } = await request.json();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.APP_TOKEN || ""}`);
    myHeaders.append("Content-Type", "application/json");

    console.log(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    
    const register = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
    }).then((data) => data.json());

    return register;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
