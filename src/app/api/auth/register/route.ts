import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  console.log(request);

  try {
    const { data } = await request.json();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.APP_TOKEN || ""}`);
    myHeaders.append("Content-Type", "application/json");

    const ip = getClientIp(request);
    const country_code = ip ? await getCountryCodeFromIp(ip) : null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ ...data, country_code }),
      headers: myHeaders,
    }).then((data) => data.json());

    return NextResponse.json({ ok: true, result: res });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  console.log(forwarded);

  if (forwarded) {
    return forwarded.split(",")[0]; // IP đầu tiên
  }

  return req.headers.get("x-real-ip") || null;
}

async function getCountryCodeFromIp(ip: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.ipinfo.io/lite/${ip}?token=68adae36b3207a`
    ).then((data) => data.json());
    console.log(res);

    return res?.country_code;
  } catch {
    return null;
  }
}
