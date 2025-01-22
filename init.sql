-- Drop the database if it exists and recreate it with proper collation
DROP DATABASE IF EXISTS clicker_game;
CREATE DATABASE clicker_game WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8'; 