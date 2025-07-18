import { directus } from "@/libs/directus";
import { passwordRequest } from "@directus/sdk";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { email } = await req.json();

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: email,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const resault = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/password/request`,
    requestOptions
  )

  if (resault?.status == 204) {
    return NextResponse.json({ ok: true }, { status: 200 });
  } else return NextResponse.json({ ok: false }, { status: 400 });
};
