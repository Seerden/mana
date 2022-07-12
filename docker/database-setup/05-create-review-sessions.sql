create table review_sessions (
   review_session_id serial primary key not null,
   user_id serial not null,
   start_date timestamp not null,
   end_date timestamp,
   direction text not null,
   n int not null,
   set_ids integer[],
   list_ids integer[],
   saturation_threshold integer
);