import { NextRequest, NextResponse } from "next/server";



export default function middleware(req: NextRequest) {
    const token = req.cookies.get('next-auth.session-token');
    // const currentUrl = req.nextUrl.pathname;
    if (!token) return NextResponse.rewrite(new URL('/login', req.url));

    return NextResponse.next();
}   

export const config = {
    matcher: ["/"],
} 