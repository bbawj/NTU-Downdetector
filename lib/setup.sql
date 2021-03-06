create database ntudowndetector;
use ntudowndetector;

create table hall (
	id int not null auto_increment,
    name varchar(255) not null,
    primary key (id)
);

create table report (
	id int not null auto_increment,
    hall_id int not null,
    timestamp datetime not null,
    primary key (id),
    key (hall_id)
);

create table user (
	id int not null AUTO_INCREMENT,
    email varchar(255) not null,
    password varchar(255) not null,
    PRIMARY KEY (id)
);

create table comment(
	id int not null AUTO_INCREMENT,
    user_id int not null,
    hall_id int not null,
    text text not null,
    posted_at datetime not null,
    primary key (id),
    key (user_id),
    key (hall_id) 
);

create index timestamp_idx ON report (timestamp);

# hall dummy data
insert into hall (name) values ("Hall 1");
insert into hall (name) values ("Hall 2");
insert into hall (name) values ("Hall 3");
insert into hall (name) values ("Hall 4");
insert into hall (name) values ("Hall 5");
insert into hall (name) values ("Hall 6");
insert into hall (name) values ("Hall 7"); 
insert into hall (name) values ("Hall 8");
insert into hall (name) values ("Hall 9");
insert into hall (name) values ("Hall 10");
insert into hall (name) values ("Hall 11");
insert into hall (name) values ("Hall 12");
insert into hall (name) values ("Hall 13");
insert into hall (name) values ("Hall 14");
insert into hall (name) values ("Hall 15");
insert into hall (name) values ("Hall 16");
insert into hall (name) values ("Crescent Hall");
insert into hall (name) values ("Pioneer Hall");
insert into hall (name) values ("Binjai Hall");
insert into hall (name) values ("Tanjong Hall");
insert into hall (name) values ("Banyan Hall");
insert into hall (name) values ("Saraca Hall");
insert into hall (name) values ("Tamarind Hall");

# reports dummy data -- change dates to within 24 hours of current date to see effects
insert into report (hall_id, timestamp) values (1,"2021-12-08 11:00:00");
insert into report (hall_id, timestamp) values (1,"2021-12-08 10:01:00");
insert into report (hall_id, timestamp) values (1,"2021-12-08 10:02:00");
insert into report (hall_id, timestamp) values (1,"2021-12-08 10:03:00");
insert into report (hall_id, timestamp) values (1,"2021-12-08 10:04:00");
insert into report (hall_id, timestamp) values (1,"2021-12-08 09:59:00");
insert into report (hall_id, timestamp) values (1,"2021-12-07 15:04:00");
insert into report (hall_id, timestamp) values (1,"2021-12-07 17:59:00");