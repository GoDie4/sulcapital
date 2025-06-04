// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

// Rutas que cada rol puede visitar
const ROLE_ROUTES: Record<string, string[]> = {
  administrador: ["/ciudades", "/usuarios", "/propiedades"],
  anunciante: ["/sistema/ciudades", "/sistema/propiedades"],
  cliente: ["/sistema/propiedades"],
};

// Verifica con jose y extrae el rol
async function getUserRoleFromToken(token: string): Promise<string | null> {
  try {
    // ‘TOKEN_SECRET’ debe ser tu cadena secreta en base64 o hexadecimal
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const { payload }: { payload: JWTPayload } = await jwtVerify(token, secret);

    console.log("🔐 Payload JWT (jose):", payload);
    if (payload && typeof payload === "object" && "role" in payload) {
      return payload.role as string;
    }
    return null;
  } catch (err) {
    console.error("❌ Error verificando JWT con jose:", err);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("🚀 Middleware para:", pathname);

  // Solo aplicamos middleware en /sistema/*
  if (!pathname.startsWith("/sistema")) {
    return NextResponse.next();
  }

  // Leemos la cookie “token”
  const token = request.cookies.get("token")?.value;
  console.log("📦 Token desde cookie:", token);

  // Si no hay token, redirigimos a /iniciar-sesion
  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/iniciar-sesion";
    return NextResponse.redirect(loginUrl);
  }

  // Obtenemos el rol via jose
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
  console.log("🔍 Permitido para", role, ":", allowed, "| isAllowed:", isAllowed);

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
