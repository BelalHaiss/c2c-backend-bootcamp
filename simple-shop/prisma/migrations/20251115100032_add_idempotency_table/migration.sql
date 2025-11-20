-- CreateTable
CREATE TABLE `idempotencies` (
    `idempotency_key` VARCHAR(255) NOT NULL,
    `response` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `idempotency_status` ENUM('IN_PROGRESS', 'COMPLETED', 'FAILED') NOT NULL,

    PRIMARY KEY (`idempotency_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Create event to clean up expired idempotencies
CREATE EVENT IF NOT EXISTS `delete_expired_idempotencies`
ON SCHEDULE EVERY 10 MINUTE
DO
  DELETE FROM `idempotencies`
  WHERE `expires_at` < NOW();