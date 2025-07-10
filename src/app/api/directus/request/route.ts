import { NextResponse } from "next/server";
import { directus } from "@/libs/directus";
import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  updateItem,
  withToken,
} from "@directus/sdk";
import { getSession } from "@/utils/token";

export const POST = async (request: Request) => {
  try {
    const session = getSession();
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
      const {
        user: { access_token },
      } = getSession();

      switch (type) {
        case "readItem":
          res = await directus.request(
            withToken(
              (admin ? process.env.DEV_TOKEN : access_token) || "",
              readItem(collection, id, params)
            )
          );
          break;

        case "readItems":
          res = await directus.request(
            withToken(
              (admin ? process.env.DEV_TOKEN : access_token) || "",
              readItems(collection, params)
            )
          );
          break;

        case "updateItem":
          res = await directus.request(
            withToken(
              (admin ? process.env.DEV_TOKEN : access_token) || "",
              updateItem(collection, id, items)
            )
          );
          break;

        case "createItem":
          res = await directus.request(
            withToken(
              (admin ? process.env.DEV_TOKEN : access_token) || "",
              createItem(collection, items, params)
            )
          );
          break;

          case "deleteItem":
          res = await directus.request(
            withToken(
              (admin ? process.env.DEV_TOKEN : access_token) || "",
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