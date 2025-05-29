-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

SET GROUP_CONCAT_MAX_LEN = 100000;
SELECT GROUP_CONCAT(CONCAT('`', table_name, '`') SEPARATOR ', ') INTO @tables
FROM information_schema.tables
WHERE table_schema = 'scsac';

SET @sql = CONCAT('DROP TABLE IF EXISTS ', @tables);
SET FOREIGN_KEY_CHECKS = 0;
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;


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
  `affiliate` VARCHAR(10) NULL DEFAULT NULL,
  `authority` VARCHAR(255) NOT NULL,
  `boj_id` VARCHAR(100) NULL DEFAULT NULL,
  `generation` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `nickname` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `scsac`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scsac`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `authority` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
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
  INDEX `FK40sd478r28m1ogiheo1mw67bi` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK40sd478r28m1ogiheo1mw67bi`
    FOREIGN KEY (`user_id`)
    REFERENCES `scsac`.`user` (`id`),
  CONSTRAINT `FKy5kkohbk00g0w88fi05k2hcw`
    FOREIGN KEY (`category_id`)
    REFERENCES `scsac`.`category` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `scsac`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scsac`.`comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `content` TINYTEXT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `article_id` BIGINT NOT NULL,
  `user_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK5yx0uphgjc6ik6hb82kkw501y` (`article_id` ASC) VISIBLE,
  INDEX `FKn6xssinlrtfnm61lwi0ywn71q` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK5yx0uphgjc6ik6hb82kkw501y`
    FOREIGN KEY (`article_id`)
    REFERENCES `scsac`.`article` (`id`),
  CONSTRAINT `FKn6xssinlrtfnm61lwi0ywn71q`
    FOREIGN KEY (`user_id`)
    REFERENCES `scsac`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `scsac`.`alert`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scsac`.`alert` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `checked` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `article_id` BIGINT NOT NULL,
  `receiver_id` VARCHAR(255) NOT NULL,
  `comment_id` BIGINT NOT NULL,
  `sender_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK10qs7ppmq3wo0fjuvrdwga1u3` (`article_id` ASC) VISIBLE,
  INDEX `FKivw1o5t5pubt9agrmosxulnqr` (`receiver_id` ASC) VISIBLE,
  INDEX `FKfhpt2iatrw9edy8dsld50oypq` (`comment_id` ASC) VISIBLE,
  INDEX `FKoefe05egr0l5gshr1kvok6tpy` (`sender_id` ASC) VISIBLE,
  CONSTRAINT `FK10qs7ppmq3wo0fjuvrdwga1u3`
    FOREIGN KEY (`article_id`)
    REFERENCES `scsac`.`article` (`id`),
  CONSTRAINT `FKfhpt2iatrw9edy8dsld50oypq`
    FOREIGN KEY (`comment_id`)
    REFERENCES `scsac`.`comment` (`id`),
  CONSTRAINT `FKivw1o5t5pubt9agrmosxulnqr`
    FOREIGN KEY (`receiver_id`)
    REFERENCES `scsac`.`user` (`id`),
  CONSTRAINT `FKoefe05egr0l5gshr1kvok6tpy`
    FOREIGN KEY (`sender_id`)
    REFERENCES `scsac`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
