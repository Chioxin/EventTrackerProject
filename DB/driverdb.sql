-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema driverdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `driverdb` ;

-- -----------------------------------------------------
-- Schema driverdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `driverdb` DEFAULT CHARACTER SET utf8 ;
USE `driverdb` ;

-- -----------------------------------------------------
-- Table `driver`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `driver` ;

CREATE TABLE IF NOT EXISTS `driver` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(100) NULL,
  `road` VARCHAR(200) NULL,
  `plate` VARCHAR(8) NULL,
  `car` VARCHAR(100) NULL,
  `description` TEXT NULL,
  `report_date` DATETIME NULL,
  `create_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS cop;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'cop' IDENTIFIED BY 'cop';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'cop';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `driver`
-- -----------------------------------------------------
START TRANSACTION;
USE `driverdb`;
INSERT INTO `driver` (`id`, `city`, `road`, `plate`, `car`, `description`, `report_date`, `create_at`) VALUES (1, 'Denver', 'I-25', 'ABC-111', 'Saturn', 'This guy liked to swirv in traffic.', NULL, NULL);
INSERT INTO `driver` (`id`, `city`, `road`, `plate`, `car`, `description`, `report_date`, `create_at`) VALUES (2, 'Aurora', 'Mississippi and Sable', 'ABC-354', 'Mazda', 'Ran a red light.', NULL, NULL);
INSERT INTO `driver` (`id`, `city`, `road`, `plate`, `car`, `description`, `report_date`, `create_at`) VALUES (3, 'Westminster', 'I-25', 'ABC-624', 'Honda', 'Hit a pedestrian and drove off!', NULL, NULL);

COMMIT;

