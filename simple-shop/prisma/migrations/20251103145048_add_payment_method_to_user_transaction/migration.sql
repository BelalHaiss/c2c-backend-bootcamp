-- AlterTable
ALTER TABLE `user_transactions` ADD COLUMN `payment_method` ENUM('CASH') NOT NULL DEFAULT 'CASH';
