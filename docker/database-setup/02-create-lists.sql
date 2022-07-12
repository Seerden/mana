create table lists (
   list_id serial primary key not null,
   user_id serial not null,

   constraint fk_list_user_id
      foreign key (user_id)
      references users(user_id),
      
   name text not null,
   from_language text not null,
   to_language text not null,
   created_at timestamp not null default now(),
   last_reviewed timestamp
);