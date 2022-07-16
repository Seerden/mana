create table term_saturation (
   term_id serial primary key not null,
   forwards int not null,
   backwards int not null,
   last_updated timestamp not null default now(),

   constraint fk_saturation_term_id
      foreign key (term_id)
      references terms(term_id)
      on delete cascade
);