/*
  Warnings:

  - You are about to drop the column `userId` on the `leaderboard` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmpass` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentpass` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newpass` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Leaderboard_userId_key` ON `leaderboard`;

-- AlterTable
ALTER TABLE `leaderboard` DROP COLUMN `userId`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `trophy` VARCHAR(191) NULL,
    ADD COLUMN `username` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `confirmpass` VARCHAR(191) NOT NULL,
    ADD COLUMN `currentpass` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `newpass` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Leaderboard_email_key` ON `Leaderboard`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_email_key` ON `Profile`(`email`);
