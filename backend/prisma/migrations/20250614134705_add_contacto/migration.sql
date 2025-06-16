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
ALTER TABLE `CorreoEmpresa` ADD CONSTRAINT `CorreoEmpresa_empresaContactoId_fkey` FOREIGN KEY (`empresaContactoId`) REFERENCES `empresa_contacto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TelefonoEmpresa` ADD CONSTRAINT `TelefonoEmpresa_empresaContactoId_fkey` FOREIGN KEY (`empresaContactoId`) REFERENCES `empresa_contacto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
