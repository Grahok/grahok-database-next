import { NextResponse } from "next/server";

export function middleware(request) {
    // Do nothing, just by existing it disables static optimization
    return NextResponse.next();
  }
  