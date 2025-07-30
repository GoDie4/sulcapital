import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { compactVerify } from "jose";
export interface JWTPayload {
  id: number | string;
  role: number | string;
}
const ROLE_ROUTES: Record<string, string[]> = {
  administrador: ["/ciudades", "/usuarios", "/propiedades", "/sistema/perfil", "banners"],
  anunciante: [
    "/sistema/ciudades",
    "/sistema/propiedades",
    "/sistema/perfil",
    "/sistema/favoritos",
    "/sistema/vistos",
  ],
  cliente: [
    "/sistema/propiedades",
    "/sistema/perfil",
    "/sistema/favoritos",
    "/sistema/vistos",
  ],
};

 async function getUserRoleFromToken(token: string): Promise<string | null> {
  try {
    const secret = new TextEncoder().encode('SULCAPITAL__LOGOSPERU_2025');

    const { payload } = await compactVerify(token, secret);
    const decodedPayload = JSON.parse(new TextDecoder().decode(payload)) as JWTPayload;

    return decodedPayload?.role?.toString() ?? null;
  } catch (err) {
    console.error("❌ Error verificando JWT con jose:", err);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("🚀 Middleware para:", pathname);

  if (!pathname.startsWith("/sistema")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  console.log("📦 Token desde cookie:", token);

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/iniciar-sesion";
    return NextResponse.redirect(loginUrl);
  }

  const role = await getUserRoleFromToken(token);
  console.log("🧑‍💼 Rol obtenido:", role);

  // Si token inválido o sin rol → /iniciar-sesion
  if (!role) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/iniciar-sesion";
    return NextResponse.redirect(loginUrl);
  }

  // Si es administrador, acceso total
  if (role === "administrador") {
    return NextResponse.next();
  }

  // Rutas permitidas para este rol
  const allowed = ROLE_ROUTES[role] || [];
  const isAllowed = allowed.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  console.log(
    "🔍 Permitido para",
    role,
    ":",
    allowed,
    "| isAllowed:",
    isAllowed
  );

  if (isAllowed) {
    return NextResponse.next();
  }

  // Si no está permitido → /no-autorizado
  const noAuthUrl = request.nextUrl.clone();
  noAuthUrl.pathname = "/no-autorizado";
  return NextResponse.redirect(noAuthUrl);
}

// Solo interceptamos rutas que empiecen con `/sistema`
export const config = {
  matcher: ["/sistema/:path*"],
};
