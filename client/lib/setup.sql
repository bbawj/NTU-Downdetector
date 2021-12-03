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
    foreign key (hall_id) references hall(id)
);

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
insert into hall (name) values ("Saraca Hall");
insert into hall (name) values ("Binjai Hall");
insert into hall (name) values ("Tanjong Hall");
insert into hall (name) values ("Tamarind Hall");
insert into hall (name) values ("Banyan Hall");
insert into hall (name) values ("Crescent Hall");
insert into hall (name) values ("Pioneer Hall");