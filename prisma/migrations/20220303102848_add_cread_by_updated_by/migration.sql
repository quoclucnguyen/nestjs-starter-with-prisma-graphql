-- AlterTable
ALTER TABLE `notification` ADD COLUMN `createdBy` INTEGER NULL,
    ADD COLUMN `updatedBy` INTEGER NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdBy` INTEGER NULL,
    ADD COLUMN `updatedBy` INTEGER NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;
