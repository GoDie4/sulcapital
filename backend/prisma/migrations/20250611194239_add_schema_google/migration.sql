-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `provider` VARCHAR(191) NULL DEFAULT 'credentials',
    MODIFY `password` VARCHAR(191) NULL;
