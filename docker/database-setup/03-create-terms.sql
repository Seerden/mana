create table terms(
   term_id serial not null primary key,
   user_id serial not null,
   list_id serial not null,
   from_language text not null,
   to_language text not null,

   constraint fk_term_user 
      foreign key(user_id)
      references users(user_id),

   -- This implementation means a term can only belong to 1 list.
   constraint fk_term_list
      foreign key(list_id)
      references lists(list_id)
);