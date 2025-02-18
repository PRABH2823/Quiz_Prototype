/*
  Warnings:

  - You are about to drop the column `confirmpass` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `currentpass` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `newpass` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leaderboard` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `confirmpass`,
    DROP COLUMN `currentpass`,
    DROP COLUMN `newpass`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Leaderboard_userId_key` ON `Leaderboard`(`userId`);

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leaderboard` ADD CONSTRAINT `Leaderboard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OneVOne` ADD CONSTRAINT `OneVOne_player1_fkey` FOREIGN KEY (`player1`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OneVOne` ADD CONSTRAINT `OneVOne_player2_fkey` FOREIGN KEY (`player2`) REFERENCES `Login`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
