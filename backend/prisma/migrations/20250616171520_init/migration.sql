-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `roles_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` CHAR(36) NOT NULL,
    `nombres` VARCHAR(255) NOT NULL,
    `apellidos` VARCHAR(255) NOT NULL,
    `tipo_documento` VARCHAR(50) NULL,
    `documento` VARCHAR(50) NULL,
    `email` VARCHAR(255) NOT NULL,
    `celular` VARCHAR(20) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NULL,
    `rol_id` INTEGER NOT NULL DEFAULT 3,
    `provider` VARCHAR(191) NULL DEFAULT 'credentials',
    `avatarUrl` VARCHAR(191) NULL,
    `publicaciones_automaticas` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_documento_key`(`documento`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    INDEX `usuarios_rol_id_fkey`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `password_reset_tokens_token_key`(`token`),
    INDEX `password_reset_tokens_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ciudades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(30) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `coordenadas` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_propiedades` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `icono` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `propiedades` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `descripcionLarga` LONGTEXT NOT NULL,
    `descripcionCorta` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `precio` DOUBLE NOT NULL,
    `video` VARCHAR(191) NULL,
    `coordenadas` VARCHAR(191) NULL,
    `disponibilidad` ENUM('EN_COMPRA', 'EN_VENTA', 'EN_ALQUILER') NOT NULL,
    `exclusivo` BOOLEAN NOT NULL DEFAULT false,
    `tipoPropiedadId` VARCHAR(191) NOT NULL,
    `ciudadId` INTEGER NOT NULL,
    `estado` ENUM('EN_REVISION', 'PUBLICADO', 'RECHAZADO', 'OCULTO') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `idUser` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagenes_propiedades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `propiedadImagenId` VARCHAR(191) NULL,
    `propiedadFondoPortadaId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `propiedadId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `favorito_userId_propiedadId_key`(`userId`, `propiedadId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recientemente_visto` (
    `id` VARCHAR(191) NOT NULL,
    `propiedadId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `vistaEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `recientemente_visto_userId_idx`(`userId`),
    UNIQUE INDEX `recientemente_visto_propiedadId_userId_key`(`propiedadId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresa_contacto` (
    `id` VARCHAR(191) NOT NULL,
    `facebook` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `tiktok` VARCHAR(191) NULL,
    `youtube` VARCHAR(191) NULL,
    `linkedin` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NOT NULL,
    `horarios` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CorreoEmpresa` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `posicion` VARCHAR(191) NOT NULL,
    `empresaContactoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelefonoEmpresa` (
    `id` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `posicion` VARCHAR(191) NOT NULL,
    `empresaContactoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `password_reset_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propiedades` ADD CONSTRAINT `propiedades_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propiedades` ADD CONSTRAINT `propiedades_tipoPropiedadId_fkey` FOREIGN KEY (`tipoPropiedadId`) REFERENCES `tipo_propiedades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propiedades` ADD CONSTRAINT `propiedades_ciudadId_fkey` FOREIGN KEY (`ciudadId`) REFERENCES `ciudades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imagenes_propiedades` ADD CONSTRAINT `FK_imagen_propiedadImagen` FOREIGN KEY (`propiedadImagenId`) REFERENCES `propiedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imagenes_propiedades` ADD CONSTRAINT `FK_imagen_propiedadFondo` FOREIGN KEY (`propiedadFondoPortadaId`) REFERENCES `propiedades`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorito` ADD CONSTRAINT `favorito_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorito` ADD CONSTRAINT `favorito_propiedadId_fkey` FOREIGN KEY (`propiedadId`) REFERENCES `propiedades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recientemente_visto` ADD CONSTRAINT `recientemente_visto_propiedadId_fkey` FOREIGN KEY (`propiedadId`) REFERENCES `propiedades`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recientemente_visto` ADD CONSTRAINT `recientemente_visto_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CorreoEmpresa` ADD CONSTRAINT `CorreoEmpresa_empresaContactoId_fkey` FOREIGN KEY (`empresaContactoId`) REFERENCES `empresa_contacto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TelefonoEmpresa` ADD CONSTRAINT `TelefonoEmpresa_empresaContactoId_fkey` FOREIGN KEY (`empresaContactoId`) REFERENCES `empresa_contacto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
