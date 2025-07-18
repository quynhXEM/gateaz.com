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
} from "@directus/sdk";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/utils/crypto";

const APP_TOKEN = process.env.APP_TOKEN || "";
export const POST = async (request: Request) => {
  try {
    let session = await getServerSession();
    session = await refreshToken(session);
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
      error: error.toString(),
    });
  }
};

export async function getServerSession() {
  const cookieStore = await cookies();
  const encrypted = cookieStore.get("session")?.value;

  if (!encrypted) return null;

  try {
    const decrypted = JSON.parse(decrypt(encrypted));
    return decrypted;
  } catch (err) {
    console.error("Failed to parse session from cookie", err);
    return null;
  }
}

export async function setSession(session: any) {
  const cookieStore = await cookies();
  cookieStore.set("session", encrypt(JSON.stringify(session)));
}

export async function refreshToken(session: any) {
  try {
    if (!session) return null;
    if (session.expires_at > Date.now()) return session;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: session?.refresh_token }),
      }
    )
      .then((res) => res.json())
      .then((data) => ({
        ...data.data,
        expires_at: Date.now() + 850000,
      }))
      .catch((err) => null);
    if (response) {
      await setSession(response);
    }
    return response;
  } catch (e) {
    throw new Error("Invalid refresh token");
  }
}
