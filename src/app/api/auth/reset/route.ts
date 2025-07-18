import { directus } from "@/libs/directus";
import { passwordRequest } from "@directus/sdk";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { email } = await req.json();

  const resault = await directus
    .request(passwordRequest(email))
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (resault?.status == 204) {
    return NextResponse.json(resault, { status: 200 });
  } else return NextResponse.json(resault, { status: 400 });
};