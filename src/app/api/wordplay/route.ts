import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  return {
    test: request.url,
  };
}
