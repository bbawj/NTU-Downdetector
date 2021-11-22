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