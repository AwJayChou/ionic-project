drop database if exists db;
create database db charset utf8;
drop table if exists db.user;
create table db.user (
   id INT AUTO_INCREMENT primary key,
   username varchar(20) unique,
   email varchar(255) unique,
   mobile varchar(11) unique,
   password varchar(64) unique not null,
   avatar varchar(20) default 'default.png',
   nick varchar(20) unique,
   gender char(2),
   dob date comment '出生日期'
) comment'用户表'

drop table if exists db.product;
create table db.product(
   id int auto_increment primary key,
   title varchar(255) not null,
   coverPicture varchar(255) not null,
   price decimal(8,2) not null,
   brief varchar(255) comment '商品简介',
   feature varchar(255) comment'特色',
   tags varchar(255) comment'标签',
   type varchar(255) comment'类型'
)
--添加样本数据
DROP PROCEDURE IF EXISTS db.gen_product_sample_data;
DELIMITER $$
CREATE PROCEDURE db.gen_product_sample_data()
    BEGIN
        DECLARE counter INT DEFAULT 1;
        WHILE counter < 1001 DO
            INSERT INTO
                db.product(title, coverPicture, price)
                VALUE(
                    CONCAT('商品名称：', counter),
                    'default.png',
                    FLOOR(RAND() * 100000)
                );
            SET counter = counter + 1;
        END WHILE;
    END $$

CALL db.gen_product_sample_data();