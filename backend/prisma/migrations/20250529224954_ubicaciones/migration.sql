/*
  Warnings:

  - You are about to drop the `ubicaciones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ubicaciones`;

-- CreateTable
CREATE TABLE `ciudades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(30) NOT NULL,
    `imagen` VARCHAR(191) NOT NULL,
    `coordenadas` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
