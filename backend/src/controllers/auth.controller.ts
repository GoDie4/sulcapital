import { Response, Request } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import createAccessToken from "../utils/jwt";
import { sendEmail } from "./mail.controller";
import { ENV } from "../config/config";
import prisma from "../config/database";
import { LoginRequest } from "interfaces/auth.interfaces";
import { formatFechaHora } from "../logic/formatearFechas";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
): Promise<any | undefined> => {
  const { email, password, mantenerConexion } = req.body;

  try {
    const usuarioExiste = await prisma.usuario.findFirst({
      where: { email },
    });

    if (!usuarioExiste)
      return res.status(400).json({ message: "El usuario no existe" });

    const isMatch = await bcrypt.compare(
      password,
      usuarioExiste.password ?? ""
    );

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const role = await prisma.rol.findFirst({
      where: { id: usuarioExiste.rol_id },
    });

    console.error("TOKEN PROCESS ENV:", process.env.TOKEN_SECRET);

    console.error(
      "TOKEN_SECRET:",
      ENV.TOKEN_SECRET ? "[OK]" : "[❌ NO DEFINIDO]"
    );

    const token = await createAccessToken({
      id: usuarioExiste.id,
      role: role?.nombre !== undefined ? role.nombre : "",
    });

    console.error("TOKEN GENERADO:", token);

    res.cookie("token", token, {
      sameSite: "none", // "lax" funciona bien localmente
      secure: false, // false porque en localhost normalmente usas http
      httpOnly: true,
      domain: ENV.COOKIE_DOMAIN, // o simplemente omítelo en entorno local
      maxAge: mantenerConexion ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
      //maxAge: mantenerConexion ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
    });

    console.error("ENV.COOKIE_DOMAIN:", ENV.COOKIE_DOMAIN);

    const primerNombre = usuarioExiste.nombres.split(" ");

    res.json({
      message: `Bienvenido ${primerNombre[0]}`,
      usuario: {
        id: usuarioExiste.id,
        nombres: usuarioExiste.nombres,
        apellidos: usuarioExiste.apellidos,
        celular: usuarioExiste.celular,
        email: usuarioExiste.email,
        rol_id: usuarioExiste.rol_id,
        rol: usuarioExiste.rol_id,
        avatarUrl: usuarioExiste.avatarUrl,
        provider: usuarioExiste.provider,
      },
      status: 200,
      token: token,
    });
  } catch (error: any) {
    console.error(
      "TOKEN_SECRET:",
      ENV.TOKEN_SECRET ? "[OK]" : "[❌ NO DEFINIDO]"
    );

    console.error("Error al iniciar sesión");
    console.error("Detalles del error:", JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      console.error("Mensaje:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error("Error no estándar:", error);
    }

    return res
      .status(500)
      .json({ message: "Error interno", error: error?.message || error });
  }
};

export const register = async (
  req: Request,
  res: Response
): Promise<any | undefined> => {
  const {
    nombres,
    apellidos,
    tipo_documento,
    documento,
    email,
    celular,
    password,
    rol,
  } = req.body;

  try {
    const existeUsuario = await prisma.usuario.findFirst({
      where: {
        OR: [{ email }, { documento }],
      },
    });

    if (existeUsuario) {
      return res.status(400).json({
        message: "El correo o documento ya están registrados",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombres,
        apellidos,
        tipo_documento,
        documento,
        email,
        celular,
        password: hashedPassword,
        activo: false,
        rol_id: rol === "ANUNCIANTE" ? 2 : 3,
      },
    });

    const role = await prisma.rol.findFirst({
      where: { id: nuevoUsuario.rol_id },
    });

    // Generar el token
    const token = await createAccessToken({
      id: nuevoUsuario.id,
      role: role?.nombre !== undefined ? role.nombre : "",
    });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      domain: ENV.COOKIE_DOMAIN,
      maxAge: 2 * 60 * 60 * 1000,
    });

    const primerNombre = nuevoUsuario.nombres.split(" ");
    await sendEmail(
      `${ENV.ADMIN_EMAIL}`,
      "Nuevo registro",
      `NuevoRegistro.html`,
      {
        usuario: nuevoUsuario?.nombres + " " + nuevoUsuario.apellidos,
        email: nuevoUsuario.email,
        fecha: formatFechaHora(nuevoUsuario.createdAt),
      }
    );
    res.json({
      message: `Bienvenido ${primerNombre[0]}`,
      usuario: {
        id: nuevoUsuario.id,
        nombres: nuevoUsuario.nombres,
        apellidos: nuevoUsuario.apellidos,
        celular: nuevoUsuario.celular,
        email: nuevoUsuario.email,
        rol_id: nuevoUsuario.rol_id,
        avatarUrl: nuevoUsuario.avatarUrl,
        provider: nuevoUsuario.provider,
      },
      status: 200,
      token: token,
    });
  } catch (error: any) {
    console.error("Error al registrar usuario", error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const recuperarContrasena = async (req: any, res: any) => {
  const { email } = req.body;

  const user = await prisma.usuario.findFirst({ where: { email } });
  if (!user) return res.status(404).json({ message: "Correo no registrado" });

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 30);

  await prisma.passwordResetToken.create({
    data: {
      token,
      expiresAt: expires,
      userId: user.id,
    },
  });

  const resetLink = `https://sulcapital.pe/restablecer?token=${token}`;

  await sendEmail(
    user.email,
    "Recuperar contraseña",
    `RecuperarContrasena.html`,
    {
      enlace: resetLink,
      nombre: user.nombres.split(" ")[0],
    }
  );

  res.json({
    message: "Te hemos enviado un enlace para restablecer tu contraseña.",
  });
};


export const cambiarContrasenaConToken = async (req: any, res: any) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token y nueva contraseña son obligatorios" });
    }

    // 1️⃣ Buscar el token en la base de datos
    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    if (!tokenRecord) {
      return res.status(400).json({ message: "Token inválido" });
    }

    // 2️⃣ Verificar si expiró
    if (tokenRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "El token ha expirado" });
    }

    // 3️⃣ Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4️⃣ Actualizar la contraseña del usuario
    await prisma.usuario.update({
      where: { id: tokenRecord.userId },
      data: { password: hashedPassword },
    });

    // 5️⃣ Eliminar el token para que no se reutilice
    await prisma.passwordResetToken.delete({
      where: { id: tokenRecord.id },
    });

    return res.json({ message: "Contraseña cambiada correctamente" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};

export const cambiarContrasenaLogueado = async (req: any, res: any) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { password: hashedPassword },
    });

    return res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const cambiarContrasena = async (req: any, res: any) => {
  const { token, newPassword } = req.body;

  let userId: string | undefined = undefined;

  if (token) {
    // 🔹 Modo recuperación vía email
    const registro = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!registro || registro.expiresAt < new Date()) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    userId = registro.userId;

    // Borramos el token ya usado
    await prisma.passwordResetToken.delete({ where: { token } });
  } else if (req.user?.id) {
    // 🔹 Modo usuario logueado
    userId = req.user.id;
  } else {
    return res.status(401).json({ message: "No autorizado" });
  }

  // 🔹 Actualizamos contraseña
  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.usuario.update({
    where: { id: userId },
    data: { password: hashed },
  });

  return res.json({ message: "Contraseña actualizada con éxito" });
};

export const logout = (req: any, res: any) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: ENV.COOKIE_DOMAIN,
    path: "/",
  });
  return res.sendStatus(200);
};

export const googleAuth = async (req: any, res: any) => {
  const { id_token, rol } = req.body;

  if (!id_token) {
    return res.status(400).json({ message: "Falta el token de Google" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: ENV.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ message: "Token inválido" });
    }

    const { email, name, picture } = payload;

    // Buscar usuario por email
    let usuario = await prisma.usuario.findUnique({ where: { email } });

    // Si el usuario NO existe → registro → se requiere `rol`
    if (!usuario) {
      if (!rol) {
        return res
          .status(400)
          .json({ message: "El campo rol es obligatorio para registrarse" });
      }

      const rolNombre = rol.toUpperCase();
      const rolDB = await prisma.rol.findUnique({
        where: { nombre: rolNombre },
      });

      if (!rolDB) {
        return res.status(400).json({ message: "Rol no válido" });
      }

      const [nombres, ...resto] = (name || "").split(" ");
      const apellidos = resto.join(" ") || "";

      usuario = await prisma.usuario.create({
        data: {
          email,
          nombres: nombres || "Nombre",
          apellidos: apellidos,
          celular: "",
          provider: "google",
          avatarUrl: picture || null,
          activo: true,
          rol_id: rolDB.id,
        },
      });
    }

    // Obtener rol para el token JWT
    const usuarioRol = await prisma.rol.findUnique({
      where: { id: usuario.rol_id },
    });

    const token = await createAccessToken({
      id: usuario.id,
      role: usuarioRol?.nombre ?? "",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: ENV.COOKIE_DOMAIN,
    });

    return res.json({
      message:
        usuario.createdAt === usuario.updatedAt
          ? "Registro exitoso con Google"
          : "Autenticado correctamente con Google",
      usuario,
    });
  } catch (error: any) {
    console.error("Error en autenticación con Google:", error);

    return res.status(500).json({ message: "Error interno al autenticar" });
  }
};

export const facebookAuth = async (req: any, res: any) => {
  const { access_token, rol } = req.body;

  if (!access_token) {
    return res
      .status(400)
      .json({ message: "Falta el token de acceso de Facebook" });
  }

  try {
    // Obtener perfil desde Facebook
    const fbRes = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        fields: "id,name,email,picture",
        access_token,
      },
    });

    const { email, name, picture } = fbRes.data;

    if (!email) {
      return res
        .status(400)
        .json({ message: "No se pudo obtener el email desde Facebook" });
    }

    // Buscar usuario en la base de datos
    let usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      // Si el usuario no existe, se necesita el rol
      if (!rol) {
        return res
          .status(400)
          .json({ message: "El campo rol es obligatorio para el registro" });
      }

      const rolNombre = rol.toUpperCase();
      const rolDB = await prisma.rol.findUnique({
        where: { nombre: rolNombre },
      });

      if (!rolDB) {
        return res.status(400).json({ message: "Rol no válido" });
      }

      const [nombres, ...resto] = name.split(" ");
      const apellidos = resto.join(" ") || "";

      usuario = await prisma.usuario.create({
        data: {
          email,
          nombres,
          apellidos,
          celular: "",
          provider: "facebook",
          avatarUrl: picture?.data?.url || null,
          activo: true,
          rol_id: rolDB.id,
        },
      });
    }

    // Emitir JWT con el rol real del usuario
    const rolDB = await prisma.rol.findUnique({
      where: { id: usuario.rol_id },
    });

    console.log("usuario: ", usuario);
    console.log("rol: ", rolDB);

    const token = await createAccessToken({
      id: usuario.id,
      role: rolDB?.nombre ?? "cliente",
    });

    console.log("TOKEN: ", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      domain: ENV.COOKIE_DOMAIN,
    });

    return res.json({
      message: "Autenticado correctamente con Facebook",
      usuario,
    });
  } catch (error: any) {
    console.error("Error en Facebook auth:", error);
    return res
      .status(500)
      .json({ message: "Error al autenticar con Facebook" });
  }
};
