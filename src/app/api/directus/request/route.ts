import { NextResponse } from "next/server";
import { directus } from "@/libs/directus";
import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  updateItem,
  withToken,
  readMe,
  registerUser,
} from "@directus/sdk";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/crypto";

const APP_TOKEN = process.env.APP_TOKEN || "";
export const POST = async (request: Request) => {
  try {
    const session = await getServerSession();
    console.log(session);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const type = data?.type ?? "";
    const collection = data?.collection ?? "";
    const id = data?.id ?? "";
    const params = data?.params ?? "";
    const items = data?.items ?? null;
    const admin = data?.admin ?? false;
    if (type) {
      let res;

      // await refreshToken();
      const { access_token } = session;

      switch (type) {
        case "readMe":
          res = await directus.request(withToken(access_token || "", readMe()));
          break;
        case "readItem":
          res = await directus.request(
            withToken(
              (admin ? APP_TOKEN : access_token) || "",
              readItem(collection, id, params)
            )
          );
          break;

        case "readItems":
          res = await directus.request(
            withToken(
              (admin ? APP_TOKEN : access_token) || "",
              readItems(collection, params)
            )
          );
          break;

        case "updateItem":
          res = await directus.request(
            withToken(
              (admin ? APP_TOKEN : access_token) || "",
              updateItem(collection, id, items)
            )
          );
          break;

        case "createItem":
          res = await directus.request(
            withToken(
              (admin ? APP_TOKEN : access_token) || "",
              createItem(collection, items, params)
            )
          );
          break;

        case "deleteItem":
          res = await directus.request(
            withToken(
              (admin ? APP_TOKEN : access_token) || "",
              deleteItem(collection, items)
            )
          );
          break;
      }

      if (res) {
        return NextResponse.json({ ok: true, result: res });
      }
    }

    return NextResponse.json({
      error: "DIRECTUS_REQUEST_ERROR",
    });
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error API directus:", error);
    }
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      return NextResponse.json(
        { error: "Directus Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.json({
      error: "DIRECTUS_REQUEST_ERROR",
    });
  }
};

export async function getServerSession() {
  const cookieStore = await cookies(); // ✅ đúng
  const encrypted = cookieStore.get("session")?.value;

  if (!encrypted) return null;

  try {
    const decrypted = decrypt(encrypted);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("Failed to parse session from cookie", err);
    return null;
  }
}
