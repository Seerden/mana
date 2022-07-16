create table review_session_entries (
   review_entry_id serial primary key not null,
   term_id serial not null,
   review_session_id serial not null,
   created_at timestamp not null default now(),
   passfail varchar(4) not null, -- 'pass' | 'fail'
   time_on_card int not null,
   direction text not null, -- TODO: implement this field in case we end up allowing multi-directional reviews

   constraint fk_session_entry_session_id
      foreign key (review_session_id)
      references review_sessions(review_session_id)
      on delete cascade,

   constraint fk_session_entry_term_id
      foreign key(term_id)
      references terms(term_id)
      on delete cascade
);