import { getSession } from "@/utils/token";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const { refresh_token } = await getSession();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refresh_token }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return NextResponse.json({ ok: true, result: data.data }, { status: 200 });
      })
      .catch((err) => {
        return NextResponse.json({ ok: false, result: err }, { status: 200 });
      });

    return response;
  } catch (e) {
    throw new Error("Invalid refresh token");
  }
};
