import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminArea = pathname.startsWith("/admin") && !isAdminLoginPage;
  const isCustomerLoginPage = pathname === "/login";
  const isAccountArea = pathname.startsWith("/account");

  // --- Admin area: requires a session AND admin_users membership ---
  if (isAdminArea) {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!adminRow) {
      // Logged in, but not an admin account — send them home rather than
      // showing the admin shell.
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (user && isAdminLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // --- Customer account area: any logged-in visitor may enter ---
  if (isAccountArea && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isCustomerLoginPage) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/login"],
};
