import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { data } = await request.json();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.APP_TOKEN || ""}`);
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders,
    }).then((data) => data.json());

    return NextResponse.json({ ok: true, result: res });;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
