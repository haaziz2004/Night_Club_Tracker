DROP table if EXISTS NightClub CASCADE;

CREATE TABLE NightClub (
    id   SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) not null,
    genre varchar(30) not null,
    location varchar(30),
    occupancy integer ,
    yellowThreshold integer,
    max integer 
);


INSERT INTO NightClub(name, genre, location, occupancy, yellowThreshold, max) VALUES 
        ('Club Arcane', 'Rock', 'Buffalo', 0, 70, 100),
        ('Club Underground', 'Pop', 'Rochester', 0, 30, 50),
        ('Club Soda', 'Metal', 'London', 0, 12, 20),
        ('Studio 52', 'Grunge', 'Dubai', 0, 32, 52)
        ;
