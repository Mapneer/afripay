import Whop from "@whop/sdk";

if (!process.env.WHOP_API_KEY) {
  throw new Error("Missing WHOP_API_KEY in .env.local");
}

export const whop = new Whop({
  apiKey: process.env.WHOP_API_KEY
});