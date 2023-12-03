DROP table if EXISTS NightClub CASCADE;

CREATE TABLE NightClub (
    id   SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30) not null,
    genre varchar(30) not null,
    location varchar(30),
    occupancy integer
);


INSERT INTO NightClub(name, genre, location, occupancy) VALUES 
        ('Club Arcane', 'Rock', 'Buffalo', 0),
        ('Club Underground', 'Pop', 'Rochester', 0),
        ('Club Soda', 'Metal', 'London', 0),
        ('Studio 52', 'Grunge', 'Dubai', 0)
        ;
