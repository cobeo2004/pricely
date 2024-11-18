import { auth as middleware } from "@/lib/auth";

export { middleware };

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
