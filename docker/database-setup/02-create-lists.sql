create table lists (
   list_id serial primary key not null,
   username text  not null,
   name text not null,
   from_language text not null,
   to_language text not null,
   created_at timestamp not null default now(),
   last_reviewed timestamp
);