-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema scsac
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema scsac
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scsac` DEFAULT CHARACTER SET utf8mb3 ;
USE `scsac` ;

-- -----------------------------------------------------
-- Table `scsac`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scsac`.`user` (
  `id` VARCHAR(255) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `authority` INT NOT NULL DEFAULT '3',
  `generation` INT NOT NULL,
  `affiliate` VARCHAR(10) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `nickname` VARCHAR(45) NULL DEFAULT NULL,
  `boj_id` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `scsac`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scsac`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `scsac`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scsac`.`article` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` TINYTEXT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `is_updated` INT NULL DEFAULT '0',
  `title` VARCHAR(200) NOT NULL,
  `views` INT NULL DEFAULT '0',
  `category_id` BIGINT NOT NULL,
  `user_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKy5kkohbk00g0w88fi05k2hcw` (`category_id` ASC) VISIBLE,
  INDEX `FKbc2qerk3l47javnl2yvn51uoi` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKbc2qerk3l47javnl2yvn51uoi`
    FOREIGN KEY (`user_id`)
    REFERENCES `scsac`.`user` (`id`),
  CONSTRAINT `FKy5kkohbk00g0w88fi05k2hcw`
    FOREIGN KEY (`category_id`)
    REFERENCES `scsac`.`category` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
