CREATE TABLE basenacho.Persona (
Ci int NOT NULL AUTO_INCREMENT,
Age int ,
Name varchar(45),
Email varchar(55),
PRIMARY KEY(Ci)
);

CREATE TABLE basenacho.user (
Id int NOT NULL,
Name varchar(45),
Password varchar(55),
PRIMARY KEY(Id)
);
