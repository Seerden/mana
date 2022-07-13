create table users (
   user_id  serial   not null    primary key,
   username text     unique   not null,
   password text              not null,
   created_at timestamp default now()
);