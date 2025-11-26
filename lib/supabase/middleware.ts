import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const code = request.nextUrl.searchParams.get("code")
  if (code) {
    console.log("[v0] Middleware - Found OAuth code, exchanging for session")
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        console.error("[v0] Middleware - Code exchange error:", error)
      } else {
        console.log("[v0] Middleware - Code exchange successful, user:", data.user?.id)
      }
    } catch (err) {
      console.error("[v0] Middleware - Code exchange exception:", err)
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("[v0] Middleware - User:", user?.id, "Path:", request.nextUrl.pathname)

  // Protected routes - require authentication
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/onboarding") || request.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    console.log("[v0] Middleware - Redirecting unauthenticated user to home")
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // This allows logged-in users to see the homepage if they navigate back

  return supabaseResponse
}
