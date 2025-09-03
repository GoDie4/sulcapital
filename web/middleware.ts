/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Configuración de rutas por rol
const ROLE_ROUTES: Record<string, string[]> = {
  administrador: [
    "/ciudades",
    "/usuarios",
    "/propiedades",
    "/sistema/perfil",
    "banners",
  ],
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
    const JWT_SECRET = "SULCAPITAL__LOGOSPERU_2025";
    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET no configurado");
      return null;
    }

    // jose necesita la secret en Uint8Array
    const secret = new TextEncoder().encode(JWT_SECRET);

    // Verificar token
    const { payload } = await jwtVerify(token, secret);

    const role = (payload as any)?.role || (payload as any)?.user?.role;

    return role || null;
  } catch (error) {
    console.error("❌ Error verificando token:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("🚀 Middleware para:", pathname);

  // Solo procesar rutas del sistema
  if (!pathname.startsWith("/sistema")) {
    return NextResponse.next();
  }

  // Verificar token en cookies
  const token = request.cookies.get("token")?.value;
  console.log("📦 Token encontrado:", !!token);

  // Si no hay token, redirigir al login
  if (!token) {
    console.log("🚫 Sin token - redirigiendo a login");
    return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
  }

  // Obtener rol del usuario
  const role = await getUserRoleFromToken(token);
  console.log("🧑‍💼 Rol del usuario:", role);

  // Si token inválido o sin rol, redirigir al login y limpiar cookie
  if (!role) {
    console.log("🚫 Token inválido - redirigiendo a login");
    const response = NextResponse.redirect(
      new URL("/iniciar-sesion", request.url)
    );
    response.cookies.delete("token");
    return response;
  }

  // Los administradores tienen acceso total
  if (role === "administrador") {
    console.log("✅ Administrador - acceso completo");
    return NextResponse.next();
  }

  // Verificar permisos para otros roles
  const allowedRoutes = ROLE_ROUTES[role] || [];
  const isAuthorized = allowedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  console.log(`🔍 Verificando permisos para ${role}:`, {
    allowedRoutes,
    currentPath: pathname,
    isAuthorized,
  });

  if (isAuthorized) {
    console.log("✅ Acceso autorizado");
    return NextResponse.next();
  }

  // Si no está autorizado, redirigir a página de error
  console.log("🚫 Acceso denegado - redirigiendo a no-autorizado");
  return NextResponse.redirect(new URL("/no-autorizado", request.url));
}

export const config = {
  matcher: ["/sistema/:path*"],
};
