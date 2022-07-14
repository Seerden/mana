insert into users(username, password) values ('admin', 'password');

insert into lists (user_id, name, from_language, to_language) values (1, 'list',
'english', 'spanish');

insert into terms (
   user_id,
   list_id,
   from_language,
   to_language,
   from_value,
   to_value
) values (
   1,
   1,
   'english',
   'spanish',
   '1',
   '1'
);

insert into review_sessions (
   user_id,
   start_date,
   direction,
   n,
   list_ids
) values (
   1,
   now(),
   'forwards',
   1,
   array [1]
);

insert into review_session_entries (
   term_id,
   review_session_id,
   passfail,
   time_on_card,
   direction
) values (
   1,
   1,
   'pass',
   1,
   'forwards'
);
