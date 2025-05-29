-- AlterTable
ALTER TABLE `usuarios` MODIFY `tipo_documento` VARCHAR(50) NULL,
    MODIFY `documento` VARCHAR(50) NULL,
    MODIFY `rol_id` INTEGER NOT NULL DEFAULT 3;
